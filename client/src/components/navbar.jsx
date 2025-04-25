import React from 'react'
import './navbar.css'
import { Link } from 'react-router-dom'
import Home from './home';
import { useNavigate } from 'react-router-dom';
import { useState,useEffect } from 'react'

const Navbar = () => {

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isloggedin');
    if (isLoggedIn === 'false') {
     document.getElementById('signinbtn').addEventListener('click', handlesignin)
    }
    else{
      document.getElementById('signinbtn').innerText = 'Logout'
      document.getElementById('signinbtn').addEventListener('click', handlelogout)
    }
  }, []);

  useEffect(()=>{
    if(localStorage.getItem('user-role')==='Provider'){
       document.getElementById('bookings').style.display = 'none'
    }
    else{
      document.getElementById('bookings').style.display = 'block'
    }
  })

  const navigate = useNavigate();

  const handlesignin = () => {
    navigate('/login'); // change '/target-page' to your route
  };
  const handlelogout = () => {
    navigate('/'); // change '/target-page' to your route
    document.getElementById('signinbtn').innerText = 'Sign In'
   
    localStorage.removeItem('user-role');
    localStorage.setItem('isloggedin', false);
  }

  const handlemybookings = () => {
    if(localStorage.getItem('isloggedin')==='true'){
      navigate('/yourbookings'); 
    }
    else{
      document.getElementById('signinbtn').style.border = '2px solid green'
    }
  };

  const handleprofile = () => {
    if(localStorage.getItem('isloggedin')==='true'){
      navigate('/profile'); 
    }
    else{
      document.getElementById('signinbtn').style.border = '2px solid green'
    }
  };

  const handlehome = () => {
    if(localStorage.getItem('user-role')==='Provider'){
      navigate('/serviceprovider'); 
    }
    else{
      navigate('/'); 
    }
  }
  
  

  return (
    <div className='navbar'>
      <div className="head">Task Nest</div>
      <div className="selbtns">
        <button onClick={handlehome}>Home</button>
       <button id='signinbtn'>Sign In</button>
       <button id='bookings' onClick={handlemybookings}>Your Bookings</button>
       <button onClick={handleprofile}>Profile</button>
       </div>

     
    </div>
    
  )
}

export default Navbar
