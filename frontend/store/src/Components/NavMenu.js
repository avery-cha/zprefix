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

  return(
    <div>
      <h1>INVENTORY TRACKER</h1>
      {login === 0 ?
      <CenteredDiv>
       <button onClick={() => {
           navigate('/homepage');
           setLogin(1);}}>Continue As Visitor</button>
      <input type='text' id='username' placeholder="Username"></input>
      <input type="text" id="password" placeholder = "Password"></input>
       <button onClick={() => handleLogin()}>Login</button>
       </CenteredDiv>
       :
       login > 1 ?

          <>
            <h1>Welcome {loggedInUser.First}</h1>
          </>
          :
          <>
          <button onClick={() => {
              navigate('/');
              setLogin(0);}}>Back to Login</button>
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

    </div>
  )
}

 export default NavMenu;