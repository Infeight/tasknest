import React from 'react'
import './mybooking.css'
import { useEffect,useState } from 'react'
import Navbar from './navbar'
import { useNavigate } from 'react-router-dom'

const Mybooking = () => {

    const [orders, setOrders] = useState([])

    useEffect(()=>{
        fetchData();
    },[])

    console.log(sessionStorage.getItem('current-users'))
    console.log(sessionStorage.getItem('current-users-mail'))

    const fetchData = async () => {
        const data = {
            clientname: sessionStorage.getItem('current-users'),
            clientmail: sessionStorage.getItem('current-users-mail')
        }
            const orders =  fetch(`https://tasknest-3wwt.onrender.com/mybooking`, { method: 'post', headers: { "Content-Type": "application/json" },credentials: 'include', body: JSON.stringify(data) })
            orders.then(response => response.json()).then(data => {
                setOrders(data)
            })
      
    };

  return (
    <>
      <Navbar/>

      <div className="heading">
            <h4>Manage Your Bookings with Ease.</h4>
            <h6>Check status, provider responses, and service details anytime.</h6>
            
        </div>

      {
        orders.length!=0? orders.map(order=>{
            return(
                <div className='order' key={order.order._id}>
                <div className='orderid'>Order ID: {order.order._id}</div>
                <div className='service'>Service: {order.order.service}</div>
                <div className="requirements">Requirement: {order.order.requirement}</div>

                <div className='status'><h4>Status:  {order.order.status}</h4></div>
                <div className='clientname'>Booked By: {order.order.clientname}</div>
                <div className='clientmail'>Booking Mail: {order.order.clientmail}</div>
                <div className='clientphone'>Booking Phone: {order.order.clientphone}</div>
                </div>
            )
        }):<><div className="noservices">No Services Booked</div></>
      }
    </>
  )
}

export default Mybooking
