import mysql from 'mysql2';
import {config} from 'dotenv'
config();

const pool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
}).promise()

const getFriends = async () => {
    const [result] = await pool.query( `
    SELECT * 
    FROM mates
    `)
    return result
}

const getFriend = async (id) => {
    const [result] = await pool.query(`
    SELECT * 
    FROM mates
    WHERE id = ?
    `, [id])
    return result
}

const addFriend = async (name,age) => {
    const [friend] = await pool.query (`
    INSERT INTO mates (name,age) VALUES (?,?)
    `,[name,age])
    return getFriend(friend.insertId);
}

const updateFriend = async (name, age, id) => {
    const friend = await pool.query(`
    UPDATE mates
    SET name = ?, age = ?
    WHERE id = ?
    `, [name, age, id])
    const updatedFriend = await getFriends(id);
    return updatedFriend
}

const deleteFriend = async (name) => {
    const [friend] = await pool.query (`
    DELETE FROM mates
    WHERE name = ?
    `, [name])
 }


 export{getFriends, addFriend, updateFriend,getFriend, deleteFriend}