import React from 'react';
import {UserLog} from '../UserLog.js';
import {useContext, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import styled from 'styled-components';

const ItemDiv = styled.div`
display: flex;
  flex-flow: column;
  justify-items: center;
  justify-content: center;
  align-items: center;
  align-content: center;
  gap: 20px;
  background-color: #86d2e9;
  padding: 10px;
  width: 300px;
  height: 300px;
  border: 4px solid white;
`
const CenteredDiv = styled.div`
  display: flex;
  flex-flow: row;
  flex-wrap: wrap;
  gap: 20px;
  justify-items: center;
  justify-content: center;
  align-items: center;
  align-content: center;
  margin: 20px;
`
const StyledHeader = styled.h2`
  background-color: #f4b5d0;
  padding: 2px;
  color: #790557;
  border: 12px solid white;
`
const StyledButton = styled.button`
  background-color: #89b8a1;
  border: 2px solid white;
  color: white;
  font-weight: bold;
  height: 30px;
`
const SecondButton = styled.button`
  background-color: #790557;
  border: 2px solid white;
  color: white;
  font-weight: bold;
  height: 30px;
`

const Manager = () => {
  const navigate = useNavigate()

  const {loggedInUser} = useContext(UserLog);
  const [userItems, setUserItems] = useState([]);
  const [createBox, setCreateBox] = useState(0);

  useEffect(() => {
    console.log("logged in id", loggedInUser.Id)
    fetch(`http://localhost:8080/users/${loggedInUser.Id}`)
    .then(response => response.json())
    .then(data => {
        const splitData = data.map(item => {
          var firstString = '';
          var newString = item.Description;
          if(item.Description.length > 100){
             firstString = item.Description.substring(0,99);
             newString = firstString + '...';
          }
          return(
            {
              Id: item.Id,
              UserId: item.UserId,
              Name: item.Name,
              Description: newString,
              Quantity: item.Quantity
            }
          )
        })
        setUserItems(splitData)
        console.log("userItems", userItems)
      })
  },[])

  const addItem = () => {

    let newName = document.getElementById("addName").value;
    let newDescription = document.getElementById("addDescription").value;
    let newQuantity = document.getElementById("addQuantity").value;

    const newItem = {
      UserId: loggedInUser.Id,
      Name: newName,
      Description: newDescription,
      Quantity: newQuantity
    };

    console.log("newitem", newItem)

    fetch(`http://localhost:8080/items/new`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
      body: JSON.stringify(newItem)
    })
    .then(response => {
      console.log("post response", response)
      navigate('/homepage')
    })
  }

  return (
    <>
    <StyledHeader>Showing {loggedInUser.First} {loggedInUser.Last}s Inventory</StyledHeader> <br />
    <StyledButton onClick = { () => navigate('/homepage')}>View All Inventories</StyledButton>
    <br />
    <CenteredDiv>
    {userItems.map(item => {
      return(
      <ItemDiv>
        <h3>{item.Name}</h3>
        <p>{item.Description}</p>
        <p>Quantity: {item.Quantity}</p>
        <StyledButton onClick={ () => navigate(`/item/${item.Id}`)}>View Full Item</StyledButton>
      </ItemDiv>
      )
    })}
    </CenteredDiv>
  <SecondButton onClick = {() => setCreateBox(1)}>Add Item</SecondButton>
  {createBox === 1 ?
  <CenteredDiv>
    <ItemDiv>
      <h3>Fill Out Details To Add Item Below:</h3>
      <input type='text' id='addName' placeholder="Name:" />
      <input type='text' id='addDescription' placeholder="Description:" />
      <input type='text' id='addQuantity' placeholder="Quantity:" />
      <StyledButton id='add-button' onClick={() => addItem()}>Add New Item</StyledButton>
      </ItemDiv>
      </CenteredDiv>
      :
      <></>
    }
    </>
  )
}

export default Manager;

