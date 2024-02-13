import express from "express";
import { config } from "dotenv";
import cors from 'cors';
import FriendsRouter from '../backend/routes/friends.js'
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

app.post('/', (req, res)=> {
    res.send(`Hello, ${req.body.name}.  Welcome to the server!`)
})
app.listen(PORT, () => console.log(`Server is running on port http://localhost:${PORT}`))