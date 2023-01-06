import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route  } from "react-router-dom";
import Home from "./pages/Home";
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import ProtectedRoute from "./pages/ProtectedRoute";
import "./App.css";

/**
 * plan have a logged in state
 * if user has been authenticated allow access to profile
 * @returns 
 */
export  const  UserContext = React.createContext();
function App() {
  const [user, setUser] = useState('');
  useEffect(()=>{
      const token = localStorage.getItem('token')
      if(token){
        console.log(token)
        // decode the token 
        // set the user state to username
      }
      console.log(token);
    
  },[]);
  return (
    <><UserContext.Provider value={{user, setUser}}>
    <BrowserRouter>
    <Routes>
      <Route path={'/'} element={<Home/>}></Route>
      <Route path ={'/login'} element={<Login/>}></Route>
      <Route path ={'/register'} element={<Register/>}></Route>
      <Route path={'/profile/:username'} element={<ProtectedRoute><Profile/></ProtectedRoute>}/>
   </Routes>
    </BrowserRouter>
    
    </UserContext.Provider>
    </>
  );
}

export default App;
