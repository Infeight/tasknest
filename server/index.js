const express = require ('express');
const app = express();
const cors = require ('cors')
const bodyParser = require('body-parser')
const login = require('./mongo')
const loginservices = require('./mongo')
const booking = require('./mongo')
const verify = require('./auth')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const port = 5004;
const JWT_SECRET = "tarun@!%$(}<>#+-*/&%";

const cookieParser = require('cookie-parser');
app.use(cookieParser());


app.use(cors({
    origin: ['https://tasknest-pink.vercel.app', 'http://localhost:5173'],
    methods: ['GET', 'POST'],
    credentials: true,
}));
app.use(bodyParser.json())

const server = app.listen(port,() =>{
    console.log(`listening on port ${port}`)
})

// app.get('/', async(req, res) => {
//   const { username, mail } = req.body;
//   const loggedin = await login.login.findOne({
//     username: username,
//     mail: mail
//   });
//   const getorders = await booking.booking.find({
//     clientname:username,
//     clientmail:usermail,
//   })
// res.send(loggedin,getorders)
// })


app.post('/getuser', async(req, res) => {
  const { username, mail } = req.body;    
  const loggedin = await login.login.findOne({
    username: username,
    mail: mail
  });

  res.json({ loggedin: loggedin });
})

app.post('/login', async(req,res)=>{
   const {username, mail ,password} = req.body;
   
   const loggedin = await login.login.findOne({username:username ,mail:mail})
  // console.log(loggedin)
   if(await bcrypt.compare(password, loggedin.password)){
    const token = jwt.sign(
      {username: username,mail:mail},
      JWT_SECRET,
      { expiresIn: '1h' }
    );
     res.cookie('token', token, {
      httpOnly: true,      
      secure: false,       
      sameSite: 'Lax',
      maxAge: 60 * 60 * 1000 
    })
    return res.json({loggedin:loggedin})
   
   }
  })
  

app.post('/loginservices', async(req,res)=>{
    const {username, mail ,password} = req.body;
    
    const loggedin = await loginservices.loginservices.findOne({username:username ,mail:mail})
  
    if(await bcrypt.compare(password, loggedin.password)){
      console.log(loggedin.password)
      const token = jwt.sign(
        {username: username,mail:mail},
        JWT_SECRET,
        { expiresIn: '1h' }
      );
       res.cookie('token', token, {
        httpOnly: true,      
        secure: false,       
        sameSite: 'Lax',
        maxAge: 60 * 60 * 1000 
      })
      res.json({loggedin:loggedin})
     }
  
})

  app.post('/signinservices',  async (req, res) => {
    const { username, mail } = req.body;    
    const loggedin = await loginservices.loginservices.findOne({
      username: username,
      mail: mail
    });
   console.log(loggedin)
    res.json({ loggedin: loggedin });
  });
  
  

app.post('/signup', async (req, res) => {
   
    const { username, phone, mail,role,password } = req.body;
    const hashedpass =  await bcrypt.hash(password, 10)
    try {
        let newUser = {
            username,
            phone,
            mail,
            role,
password: hashedpass 
 };
        await login.login.insertMany(newUser)

        const token = jwt.sign(
          {username: newUser.username, mail:mail},
          JWT_SECRET,
          { expiresIn: '1h' }
        );
        res
        .cookie('token', token, {
          httpOnly: true,      
          secure: false,       
          sameSite: 'Lax',
          maxAge: 60 * 60 * 1000 
        })
        res.json({ message: 'Success' ,token});
    } catch (error) {
        console.log(error);
    }

})

app.post('/signupservice', async (req, res) => {
    const { username, password, mail,role, servicename, city, address, description, phone, services,price } = req.body;
    const hashedpass = await bcrypt.hash(password, 10);
    
        let newService ={
            username,
            password: hashedpass,
            mail,
            role,
            servicename,
            city,
            address,
            description,
            phone,
            services,
            price
        };
        await loginservices.loginservices.insertMany(newService)

        const token = jwt.sign(
          {username: newService.username , mail:mail},
          JWT_SECRET,
          { expiresIn: '1h' }
        );

        res.cookie('token', token, {
          httpOnly: true,      
          secure: false,       
          sameSite: 'Lax',
          maxAge: 60 * 60 * 1000 
        }).
        json({
          message: 'Success',
          token
        })
})

app.post('/services', async(req,res)=>{
    const data = {
     servicename: req.body.service
    }
  
    const getservice = await loginservices.loginservices.find({
        services:{
          $all:[data.servicename]
        }
      })
    
      const allservices = getservice.map(service=>{
        return{
          service: service
        }
      })

   res.json(allservices)
  })

  app.post('/orders',async(req,res)=>{
    const { serviceusername, servicemail } = req.body;


   const getorders = await booking.booking.find({
     serviceusername: serviceusername,
      servicemail: servicemail,
      })
      console.log(getorders)
      const allorders = getorders.map(order=>{
        return{
          order: order
        }
      })

   res.json(allorders)
  })

  app.post('/mybooking', async(req,res)=>{
    const { clientname, clientmail } = req.body;
   
  
    // console.log(data)
   const getorders = await booking.booking.find({
        clientname:clientname,
        clientmail:clientmail,
      })
    // console.log(getorders)
      const allorders = getorders.map(order=>{
        return{
          order: order
        }
      })

   res.json(allorders)
  })

  app.post('/bookings', async(req,res)=>{
    const data = {
     address: req.body.address,
     requirement: req.body.requirement,
     number: req.body.number,
     service: req.body.service,
     serviceusername: req.body.serviceusername,
     servicemail: req.body.servicemail,
     clientname: req.body.clientname,
     clientphone: req.body.clientphone,
     clientmail: req.body.clientmail,
     status: req.body.status
    }
   const booked = await booking.booking.insertMany(data)
   res.status(200).json({ message: 'Success' });
  })

  app.post('/acceptorder', async(req,res)=>{
    const data = {
     _id: req.body._id
    }
   const accept = await booking.booking.updateOne({_id:data._id},{$set:{status:'Accepted'}})
   if(accept.modifiedCount>0){
    res.status(200).json({ message: 'Success' });
   }else{
    res.status(400).json({ message: 'Error' });
   }
  })

  app.post('/rejectorder', async(req,res)=>{
    const data = {
     _id: req.body._id
    }
   const accept = await booking.booking.updateOne({_id:data._id},{$set:{status:'Rejected'}})
   if(accept.modifiedCount>0){
    res.status(200).json({ message: 'Success' });
   }else{
    res.status(400).json({ message: 'Error' });
   }
  })