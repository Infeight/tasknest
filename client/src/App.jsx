import { useState } from 'react'
import Login from './components/login'
import Home from './components/home'
import Homeservices from './components/homeservices'
import Personalassist from './components/personalassist'
import Hotelservices from './components/hotelservices'
import Saloon from './components/saloon'
import Serviceprovider from './components/serviceprovider'
import Mybooking from './components/mybooking'
import Profile from './components/profile'
import './App.css'
import {BrowserRouter,Routes,Route} from 'react-router-dom'


function App() {


  return (
   
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}/>
       <Route path='/login' element={<Login/>}/>
     <Route path='/homeservices' element={<Homeservices/>}/>
      <Route path='/personalservices' element={<Personalassist/>}/>
     <Route path='/hotelservices' element={<Hotelservices/>}/>
       <Route path='/saloonservices' element={<Saloon/>}/>
      <Route path='/serviceprovider' element={<Serviceprovider/>}/>
      <Route path='/yourbookings' element={<Mybooking/>}/>
      <Route path='/profile' element={<Profile/>}/>
    </Routes>
    </BrowserRouter>
  
  )
}

export default App
