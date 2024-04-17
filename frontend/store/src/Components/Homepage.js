import React from 'react';
import {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
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
`
const StyledHeader = styled.h2`
  background-color: #f4b5d0;
  padding: 2px;
  color: #790557;
  border: 12px solid white;
`

const Homepage = () => {
  const navigate = useNavigate();
  const [allItems, setAllItems] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/items')
    .then(response => response.json())
    .then(data => {setAllItems(data)
      console.log("data", data)
      console.log("allite", allItems)
    })
  },[])

  return(
    <div>
      <StyledHeader>Showing All Inventories</StyledHeader>
      <CenteredDiv>
    {allItems.map(item => {
      return(
      <ItemDiv>
      <h3>{item.Name}</h3>
      <p>{item.Description}</p>
      <p>Quantity: {item.Quantity}</p>
      <button onClick={ () => navigate(`/item/${item.Id}`)}>View Full Item</button>
    </ItemDiv>
      )
    })}
    </CenteredDiv>
    </div>
  )
}

export default Homepage;