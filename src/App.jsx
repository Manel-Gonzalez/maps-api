import {useState} from "react";
import {Router, Routes, Route} from "react-router-dom";
import "./App.css";
import Home from "./Home";
import Login from "./Login";
import Profile from "./profile";
import Register from "./Register";
import Navbar from "./components/navbar";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
}

export default App;
