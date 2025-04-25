import React from 'react'
import './home.css'
import Navbar from './navbar'
import { useState,useEffect,  } from 'react'
import { useNavigate } from 'react-router-dom';


const Home = () => {

    const navigate = useNavigate();

  const handleHomeservices = () => {
    navigate('/homeservices'); // change '/target-page' to your route
  };

  const handlepersonalservices = () => {
    navigate('/personalservices'); // change '/target-page' to your route
  };

  const handlehotelservices = () => {
    navigate('/hotelservices'); // change '/target-page' to your route
  };

  const handlesaloonservices = () => {
    navigate('/saloonservices'); // change '/target-page' to your route
  };

  return (
    <>
        <Navbar/>

        <div className="heading">
            <h4>From Cleanups to Checkups, We've Got You.</h4>
            <h6>Find and book local experts hassle-free.</h6>
        </div>

        <div className="allservicelist">
           <div className="servicecontainer" onClick={handleHomeservices}>
                <div className="serviceimg"><img src="housecleaning.jpg" alt="" /></div>
                <div className="servicetext">Home Services</div>
                <div className="servicedesc">Professional cleaning, plumbing, and maintenance to keep your home in top shape. </div>
           </div>
           <div className="servicecontainer" onClick={handlepersonalservices}>
           <div className="serviceimg"><img src="personal services.webp" alt="" /></div>
                <div className="servicetext">Personal Services</div>
                <div className="servicedesc">Fitness, tutoring, and coaching to help you achieve personal goals and improve well-being. </div>
           </div>
           <div className="servicecontainer" onClick={handlehotelservices}>
           <div className="serviceimg"><img src="Hotel services.webp" alt="" /></div>
                <div className="servicetext">Hotel Services</div>
                <div className="servicedesc">Room cleaning, maintenance, and concierge services to enhance guest experiences.</div>
           </div>
           <div className="servicecontainer" onClick={handlesaloonservices}>
           <div className="serviceimg"><img src="spa service.avif" alt="" /></div>
                <div className="servicetext">Saloon & Spa Services</div>
                <div className="servicedesc">Haircuts, massages, and beauty treatments for relaxation and self-care.</div>
           </div>
        </div>

        <div className="whyus">
            <h4>Why Choose Us?</h4>
            {/* <h6>We’re committed to making your service experience simple, reliable, and hassle-free. Here’s what sets us apart:</h6> */}
           <div className="whyusdet">
                <div className="whyuscontainer">
                    <div className="whyusimg"><img src="professional.jpg" alt="" /></div>
                    <div className="whyustext">Verified Professionals</div>
                    <div className="whyusdesc">All service providers are background-checked and vetted for reliability.</div>
                </div>
                <div className="whyuscontainer">
                    <div className="whyusimg"><img src="booking.jpg" alt="" /></div>
                    <div className="whyustext"> Fast & Easy Booking</div>
                    <div className="whyusdesc">Book your service in seconds with a simple and intuitive interface.</div>
                </div>
                <div className="whyuscontainer">
                    <div className="whyusimg"><img src="satisfaction.jpg" alt="" /></div>
                    <div className="whyustext"> Satisfaction Guarantee</div>
                    <div className="whyusdesc">We’re not happy unless you are. We’ll make it right—every time.</div>
                </div>
                
                <div className="whyuscontainer">
                    <div className="whyusimg"><img src="pricing.jpg" alt="" /></div>
                    <div className="whyustext"> Transparent Pricing</div>
                    <div className="whyusdesc">Know exactly what you’ll pay—no surprises or hidden fees.</div>
                </div>

                <div className="whyuscontainer">
                    <div className="whyusimg"><img src="payment.jpg" alt="" /></div>
                    <div className="whyustext"> Secure Payments</div>
                    <div className="whyusdesc">Safe payment options to protect your personal and financial data.</div>
                </div>

                <div className="whyuscontainer">
                    <div className="whyusimg"><img src="customercare.jpg" alt="" /></div>
                    <div className="whyustext">24/7 Customer Support</div>
                    <div className="whyusdesc">Need help? Our support team is here for you anytime, day or night.</div>
                </div>

                
           </div>
        </div>
    </>
  )
}

export default Home
