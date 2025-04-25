import React from 'react'
import './profile.css'
import { useEffect,useState } from 'react'
import Navbar from './navbar'



const Profile = () => {


   
    const [userdet, setUserdet] = useState({
        loogedin: {}
    })
    
useEffect(()=>{
    if(sessionStorage.getItem('user-role')==='Provider'){
        handlefetch();
     }
     else{
        getUserData();
     }
},[])

   const handlefetch =async()=>{
    const data = {
        username: sessionStorage.getItem('current-users'),
        mail: sessionStorage.getItem('current-users-mail')
    }
    
    try {
      const res = await fetch('https://tasknest-3wwt.onrender.com/signinservices', {
        method: 'post', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const data1 = await res.json();
      setUserdet({ loogedin: data1.loggedin }); 

    } catch (err) {
      console.error("User not logged in or error fetching user", err);
    }

   }

   const getUserData = async () => {
    const data = {
        username: sessionStorage.getItem('current-users'),
        mail: sessionStorage.getItem('current-users-mail')
    }

    try {
      const res = await fetch('https://tasknest-3wwt.onrender.com/getuser', {
        method: 'post', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const data1 = await res.json();
      setUserdet({ loogedin: data1.loggedin }); 

    } catch (err) {
      console.error("User not logged in or error fetching user", err);
    }
  };


console.log(userdet)
  return (
    <>
    <Navbar/>

    <div className="heading">
            <h4>Welcome Back! Let’s Keep Your Info Up to Date.</h4>
            <h6>Edit your profile and stay connected with your services.</h6>
            
        </div>

    <div className="profile">
        {
           Object.keys(userdet.loogedin).length!=0 && sessionStorage.getItem('user-role')==='Provider'?
                
                    <div className="userdetails">
                        <div className="userdetail">Service Name: {userdet.loogedin.servicename}</div>
                        <div className="userdetail">Description: {userdet.loogedin.description}</div>
                        <div className="userdetail">Username: {userdet.loogedin.username}</div>
                        <div className="userdetail">Price: RS. {userdet.loogedin.price} / hour</div>
                        <div className="userdetail">Phone: {userdet.loogedin.phone}</div>
                        <div className="userdetail">Mail: {userdet.loogedin.mail}</div>
                        <div className="userdetail">You are signed in as a {userdet.loogedin.role}</div>
                    </div>
                
            :
            <>
            <div className="userdetails">
                        <div className="userdetail">Username: {userdet.loogedin.username}</div>
                        <div className="userdetail">Phone: {userdet.loogedin.phone}</div>
                        <div className="userdetail">Mail: {userdet.loogedin.mail}</div>
                        <div className="userdetail">You are signed in as a {sessionStorage.getItem('user-role')}</div>

                    </div>
            </>
        }
    </div>
   </>
  )
}

export default Profile
