
import './App.css';
import NavMenu from './Components/NavMenu'
import Homepage from './Components/Homepage'
import {Route, Routes} from 'react-router-dom'
import {useState} from 'react'
import {UserLog} from './UserLog'

function App() {



  return (
    <div className="App">
      <NavMenu />
    </div>
  );
}

export default App;
