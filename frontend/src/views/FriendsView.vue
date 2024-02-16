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
        <td><button @click="onDeleteFriend(friend.id)" class="delete-btn">Delete</button>
        <button @click="eFriend(friend.id)" class="update-btn">Edit</button></td>
       </tr>      
      <button @click="addFriend()" class="add-btn">Add</button>
      <button @click="getFriends" class="add-btn">Get Friends</button>
    </table>
    <div class="form">
    <input placeholder="name" v-model="name" name="name" type="text">
    <input placeholder="age" v-model="age" name="age" type="text" autocomplete="off">
    
    </div>
  </div>
    </div>
</template>

<script>

export default {
 data(){
  return{

    name:null,
    age: null
  }
},
computed: {
  getFriends(){
      return this.$store.dispatch("getFriends")
},

 methods:{
    
    }, 
    onDeleteFriend(id){
      try {
        this.$store.dispatch('deleteFriend',id);
      } catch (error){
        console.error('Error Deleting Friend', error)
      } 
      window.location.reload()
    }, 
    addFriend(){
      try {
        this.$store.dispatch("addFriend");
        // Matthew answer
        // this.$store.dispatch('addFriend', this.$data) --refers to the data function 
      } catch (error) {
        console.error('Error Adding User', error)
      }
    }, 
    eFriend(id){
      let edit = {
        id:id,
        name:this.name,
        age:this.age
      }
      this.$store.dispatch("editFriend",edit)
    }
 },
 mounted(){
 }
}
</script>
<style scoped>
div {
  margin: 20px;
}
table {
  position: relative;

  width: 50%;
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
.form{
  display: flex;
  flex-direction: column;
  width: 10%;
  padding: 10px;
}
</style>








