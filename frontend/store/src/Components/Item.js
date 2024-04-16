import React from 'react';
import {useEffect, useState} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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

const Item = () => {
  const navigate = useNavigate();
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
      // window.location.reload()
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
  Showing Item: {itemID.id}
  {product.map(item => {
     return(
      <ItemDiv>
        <h3>{item.Name}</h3>
        <p>{item.Description}</p>
        <p>Quantity: {item.Quantity}</p>
        <button onClick={() => setEditBox(1)}>Edit</button>
        <button onClick={() => deleteItem()}>Delete</button>
      </ItemDiv>
      )
  })}

  {editBox === 1 ?
  <ItemDiv>
    <h3>Update Details Below:</h3>
    <input type='text' id='newName' placeholder="Name:" />
    <input type='text' id='newDescription' placeholder="Description:" />
    <input type='text' id='newQuantity' placeholder="Quantity:" />
    <button id='update-button' onClick={() => editItem()}>Update Item</button>
  </ItemDiv>
  :
  <>
  </>
  }
  </>
)
}

export default Item;