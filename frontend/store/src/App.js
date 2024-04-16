import logo from './logo.svg';
import './App.css';
import NavMenu from './Components/NavMenu'
import Homepage from './Components/Homepage'
import {Route, Routes} from 'react-router-dom'

function App() {


  return (
    <div className="App">
      <NavMenu />

      <Routes>
        <Route path='/homepage' element={<Homepage/>}/>

      </Routes>
    </div>
  );
}

export default App;
