import React from "react";
import { BrowserRouter, Routes, Route  } from "react-router-dom";
import Home from "./pages/Home";
import Login from './pages/Login';
import Register from './pages/Register';
import "./App.css";
/**
 * plan have a logged in state
 * if user has been authenticated allow access to profile
 * @returns 
 */
function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path={'/'} element={<Home/>}></Route>
      <Route path ={'/login'} element={<Login/>}></Route>
      <Route path ={'/register'} element={<Register/>}></Route>
   </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
