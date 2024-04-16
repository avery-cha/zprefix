import React from 'react';
import {useNavigate} from 'react-router-dom';

const NavMenu = () => {

  const navigate = useNavigate()

  const handleManager = () => {

  }

  return(
    <div>
      <h2>Welcome! Choose how to enter our site: </h2>
      <button onClick={() => navigate('/homepage')}>Visitor</button>
      <button onClick={() => handleManager}>Inventory Manager</button>

    </div>
  )
}

 export default NavMenu;