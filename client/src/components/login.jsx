import React from 'react'
import './login.css'
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';








const Login = () => {

  let [user, setUser] = useState({
    username: "",
    mail: "",
    role: "",
    password: ""
  })

  let [signup, setSignup] = useState({
    username: "",
    phone: "",
    role: "",
    mail: "",
    password: "",
  })

  let [signupservices, setSignupservices] = useState({
    username: "",
    password: "",
    servicename: '',
    city: "",
    address: "",
    description: "",
    phone: "",
    mail: "",
    price: ""

  })

  let [services, setServices] = useState([])

  try {
    if (signup.role == "Customer") {
      document.getElementById('rolecont').style.display = 'none'
      document.getElementById('signupcont').style.display = 'flex'
      document.getElementById('signup_services').style.display = 'none'

    }
    else if (signup.role == "Provider") {
      document.getElementById('rolecont').style.display = 'none'
      document.getElementById('signup_services').style.display = 'flex'
      document.getElementById('signupcont').style.display = 'none'

    }
    else { }
  }
  catch (e) { }

  const [logins, setLogins] = useState([])
  const [newuser, setNewuser] = useState(true)
  const [showinp, setShowinp] = useState(false);

  const followinglist2 = []




  if (showinp == true) {
    document.getElementById('input-cont').style.display = 'flex'
    document.getElementById('loading').style.display = 'none'
    document.getElementById('notfound').style.display = 'none'
    // clearInterval(interval)
  }



  const handlesignup_anim = () => {
    document.getElementById("input-cont").style.flexDirection = "row"
    document.getElementById('logincont').style.display = "none"
    document.getElementById('rolecont').style.display = "flex"
    // document.getElementById('signupcont').style.display = "flex"
  }

  const handlesignin_anim = () => {
    document.getElementById("input-cont").style.flexDirection = "row"
    document.getElementById('logincont').style.display = "flex"
    document.getElementById('rolecont').style.display = "none"
    document.getElementById('signupcont').style.display = "none"
    document.getElementById('signup_services').style.display = 'none'
    setSignup({ ...signup, role: "" })

  }

  let name; let value;
  const handleChange = (e) => {
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value })

    document.getElementById('wrongpass').style.display = 'none'
    document.getElementById('loginbtn').innerText = 'Log In'
    document.getElementById('loginbtn').style.backgroundColor = '#6EE7B7'
    document.getElementById('loginbtn').style.zIndex = '1'


  }


  const handleSignup = (e) => {
    name = e.target.name;
    value = e.target.value;
    setSignup({ ...signup, [name]: value })

    document.getElementById('signupbtn').style.zIndex = '0'
    document.getElementById('signupbtn').style.backgroundColor = '#6EE7B7'
    document.getElementById('signupbtn').innerText = 'Sign Up'
    document.getElementById('wrongnewpass').style.display = 'none'
  }

  const handleSignupservices = (e) => {
    name = e.target.name;
    value = e.target.value;
    setSignupservices({ ...signupservices, [name]: value })
    document.getElementById('signupbtn').style.zIndex = '0'
  }

  const handleservices = (e) => {
    e.target.style.backgroundColor = '#6EE7B7'
    setServices([...services, e.target.innerText]);
  }

  const submit = async () => {

    if (user.username == '' || user.password == '') {
      document.getElementById('username').style.border = '1px solid red'
      document.getElementById('password').style.border = '1px solid red'
    }
    else {

      document.getElementById('loginbtn').innerText = 'Log In ...'
      document.getElementById('loginbtn').style.backgroundColor = '#6EE7B7'
      document.getElementById('loginbtn').style.zIndex = '-1'


      const userdet = {
        username: user.username,
        mail: user.mail,
        role: user.role,
        password: user.password
      }
      console.log(userdet)
      const alllogin = fetch(`https://tasknest-3wwt.onrender.com/${userdet.role == 'Customer' ? 'login' : 'loginservices'}`, { method: 'post', headers: { "Content-Type": "application/json" }, credentials: 'include', body: JSON.stringify(userdet) })

      alllogin.then(response => response.json()).then(data => {
        console.log(data)
        if (data.loggedin != null && data.loggedin.mail === user.mail && data.loggedin.role === 'Customer') {
          console.log('good')
          localStorage.setItem('isloggedin', true)
          localStorage.setItem('user-role', data.loggedin.role)


          document.getElementById('input-cont').style.display = 'none'
          document.getElementById('logo').style.display = 'none'
          document.getElementById('welcomebackcont').style.display = 'flex'
        }
        else if (data.loggedin != null && data.loggedin.mail === user.mail && data.loggedin.role === 'Provider') {
          console.log('good')
          localStorage.setItem('isloggedin', true)
          localStorage.setItem('current-users-phone', data.loggedin.phone)
          localStorage.setItem('user-role', data.loggedin.role)


          document.getElementById('input-cont').style.display = 'none'
          document.getElementById('logo').style.display = 'none'
          document.getElementById('welcomebackprovidercont').style.display = 'flex'
        }
        else {
          document.getElementById('wrongpass').style.display = 'initial'
          document.getElementById('loginbtn').innerText = 'Log In'
          document.getElementById('loginbtn').style.backgroundColor = '#6EE7B7'
          document.getElementById('loginbtn').style.zIndex = '1'

        }

      })
    }
  }

  const submitSignup = async () => {
    document.getElementById('signupbtn').style.zIndex = '-1'
    document.getElementById('signupbtn').style.backgroundColor = '#6EE7B7'
    document.getElementById('signupbtn').innerText = 'Sign Up...'

    if (signup.username == '' || signup.password == '') {
      document.getElementById('username1').style.border = '1px solid red'
      document.getElementById('password1').style.border = '1px solid red'
    }
    else if (signup.mail == '') {
      document.getElementById('mail1').style.border = '1px solid red'
    }
    else {

      const signupreq = await fetch('https://tasknest-3wwt.onrender.com/signup', { method: 'post', headers: { "Content-Type": "application/json" }, credentials: 'include', body: JSON.stringify(signup) })

      const resdata = await signupreq.json();
      console.log(resdata)
      if (resdata.message == 'Success') {
        localStorage.setItem('isloggedin', true)
        localStorage.setItem('user-role', signup.role)
        document.getElementById('signupcont').style.display = 'none'
        document.getElementById('rolecont').style.display = 'none'
        document.getElementById('logo').style.display = 'none'
        document.getElementById('input-cont').style.display = 'none'
        document.getElementById('newusercont').style.display = 'flex'
      }
    }
  }

  const submitserviceSignup = async () => {
    document.getElementById('signupbtn').style.zIndex = '-1'
    document.getElementById('signupbtn').style.backgroundColor = '#6EE7B7'
    document.getElementById('signupbtn').innerText = 'Sign Up...'

    const data = {
      username: signupservices.username,
      password: signupservices.password,
      mail: signupservices.mail,
      servicename: signupservices.servicename,
      city: signupservices.city,
      address: signupservices.address,
      description: signupservices.description,
      phone: signupservices.phone,
      services: services,
      role: signup.role,
      price: signupservices.price
    }
    const signupservice = await fetch('https://tasknest-3wwt.onrender.com/signupservice', { method: 'post', headers: { "Content-Type": "application/json" }, credentials: 'include', body: JSON.stringify(data) })
    const resdata = await signupservice.json();

    if (resdata.message == 'Success') {
      localStorage.setItem('user-role', data.loggedin.role)
      localStorage.setItem('current-users-servicename', signupservices.servicename);
      document.getElementById('signup_services').style.display = 'none'
      document.getElementById('newusercont').style.display = 'flex'
      document.getElementById('logo').style.display = 'none'
      document.getElementById('input-cont').style.display = 'none'
    }
  }

  let loadingstatements = ['Just a moment... Excellence can’t be rushed!',
    'Grabbing the magic wand... Sparkles loading!',
    'Almost there! Great experiences are just seconds away.',
    'We’re cooking up something great—almost done baking!',
    'Loading... This is a great time to take a deep breath!']

  return (
    <>

      <div className="cont">

        <div className="logo" id='logo'>COMMUNE</div>
        <div className="loading" id='loading'>


          {/* <iframe id='loadingframe' src="https://lottie.host/embed/0779841c-24c8-4da4-b4bb-8b366930a3af/z6EltEHTOI.lottie" frameborder="0"></iframe> */}

          <p className='loadingstatement' id='loadingstatement'>{loadingstatements[Math.floor(Math.random() * 5)]}</p>
          <p className='loadingstatement' id='notfound' style={{ display: 'none' }}>We're sorry for the inconvenience 😔</p>
        </div>

        <div className="input-cont" id='input-cont'>

          { /* login form */}
          <div className="logincont" id='logincont'> Sign In
            <div id='wrongpass' className='wrongpass' style={{ display: 'none' }}>Incorrect username or password.<br /> New to Commune? Please sign up!</div>



            <input type="text" name='username' value={user.username} placeholder='Username' id='username' onChange={handleChange} />
            <input type="text" name='password' value={user.password} placeholder='password' onChange={handleChange} />
            <input type="text" name='mail' value={user.mail} placeholder='E-mail' id='password' onChange={handleChange} />


            <div className="rolecont" id='rolecontsignin'>
              <div className="selectdp-head">Log In As?</div>
              <input type="radio" name='role' value="Customer" id='role' onChange={handleChange} />
              <span>Customer</span>
              <input type="radio" name='role' value="Provider" id='role' onChange={handleChange} />
              <span>Provider</span>
            </div>

            <div className='signbtn-holder'>
              <button type='submit' className='submit-btn' id='loginbtn' onClick={() => { submit() }}>Log In</button>

              <button className='submit-btn' onClick={handlesignup_anim}>Sign Up</button>
            </div>

          </div>

          {/* //role selection at signup */}

          <div className="rolecont" id='rolecont'>
            <div className="selectdp-head">Who are you?</div>
            <input type="radio" name='role' value="Customer" id='role' onChange={handleSignup} />
            <span>Customer</span>
            <input type="radio" name='role' value="Provider" id='role' onChange={handleSignup} />
            <span>Provider</span>
          </div>


          {/* // signup for customer */}

          <div className="signupcont" id='signupcont'> Sign Up
            <div className='wrongpass' id='wrongnewpass' style={{ display: 'none' }}>This password is already taken.<br /> Please think of a new one. </div>
            <input type="text" name='username' id='username1' placeholder='Username' value={signup.username} onChange={handleSignup} />
            <input type="text" name='password' id='password1' placeholder='password' value={signup.password} onChange={handleSignup} />
            <input type="text" name='phone' id='phone1' placeholder='Contact No.' value={signup.phone} onChange={handleSignup} />
            <input type="text" name='mail' id='mail1' placeholder='E-mail' value={signup.mail} onChange={handleSignup} />

            <div className='signbtn-holder'>
              <button type='submit' className='submit-btn' onClick={handlesignin_anim}>Log In</button>
              <button type='submit' id='signupbtn' className='submit-btn' onClick={() => { submitSignup() }}>Sign up</button>
            </div>
          </div>



          {/* // signup for service provider */}

          <div className="signup_services" id='signup_services'> Sign Up
            <div className='wrongpass' id='wrongnewpass' style={{ display: 'none' }}>This password is already taken.<br /> Please think of a new one. </div>

            <div className="personaldet">
              <input type="text" name='username' id='username1' placeholder='Username' value={signupservices.username} onChange={handleSignupservices} />
              <input type="text" name='password' id='password1' placeholder='Password' value={signupservices.password} onChange={handleSignupservices} />
              <input type="number" name='phone' id='phone1' placeholder='Mobile number' value={signupservices.phone} onChange={handleSignupservices} />
              <input type="text" name='mail' id='mail1' placeholder='E-mail' value={signupservices.mail} onChange={handleSignupservices} />

            </div>

            <div className="services" id='services'>
              <div className="serviceconts">
                <h4>Home service</h4>
                <div className="allservices">
                  <div className="servicename" onClick={handleservices}>Housekeeping</div>
                  <div className="servicename" onClick={handleservices}>Gardening</div>
                  <div className="servicename" onClick={handleservices}>Plumbing</div>
                  <div className="servicename" onClick={handleservices}>Electrician</div>
                  <div className="servicename" onClick={handleservices}>Carpenter</div>
                  <div className="servicename" onClick={handleservices}>Painter</div>
                  <div className="servicename" onClick={handleservices}>AC Repair</div>
                  <div className="servicename" onClick={handleservices}>Pest Control</div>
                </div>
              </div>
              <div className="serviceconts">
                <h4>Salon & Spa Services</h4>
                <div className="allservices">
                  <div className="servicename" onClick={handleservices}>Haircut</div>
                  <div className="servicename" onClick={handleservices}>Facial</div>
                  <div className="servicename" onClick={handleservices}>Massage</div>
                  <div className="servicename" onClick={handleservices}>Manicure</div>
                  <div className="servicename" onClick={handleservices}>Pedicure</div>
                </div>
              </div>
              <div className="serviceconts">
                <h4>Personal Services</h4>
                <div className="allservices">
                  <div className="servicename" onClick={handleservices}>Fitness Trainer</div>
                  <div className="servicename" onClick={handleservices}>Yoga Instructor</div>
                  <div className="servicename" onClick={handleservices}>Art Teacher</div>
                  <div className="servicename" onClick={handleservices}>Dance Teacher</div>
                  <div className="servicename" onClick={handleservices}>Music Teacher</div>
                  <div className="servicename" onClick={handleservices}>Chef</div>
                  <div className="servicename" onClick={handleservices}>Life Coach</div>
                  <div className="servicename" onClick={handleservices}>Dentist</div>

                </div>
                {/* <div className="serviceconts"><h4>Travel Service</h4></div> */}
                <div className="serviceconts">
                  <h4>Hotel Service</h4>
                  <div className="allservices">
                    <div className="servicename" onClick={handleservices}>Rooms</div>
                    <div className="servicename" onClick={handleservices}>Resorts</div>
                    <div className="servicename" onClick={handleservices}>Restaurants</div>
                    <div className="servicename" onClick={handleservices}>Fast Foods</div>
                    <div className="servicename" onClick={handleservices}>Cafes</div>
                  </div>
                </div>
              </div>
            </div>

            <input type="text" name='servicename' id='servicename' placeholder='Your service name / Organization Name' value={signupservices.servicename} onChange={handleSignupservices} />
            <input type="text" name='description' id='description' placeholder='Description' value={signupservices.description} onChange={handleSignupservices} />
            <input type="number" name='price' id='price' placeholder='Rs/hour' value={signupservices.price} onChange={handleSignupservices} />

            <div className="address">
              <input type="text" name='city' id='city' placeholder='City' value={signupservices.city} onChange={handleSignupservices} />
              <input type="text" name='address' id='address' placeholder='address' value={signupservices.address} onChange={handleSignupservices} />

            </div>

            <div className='signbtn-holder'>
              <button type='submit' className='submit-btn' onClick={handlesignin_anim}>Log In</button>

              <button type='submit' id='signupbtn' className='submit-btn' onClick={() => { submitserviceSignup() }}>Sign up</button>
            </div>
          </div>

        </div>
      </div>

      {/* // welcome back animation */}
      <div id='welcomebackcont'>
        <div className="celebration1">
          <iframe id='celebration' src="https://lottie.host/embed/503bed59-c29d-46eb-935d-a996c60858a3/geOsLMBMTf.lottie" frameborder="0"></iframe>
        </div>
        <p className='welcomeback'>Welcome Back {user.username} !</p>
        <button className='navbtn1'  ><Link to={'/'}>Home</Link></button>
      </div>


      {/* // welcome back provider animation */}

      <div id='welcomebackprovidercont'>
        <div className="celebration1">
          <iframe id='celebration' src="https://lottie.host/embed/503bed59-c29d-46eb-935d-a996c60858a3/geOsLMBMTf.lottie" frameborder="0"></iframe>
        </div>
        <p className='welcomeback'>Welcome Back {user.username} !</p>
        <button className='navbtn1'  ><Link to={'/serviceprovider'}>Home</Link></button>
      </div>

      {/* // new user animation */}
      <div id='newusercont'>
        <div className="celebration">
          <iframe id='celebration' src="https://lottie.host/embed/d7852d0f-dbde-43f2-9223-9233d839e93f/9i7ZLGOPeC.lottie" frameborder="0"></iframe>
        </div>
        <p className='welcomeback'>
          Welcome to Commune! 🎉 <br />
          We're so glad you've joined us.</p>
        <button className='navbtn1'  ><Link to={'/'}>Home</Link></button>
      </div>

    </>
  )
}

export default Login
