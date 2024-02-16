import express from "express";  //framework server
import {config} from "dotenv"; //allows us to store our variables in .env file and access data we store in there
import cors from 'cors'; // cross origin resource sharing -- allows us to access our data from a different domain
import FriendsRouter from '../backend/routes/friends.js' 
import bcrypt from 'bcrypt'; //hashes a password
import cookieParser from "cookie-parser"; //allows us too access and get cookies from the browser
import jwt  from "jsonwebtoken"; //authenticates and authorizes, stay signed in based on what we have stored on the cookies

import {addUser,checkUser} from  '../backend/models/database.js'

// code to get secret key require('crypto').randomBytes(64).toString('hex')

// Load environment variables
config();   
const PORT = process.env.PORT 
 


// Create an express application
const app = express()

// middleware to look for the token and if its not there res with error
const auth = (req, res, next) => {
//accessing cookie in backend
//frontend never has to deal with

let {cookie} = req.headers // destructuring to get the cookie
let tokenInHeader = cookie && cookie.split('=')[1]
if(tokenInHeader === null) res.sendStatus(401)
jwt.verify(tokenInHeader,process.env.SECRET_KEY,
    (err,user) =>{ //either the token doesnt match or it does
    //if no access
    if(err) return res.sendStatus(403)
    req.user = user
    next()
})
}
// CORS middleware configuration
    app.use(cors(
        {
            origin:'http://localhost:8080', //the origin will be the hosted site of the frontend
            credentials: true // to allow the headers to be passed to the backend 
        }
    ))
    // Parse incoming request with JSON payloads
app.use(express.json())
// Serve static files from views directory
app.use(express.static('views'))
app.use('/friends', auth ,FriendsRouter)
// use cookie parser middleware
app.use(cookieParser())


//passing the object of data
//two methods of jwt .sign and .verify

app.post('/login', (req, res)=> { 
    const {username} = req.body //taking input from user
    const token = jwt.sign({username:username}, //signing a token
        process.env.SECRET_KEY,{expiresIn: '1hr'}) // passing a secret key
        res.cookie('jwt',token)
        res.json({
            msg:"You have logged into the website, Well done, You're not illegal"
        })
})

app.get('/friends', auth, async (req, res ) => {
    res.send(await getFriends())
})



app.get('/', (req, res)=> {
    res.send({
        message:'Bomba'});
})
// middleware authenticate when a user signs up
app.post('/users',(req, res) => {
    const { username, password } = req.body;
        bcrypt.hash(password, 10,async (err,hash) =>{
            if(err) throw err
            await addUser(username, hash)
        })
        res.send({
            msg: "You have created an account"
        })
})
// creating middleware function
const authenticate=  async (req, res, next) => {
    const {username, password} = req.body // taking an input from the user
    const hashedPassword = await checkUser(username) 
    bcrypt.compare(password,hashedPassword,(err,result) =>{   
    // two methods we use for bcrypt compare and hash
        if (err) throw err 
        if(result === true){
            const {username} = req.body
            const token = jwt.sign({username:username}, process.env.SECRET_KEY,{expiresIn:'1hr'})
            res.cookie('jwt', token)
            next()
        }else {
            res.send({msg:"The username or password does not match"})
        }
    }) 
}
// sending information to the user
app.post('/login', authenticate ,(req, res)=> {
    res.send({
        msg: "You have logged in! Hopaa!!"
    })
})
app.post('/', (req, res)=> { 
    res.send(`Hello, ${req.body.name}.  Welcome to the server!`)
})
app.listen(PORT, () => console.log(`Server is running on port http://localhost:${PORT}`))