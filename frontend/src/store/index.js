import { createStore } from 'vuex'
import axios from 'axios'

const BASE_URL = 'http://localhost:8082/friends'
const BASE_URLU = 'http://localhost:8082'

export default createStore({
  state: {
    friends: [],
    loggedIn: false //--when this changes to true the log in package will dissappear
  },
  mutations: {
    setFriends(state, data) { 
      state.friends = data
    },
    setLogged(state, payload) {
      state.loggedIn = payload
    }
  },
  actions: {
    async logIn({commit}, login) {
      try {
        const {data} = await axios.post(BASE_URLU + '/login', login)
        alert(data.msg);
        commit('setLogged', true)
      } catch (error) {
        console.error('Error during login:', error)
      }
    },
    async getFriends({ commit }) {
      try {
        const res = await axios.get(BASE_URL)
        commit('setFriends', res.data)
      } catch (error) {
        console.error('Error getting friends:', error)
      }
    },
    async deleteFriend({ commit }, id) {
      try {
        await axios.delete(`${BASE_URL}/${id}`)
        // Optionally, you can remove the friend from state if necessary
      } catch (error) {
        console.error('Error deleting friend:', error)
      }
    },
    async addFriend({ commit }) {
      try {
        const name = prompt("Enter friend's name:")
        const age = prompt("Enter friend's age:")
        await axios.post(BASE_URL, { name, age })
        window.location.reload() 
      } catch (error) {
        console.error('Error adding friend:', error)
      }
    },
    async editFriend({commit}, update){
      console.log(update);
      await axios.patch(`${BASE_URL}/`+ update.id, update);
      window.location.reload()
    },
    async addUser({commit},newUser){
      let {data} =await axios.post(BASE_URLU+ '/users',newUser)
      alert(data)
      window.location.reload()
    }
  },
  modules: {

  }
})
