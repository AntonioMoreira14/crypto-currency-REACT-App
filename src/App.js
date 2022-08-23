import React, { useState } from "react";
import Main from "./Components/Main/Main"
import Info from './Components/Coin-Info/Info'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './Components/Navbar/Navbar'

function App() {

  const [darkMode, setDarkMode] = useState(true)

  function toggleDarkMode() {
    setDarkMode(prevMode => !prevMode)
  }

  return (
    <Router>
      <Navbar 
        darkMode={darkMode} 
        toggleDarkMode={toggleDarkMode}
      />
      <Routes>
        <Route path='/' element={<Main darkMode={darkMode}/>}/>
        <Route path='/info' element={<Info darkMode={darkMode}/>}/>
      </Routes>
    </Router>
  );
}

export default App;
