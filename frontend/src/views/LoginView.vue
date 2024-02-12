<template>
    <div class="view">
        <h1>Login</h1>
        <form @submit.prevent="login" class="login-form">
            <div class="form-group">
                <label for="email">Email:</label>
                <input type="email" id="email" v-model="email" required>
            </div>
            <div class="form-group">
                <label for="password">Password:</label>
                <input type="password" id="password" v-model="password" required>
            </div>
            <button @click="login()">Login</button>
        </form>
    </div>
</template>
<script>
export default {
    data() {
        return {
            email: '',
            password: ''
        };
    },
    methods: {
        login() {
            console.log(this.$data)
            this.$store.dispatch('login',this.$data);
        }
    }
}
</script>
<style scoped>
.view {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.login-form {
    width: 300px;
    padding: 20px;
    border-radius: 8px;
    background-color: darkgoldenrod;
}
label{
    color: white;
}
.form-group {
    margin-bottom: 20px;
}
label {
    font-weight: bold;
    display: block;
    margin-bottom: 5px;
}
input[type="email"],
input[type="password"] {
    width: calc(100% - 20px); /* Adjust width to account for padding */
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
}
button {
    width: 100%;
    padding: 10px;
    background-color: red;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}
button:hover {
    background-color: black;
    color: white;
    box-shadow: 10px 10px red;
    transition: 2s;
}
</style>