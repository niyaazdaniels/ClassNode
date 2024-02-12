import express from "express";
import { config } from "dotenv";
import cors from 'cors';
import {getFriends, addFriend, updateFriend,getFriend, deleteFriend} from './database.js'
config();
const PORT = process.env.PORT

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static('public'))

app.get('/friends/:id', async (req, res) => {
    res.send(await getFriend(+req.params.id));
})

app.post ('/friends', async (req, res)=> {
    const {name, age} = req.body;
    await addFriend(name, age);
    res.send(await getFriends())
})

app.patch('/friends/:id', async (req,res)=>{
    const{name, age} = req.body
    await updateFriend(name, age, +req.params.id);
    res.send(await getFriend(+req.params.id))
});

app.get('/friends', async (req, res) => {
    res.send(await getFriends())
})
app.listen(PORT, () => console.log(`Server is running on port http://localhost:${PORT}`))