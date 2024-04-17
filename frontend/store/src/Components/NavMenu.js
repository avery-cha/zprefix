import React from 'react';
import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import Homepage from './Homepage'
import {Route, Routes} from 'react-router-dom'
import {UserLog} from '../UserLog.js';
import Manager from './Manager';
import Item from './Item';

const CenteredDiv = styled.div`
  display: flex;
  flex-flow: column;
  justify-items: center;
  justify-content: center;
  align-items: center;
  align-content: center;
  gap: 20px;
  background-color: #86d2e9;
  padding: 10px;
  width: 40%;
  margin-left: 30%;
  border: 4px solid white;
`

const BackgroundDiv = styled.div`
  background-image: url('https://img.freepik.com/premium-vector/store-shelves-with-groceries-food-drinks_439515-232.jpg');
  height: 2000px;
`
const StyledHeader = styled.h1`
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

const NavMenu = () => {
  const navigate = useNavigate()

  const [loggedInUser, setLoggedInUser] = useState({})

  const [login, setLogin] = useState(0)
  const [allUsers, setAllUsers] = useState();
  const [username, setUsername] = useState('');
  const [userProfile, setUserProfile] = useState();


  useEffect(() => {
    fetch(`http://localhost:8080/users`)
    .then(response => response.json())
    .then(data => setAllUsers(data))
  }, [])

  const handleLogin = () => {
    const usernames = allUsers.map(item => item.Username)

    const loginUser = document.getElementById("username").value;
    const loginPassword = document.getElementById("password").value;
    console.log("loginuser", loginUser)

    if(usernames.includes(loginUser)){
      setUsername(loginUser);
      const userIndex = usernames.indexOf(loginUser) ;

      if(allUsers[userIndex].Password === loginPassword){
        setLoggedInUser(allUsers[userIndex])
        navigate('/manager')
        setLogin(2)
      }
    }

  }

  const createUser = () => {

    const createFirst = document.getElementById("createFirst").value
    const createLast = document.getElementById("createLast").value
    const createUsername = document.getElementById("createUsername").value
    const createPassword = document.getElementById("createPassword").value

    const createAccount = {
      First: createFirst,
      Last: createLast,
      Username: createUsername,
      Password: createPassword
    }

    fetch('http://localhost:8080/users/new', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(createAccount)
  })
  .then(response => {
    console.log("post response", response)
    window.location.reload()
  })
}


  return(
    <BackgroundDiv>
      <StyledHeader>INVENTORY TRACKER</StyledHeader>
      {login === 0 ?
      <CenteredDiv>
       <StyledButton onClick={() => {
           navigate('/homepage');
           setLogin(3);}}>Continue As Visitor</StyledButton>
      <StyledButton onClick={ () => setLogin(1)}>Create Account</StyledButton>
      <input type='text' id='username' placeholder="Username"></input>
      <input type="text" id="password" placeholder = "Password"></input>
       <StyledButton onClick={() => handleLogin()}>Login</StyledButton>
       </CenteredDiv>
       :
       login === 2 ?

          <>
          </>
          :

          login === 1 ?
          <CenteredDiv>
          <h2>Fill out the information below</h2>
          <input type='text' id='createFirst' placeholder="First Name"></input>
          <input type="text" id="createLast" placeholder = "Last Name"></input>
          <input type='text' id='createUsername' placeholder="Username"></input>
          <input type="text" id="createPassword" placeholder = "Password"></input>
          <StyledButton id="createButton" onClick ={() => createUser()}>Create Account</StyledButton>
        </CenteredDiv>
          :
          <>
          <StyledButton onClick={() => {
              navigate('/');
              setLogin(0);}}>Back to Login</StyledButton>
          </>
    }

    <UserLog.Provider value={{loggedInUser, setLoggedInUser}} >

    <Routes>
      <Route path='/homepage' element={<Homepage/>}/>
      <Route path='/'/>
      <Route path='/manager/' element={<Manager/>} />
      <Route path='/item/:id' element={<Item />} />
    </Routes>

    </UserLog.Provider>

    </BackgroundDiv>
  )
}

 export default NavMenu;