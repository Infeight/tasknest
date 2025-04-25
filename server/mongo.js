const mongoose = require ('mongoose')

mongoose.connect('mongodb+srv://revanthnaidunakka:199rkodSss0xkmnp@cluster0.0lcwo8a.mongodb.net/').then(()=>{
    console.log('Connected to db')
}).catch(()=>{
    console.log("Sorry, There's an error in db!")
})



const loginSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    mail:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },

})

const loginserviceSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    mail:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true
    },
    servicename:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    services:{
        type:Array,
        required:true
    },
    price:{
        type:String,
        required:true
    }
    
})

const bookingschema = new mongoose.Schema({
    address:{
        type:String,
        required:true
    },
    requirement:{
        type:String,
        required:true
    },
    number:{
        type:String,
        required:true
    },
    service:{
        type:String,
        required:true
    },
    serviceusername:{
        type:String,
        required:true
    },
    servicemail:{
        type:String,
        required:true
    },
    clientname:{
        type:String,
        required:true
    },
    clientphone:{
        type:String,
        required:true
    },
    clientmail:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true
    },
})


const login = mongoose.model('logins', loginSchema)
const loginservices = mongoose.model('loginservices', loginserviceSchema)
const booking = mongoose.model('bookings', bookingschema)

module.exports = {login,loginservices,booking}