import { useState } from 'react'
import { Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './Home'
import Login from './Login'
import Register from './Register'

function App() {

  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
  )
}

export default App
