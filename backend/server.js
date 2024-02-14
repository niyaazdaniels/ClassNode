import express from "express";  
import { config } from "dotenv";
import cors from 'cors';
import FriendsRouter from '../backend/routes/friends.js' 
import bcrypt from 'bcrypt';

import {addUser} from  '../backend/models/database.js'

config();   
const PORT = process.env.PORT 
 
const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static('views'))
app.use('/friends', FriendsRouter)
 
app.get('/', (req, res)=> {
    res.send({
        message:'Bomba'});
})
// middleware authenticate when a user signs up
app.post('/users',(req, res) => {
    const { username, password } = req.body;
        bcrypt.hash(password, 10,(err,hash) =>{
            if(err) throw err

            res.send({
                msg: "You have created an account"
            })
        })
})

app.post('/', (req, res)=> {
    res.send(`Hello, ${req.body.name}.  Welcome to the server!`)
})
app.listen(PORT, () => console.log(`Server is running on port http://localhost:${PORT}`))