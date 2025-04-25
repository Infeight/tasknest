import React from 'react'
import './homeservices.css'
import Navbar from './navbar'
import { FaHouseChimney } from "react-icons/fa6";
import { GiGardeningShears } from "react-icons/gi";
import { MdOutlinePlumbing } from "react-icons/md";
import { MdElectricBolt } from "react-icons/md";
import { MdCarpenter } from "react-icons/md";
import { MdFormatPaint } from "react-icons/md";
import { TbAirConditioning } from "react-icons/tb";
import { MdPestControlRodent } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { IoCall } from "react-icons/io5";
import { IoMdMail } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import { FaAddressCard } from "react-icons/fa";
import { useState,useEffect } from 'react'

const Homeservices = () => {

  const [services,setServices] = useState([]);
  const [userdet, setUserdet] = useState(null)


  useEffect(() => {
    const getUserData = async () => {
      try {
        const res = await fetch('https://tasknest-3wwt.onrender.com/getuser', {
          method: 'GET',
          credentials: 'include',
        });
        const data = await res.json();
        setUserdet(data); 
  
      } catch (err) {
        console.error("User not logged in or error fetching user", err);
      }
    };
  
    getUserData();
  }, [services]);

  const handleservices = async(e) =>{
    console.log(localStorage.getItem('isloggedin'))
    if(localStorage.getItem('isloggedin') == 'true'){
      document.querySelectorAll('.service1').forEach((item)=>{
        item.style.backgroundColor=''
      })
       e.target.style.backgroundColor='#6EE7B7'
  
          const data={
            service:e.target.innerText
          }
          const services = fetch('https://tasknest-3wwt.onrender.com/services', { method: 'post', headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) })
          services.then((response)=>response.json()).then((data)=>{
            setServices(data);
            if(data!=''){
              document.getElementById('noservice').style.display='none'
              document.getElementById('serviceproviders').style.alignItems='start'
            }
            else{
              document.getElementById('noservice').style.display='block'
              document.getElementById('serviceproviders').style.alignItems='center'
            }
          })
  
    }
    else{
      document.getElementById('loginnote').style.opacity='1'
      document.getElementById('loginnote').style.display='block'
      setTimeout(() => {
        document.getElementById('loginnote').style.opacity='0'
      document.getElementById('loginnote').style.display='none'

      }, 2000);
      document.querySelectorAll('.service1').forEach((item)=>{
        item.style.backgroundColor=''
      })  
    }
    
      }

      const handlebooking=(e)=>{
        e.target.closest('.serviceprovider1').querySelector('#address-in').style.display='block'
        e.target.closest('.serviceprovider1').querySelector('#requirement').style.display='block'
        e.target.closest('.serviceprovider1').querySelector('#number').style.display='block'
        e.target.closest('.serviceprovider1').querySelector('label').style.display='block'
        e.target.closest('.serviceprovider1').querySelector('#booknow').style.display='none'
        e.target.closest('.serviceprovider1').querySelector('#confirm').style.display='block'
        e.target.closest('.serviceprovider1').querySelector('#cancel').style.display='block'
      }

      const handleconfirm=(e)=>{ 
        console.log(userdet)
        const data ={
          address:e.target.closest('.serviceprovider1').querySelector('#address-in').value,
          requirement:e.target.closest('.serviceprovider1').querySelector('#requirement').value,
          number:e.target.closest('.serviceprovider1').querySelector('#number').value,
          service:e.target.closest('.serviceprovider1').querySelector('.serviceprovidername').innerText,
          serviceusername:e.target.closest('.serviceprovider1').querySelector('.serviceusername').innerText,
          servicemail:e.target.closest('.serviceprovider1').querySelector('.mail').innerText,
          clientname:userdet.loggedin.username,
          clientphone: userdet.loggedin.phone ? userdet.loggedin.phone  : 'Contact details not provided',
          clientmail: userdet.loggedin.mail ,
          status: 'Pending'
        }
 
        const booking = fetch('https://tasknest-3wwt.onrender.com/bookings', { method: 'post', headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) })
        booking.then((response)=>response.json()).then((data)=>{
          console.log(data)
          if(data.message=='Success'){
            document.getElementById('bookingconfirm').style.opacity='1'
            document.getElementById('bookingconfirm').style.display='block' 
            setTimeout(() => {
              document.getElementById('bookingconfirm').style.opacity='0'
              document.getElementById('bookingconfirm').style.display='none'
            }, 3000);

            e.target.closest('.serviceprovider1').querySelector('#address-in').value=''
            e.target.closest('.serviceprovider1').querySelector('#requirement').value=''
            e.target.closest('.serviceprovider1').querySelector('#number').value=''
            
            e.target.closest('.serviceprovider1').querySelector('#address-in').style.display='none'
            e.target.closest('.serviceprovider1').querySelector('#requirement').style.display='none'
            e.target.closest('.serviceprovider1').querySelector('#number').style.display='none'
            e.target.closest('.serviceprovider1').querySelector('label').style.display='none'
            e.target.closest('.serviceprovider1').querySelector('#booknow').style.display='block'
            e.target.closest('.serviceprovider1').querySelector('#confirm').style.display='none'
            e.target.closest('.serviceprovider1').querySelector('#cancel').style.display='none'

          }
          else{
            document.getElementById('bookingfailed').style.opacity='1'
            document.getElementById('bookingfailed').style.display='block' 
            setTimeout(() => {
              document.getElementById('bookingfailed').style.opacity='0'
              document.getElementById('bookingfailed').style.display='none'
            }, 3000);
            e.target.closest('.serviceprovider1').querySelector('#address-in').value=''
            e.target.closest('.serviceprovider1').querySelector('#requirement').value=''
            e.target.closest('.serviceprovider1').querySelector('#number').value=''

          }
        })

      }

      const handlecancel=(e)=>{
        e.target.closest('.serviceprovider1').querySelector('#address-in').style.display='none'
        e.target.closest('.serviceprovider1').querySelector('#requirement').style.display='none'
        e.target.closest('.serviceprovider1').querySelector('#number').style.display='none'
        e.target.closest('.serviceprovider1').querySelector('label').style.display='none'
        e.target.closest('.serviceprovider1').querySelector('#booknow').style.display='block'
        e.target.closest('.serviceprovider1').querySelector('#confirm').style.display='none'
        e.target.closest('.serviceprovider1').querySelector('#cancel').style.display='none'
      }
  
  return (
    <>
      <Navbar/>

     <div className="loginnote" id='loginnote'>Please Sign in to search for services available.</div>
     <div className="bookingconfirm" id='bookingconfirm'>
     Hang tight! The provider is reviewing your request. Head to 'Your Bookings' to stay updated.
     </div>

     <div className="bookingconfirm" id='bookingfailed'>
     OOPS ! Something went wrong. Please try again later.
     </div>

      <div className="heading">
            <h4>Expert Help for Every Corner of Your Home.</h4>
            <h6>Affordable, verified, and just one tap away.</h6>
        </div>

        <div className="homeservicescont" >
          <div className="service1" onClick={handleservices}><FaHouseChimney />Housekeeping</div>
          <div className="service1" onClick={handleservices}><GiGardeningShears />Gardening</div>
          <div className="service1" onClick={handleservices}><MdOutlinePlumbing />Plumbing</div>
          <div className="service1" onClick={handleservices}><MdElectricBolt />Electrician</div>
          <div className="service1" onClick={handleservices}><MdCarpenter />Carpenter</div>
          <div className="service1" onClick={handleservices}><MdFormatPaint />Painter</div>
          <div className="service1" onClick={handleservices}><TbAirConditioning />AC Repairs</div>
          <div className="service1" onClick={handleservices}><MdPestControlRodent />Pest Control</div>
          
        </div>
     
     <div className="serviceshead">
      Services Available
     </div>

   

        <div className="serviceproviders" id='serviceproviders'>
          <div className="noservice" id='noservice'>👋 Hey there! Start by picking a service — we’ll show the best providers right here.</div>
        
        {services.length!=0?services.map(service=>{
           return(
            <div className="serviceprovider1" key={service.service._id}>
              <div className="serviceprovidername">{service.service.servicename}</div>
              <div className="serviceproviderdesc">{service.service.description}</div>
              <div className="price">Rs.{service.service.price} /hour</div>
              <div className="serviceproviderpersonaldet">
                <div className="serviceusername"><FaUser />{service.service.username}</div>
                <div className="servicephone"><IoCall /><a href={`tel:${service.service.phone}`}>Call Us</a></div>
                <div className="servicemail"><IoMdMail /><a href={`mailto:${service.service.mail}`}>Mail Us</a></div>
              <div className="mail" style={{display:'none'}}>{service.service.mail}</div>
              </div>
              <div className="serviceprovidercity"><FaLocationDot />{service.service.city}</div>
              <div className="serviceprovideraddress"><FaAddressCard />{service.service.address}</div>

<textarea name="address-in" id="address-in" className='address-in' placeholder='Your Address'></textarea>
<textarea name="requirement" id="requirement" className='requirement' placeholder='Your requirements'></textarea>
  <label htmlFor="number">* The service provider can contact you anytime to negotiate the price</label>
  <input type="number" id='number' placeholder='Price you would offer in rupees'/>            
              
              <div className="buttons">
              <button id='booknow' onClick={handlebooking}>Book Now</button>
              <button id='confirm' onClick={handleconfirm}>Confirm</button>
              <button id='cancel' onClick={handlecancel}>Cancel</button>
              </div>

            </div>
           )
        }):  <div>Fetching Service Providers ...</div>}

        
        </div>

    </>
  )
}

export default Homeservices
