import {getFriends,getFriend,addFriend, updateFriend, deleteFriend} from '../models/database.js'

export default{
    getMany: async (req,res)=>{
        res.send(await getFriends())
        },
    addOne: async (req,res)=>{   
        const {name,age} = req.body
        const post = await  addFriend(name, age);
        res.send(await getFriends())
        },
    getOne: async (req,res)=>{
        res.send(await getFriend(+req.params.id))
        },
    updateOne: async (req,res)=>{
            const [friend] = await getFriend(+req.params.id)
            let {name,age} = req.body
            name ? name=name: {name}= friend
            age ? age=age : {age}= friend
            await updateFriend(name,age,+req.params.id)
            res.json(await getFriends())
        },
    deleteOne: async (req,res)=>{
            res.send(await deleteFriend(+req.params.id));
        },
    addUs: async function (req, res){
            const {username, password} = req.body
            const post = await addUser(username, password)
            res.send(await addUser())
        },
        logIn: async (req, res, next) => {
            const { username, password } = req.body;
                const hashedPassword = await checkUser(username);
                bcrypt.compare(password, hashedPassword, (err, result) => {
                    if (err) throw err;
                    if (result === true) {
                        next();
                    } else {
                        res.send({ msg: "The Password Does Not Match Bro!" });
                    }
                })
            }
}; 