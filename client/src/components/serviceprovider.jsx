import React, { useEffect,useState } from 'react'
import Navbar from './navbar'
import './serviceprovider.css'


const Serviceprovider = () => {

    const [orders, setOrders] = useState([])

    useEffect(()=>{
        
        fetchData();
    },[])
    

    const fetchData = async () => {
      const data = {
        serviceusername: sessionStorage.getItem('current-users'),
        servicemail: sessionStorage.getItem('current-users-mail')
    }
    const res = await fetch('https://tasknest-3wwt.onrender.com/orders', {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    });
    const data1 = await res.json();
    console.log(data1)
    setOrders(data1);
      
    };



  const handleAcceptOrder = async (e) => {
       const data = {
        _id: e.target.closest('.order').querySelector('.orderid').innerText
        }
         
        const res = await fetch('https://tasknest-3wwt.onrender.com/acceptorder', {
          method: 'post',
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json"
          }
        });
        const data1 = await res.json();
        if(data1.message === 'Success'){
            e.target.closest('.status').innerText = 'Status: Accepted'
            e.target.closest('.status').style.color = 'green' 
        }else{
            alert('Error')
        }
    }

    const handleRejectOrder = async (e) => {
        const data = {
         _id: e.target.closest('.order').querySelector('.orderid').innerText
         }
         const res = await fetch('https://tasknest-3wwt.onrender.com/rejectorder', {
          method: 'post',
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json"
          }
        });
        const data1 = await res.json();
        if(data1.message === 'Success'){
            e.target.closest('.status').innerText = 'Status: Rejected'
            e.target.closest('.status').style.color = 'red' 
        }else{
            alert('Error')
        }
     }
    


  return (
    <>
      <Navbar/>

      <div className="heading">
            <h4>View All the Services You've Been Booked For.</h4>
            <h6>Stay updated and respond to customer requests quickly.</h6>
            
        </div>
         <div className="note">Need to adjust the quote? Feel free to call the customer anytime to discuss details or budget!</div>
      <div className="orders">
           {
            orders.length!=0? orders.map(order=>{
                return(
                    <div className="order" key={order.order._id}>
                        <h3 className='orderid' style={{display:'none'}}>{order.order._id}</h3>
                        <h3>Service: {order.order.service}</h3>
                        <h3>Client Name: {order.order.clientname}</h3>
                        <h3>Client Phone No: {order.order.clientphone}</h3>
                        <h3>Client Mail: {order.order.clientmail}</h3>
                        <h3>Address: {order.order.address}</h3>
                        <h2>Requirement: {order.order.requirement}</h2>
                        <h3>Client's Budget: Rs.{order.order.number} /-</h3>
                        <h3 className='status'>Status: {order.order.status}</h3>
                      {
                        order.order.status === 'Pending' ?
                         (
                            <div className="buttons">
                            <button className='accept' onClick={handleAcceptOrder}>Accept Order</button>
                            <button className='reject' onClick={handleRejectOrder}>Reject Order</button>
                            </div>
                        ):(<></>)
                      }
                    </div>
                )
            }):<>No orders</>
           }
      </div>
    </>
  )
}

export default Serviceprovider
