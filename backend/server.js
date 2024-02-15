import express from "express";  
import {config} from "dotenv";
import cors from 'cors';
import FriendsRouter from '../backend/routes/friends.js' 
import bcrypt from 'bcrypt';
import cookieParser from "cookie-parser";
import jwt  from "jsonwebtoken";

import {addUser,checkUser} from  '../backend/models/database.js'

config();   
const PORT = process.env.PORT 
 
const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static('views'))
app.use('/friends', FriendsRouter)
app.use(cookieParser())

// passing the object of data
app.post('/login', (req, res)=> {
    const {username} = req.body
    const token = jwt.sign({username:username},
        process.env.SECRET_KEY,{expiresIn: '1hr'})
        res.cookie('jwt',token)
        res.json({
            msg:"You have logged into the website, Well done, You're not illegal"

        })
})
const authenticationToken = (req, res, next) => {

}
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
    const {username, password} = req.body
    const hashedPassword = await checkUser(username) 
    bcrypt.compare(password,hashedPassword,(err,result) =>{   
        if (err) throw err 
        if(result === true){
            next()
        }else {
            res.send({msg:"The Password Does Not Match Bro!"})
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