import { createStore } from 'vuex'
import axios from 'axios'

const BASE_URL = 'http://localhost:8082'

export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
    login(){
      axios.post(BASE_URL + '/login',)
        .then(data => {
         console.log();
      })
    }
  },
  modules: {
  }
})
