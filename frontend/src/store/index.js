import { createStore } from 'vuex'
import axios from 'axios'

const BASE_URL = 'http://localhost:8082'
// Matthew way
// const BASE_URL = 'http://localhost:8082/friends'

export default createStore({
  state: {
    name: '',
    age: '',
    friends: ''
  },
  getters: {
  },
  mutations: {
    setFriends (state, data) {
      state.friends =data
    },
    setName (state, data) {
      state.name = data
    }
  },
  actions: {
    login({commit}, personName){
      axios.post(BASE_URL + '/login', personName)
        .then(res => {
         console.log(res.data);
      })
    },
    getFriends({commit}){
      axios.get(BASE_URL + "/friends",)
      .then (res => {
        commit('setFriends', res.data)
        console.log(res.data);
      })
    },
    updateOne({commit}, userData) {
      try {
        const response = axios.patch(`/backend/controller/friends.js`, userData);
        return response.data;
      } catch (error) {
        console.error('Error editing user:', error);
        throw error;
      }
    },
    // matthew way
    async getFriends ({commit}) {
      let {data} = await axios.get(BASE_URL)
      console.log(data);
      commit('setFriends',data)
    }
  },
  modules: {
  }
})

// promise pending requires await 