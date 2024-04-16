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
  gap: 5px;
  border: 2px solid black;
  margin: 10%;
  padding: 10px;
`

const Manager = () => {
  const navigate = useNavigate()

  const {loggedInUser} = useContext(UserLog);
  const [userItems, setUserItems] = useState([]);

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

  return (
    <>
    <h2>Your Inventory</h2>
    {userItems.map(item => {
      return(
      <ItemDiv>
        <h3>{item.Name}</h3>
        <p>{item.Description}</p>
        <p>Quantity: {item.Quantity}</p>
        <button onClick={ () => navigate(`/item/${item.Id}`)}>View Full Item</button>
      </ItemDiv>
      )
    })}
    </>
  )
}

export default Manager;

