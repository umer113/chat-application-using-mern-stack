import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SetAvatar from './pages/SetAvatar';
import Register from './pages/Register';
import Login from './pages/Login';
import Chat from './pages/Chat';
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element ={<Register/>}></Route>
        <Route path="/login" element ={<Login/>}></Route>
        <Route path="/setAvatar" element ={<SetAvatar/>}></Route>
        <Route path="/chat" element ={<Chat/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
