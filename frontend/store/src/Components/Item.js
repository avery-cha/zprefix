import React from 'react';
import {useEffect, useState, useContext} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {UserLog} from '../UserLog.js';

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

const Item = () => {

  const navigate = useNavigate();

  const {loggedInUser} = useContext(UserLog);

  const [product, setProduct] = useState([]);
  const [editBox, setEditBox] = useState(0);

  var itemID  = useParams();
  let code = itemID.id;
  console.log("code", code)

  useEffect(() => {
    fetch(`http://localhost:8080/items/${code}`)
    .then(response => response.json())
    .then(data => {
      console.log("data", data)
      setProduct(data)
    }
    )
  },[])

  const editItem = () => {

    let itemUpdate = {};
    itemUpdate.Name = document.getElementById("newName").value
    itemUpdate.Description = document.getElementById("newDescription").value
    itemUpdate.Quantity = document.getElementById("newQuantity").value

    console.log("itemupdate", itemUpdate);

    fetch(`http://localhost:8080/update/${code.toString()}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(itemUpdate),
    })
    .then(response => console.log("response", response)
  )
  }

  const deleteItem = () =>{
    fetch(`http://localhost:8080/remove/${code}`, {
      method: 'DELETE',
      headers:{
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      if(res.ok) navigate('/homepage')
      else console.error(`Failed to remove Item ${code}`)
    })
  }

  return(
  <>
  <StyledHeader>Showing Item: {itemID.id}</StyledHeader>
  <CenteredDiv>
  {product.map(item => {
     return(
      <ItemDiv>
        <h3>{item.Name}</h3>
        <p>{item.Description}</p>
        <p>Quantity: {item.Quantity}</p>
        {loggedInUser.Id >0 ?
        <>
        <StyledButton onClick={() => setEditBox(1)}>Edit</StyledButton>
        <StyledButton onClick={() => deleteItem()}>Delete</StyledButton>
        </>
      :
      <></>}

      </ItemDiv>
      )
  })}
  </CenteredDiv>

  {editBox === 1 ?
  <CenteredDiv>
  <ItemDiv>
    <h3>Update Details Below:</h3>
    <input type='text' id='newName' placeholder="Name:" />
    <input type='text' id='newDescription' placeholder="Description:" />
    <input type='text' id='newQuantity' placeholder="Quantity:" />
    <StyledButton id='update-button' onClick={() => editItem()}>Update Item</StyledButton>
  </ItemDiv>
  </CenteredDiv>
  :
  <>
  </>
  }
  </>
)
}

export default Item;