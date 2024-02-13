<template>
  <div class="friends">
    <h1>Friends View:</h1>
    <br>
  <div>
    <table>
      <tr>
        <th>ID</th>
      <th>Name</th>
      <th>Age</th>
      <th>Functions</th>
      </tr>
      <tr v-for="friend in $store.state.friends" :key="friend.id">
        <td>{{ friend.id }}</td>
        <td>{{ friend.name }}</td>
        <td>{{ friend.age }}</td>
        <td><button @click="deleteOne(id)" class="delete-btn">Delete</button></td>
        <td><button @click="updateOne(id)" class="update-btn">Edit</button></td>
      </tr>      
      <button @click="addOne(id)" class="add-btn">Add</button>
    </table>
  </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
 data(){

 },
 methods:{
    getFriends(){
      return this.$store.dispatch("getFriends")
    }, 
   
 },
 mounted(){
  this.getFriends()
 }
}
</script>
<style scoped>
/* You can use SCSS or regular CSS based on your preference */
div {
  margin: 20px;
}
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}
th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;

}
th {
  background-color: #F2F2F2;
}
.delete-btn {
  background-color: rgb(185, 0, 0);
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
  text-transform: uppercase;

}
.add-btn{
  background-color: #4CAF50;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
  text-transform: uppercase;

}
.update-btn{
  background-color: rgb(0, 0, 156);
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
  text-transform: uppercase;
}
.delete-btn:hover, .add-btn:hover {
  background-color: #45A049;
}
</style>








