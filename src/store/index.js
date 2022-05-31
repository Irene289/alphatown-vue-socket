import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentUser: {
      id: -1,
      account: '',
      name: '',
      avatar: '',
    },
    token: '',
    isAuthenticated: false
  },
  getters: {
  },
  mutations: {
    setCurrentUser(state, currentUser) {
      state.currentUser = {
        ...state.currentUser,
        ...currentUser,
        avatar: currentUser.avatar ? currentUser.avatar : require('../assets/static/images/noImage@2x.png')
      },
      state.token = localStorage.getItem('token')
      state.isAuthenticated = true
    },
    revokeAuthentication(state) {
      state.currentUser = {}
      state.token = ''
      state.isAuthenticated = false
      
      localStorage.removeItem('token')
    }
  },
  actions: {
    // TODO: currentUser API
    fetchCurrentUser() {
      console.log('fetchCurrentUser')
    }
  },
  modules: {
  }
})
