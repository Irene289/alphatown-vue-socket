import Vue from 'vue'
import Vuex from 'vuex'
import userAPI from '../api/user'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentUser: {
      id: -1,
      name: '',
      account: '',
      avatar: '',
    },
    getCurrentUser: false,
    token: '',
    isAuthenticated: false
  },
  getters: {
  },
  mutations: {
    setCurrentUser(state, currentUser){
      state.currentUser = {
        ...state.currentUser,
        ...currentUser,
        avatar: currentUser.avatar ? currentUser.avatar : require('../assets/static/images/alphaTown2.png')
      }
      state.getCurrentUser = true
      state.token = localStorage.getItem('token'),
      state.isAuthenticated = true
    },
    //註冊時儲存token 和 isAuth、getCurrentUser狀態
    setToken(state, token){
      state.token = token
      state.isAuthenticated = true
      state.getCurrentUser = false
    },
    getCurrentUserStatus(state, isGet){
      state.getCurrentUser = isGet
    },
    //登出
    revokeAuthentication(state) {
      //清空state
      state.currentUser = {}
      //是否取得currentUser改為false
      state.getCurrentUser = false
      //通過驗證改為false
      state.isAuthenticated = false
      //移除sate中儲存的token
      state.token = ""
      //移除localStoage裡儲存的
      localStorage.removeItem('token')
    },
    setIsLoading(state, data) {
      state.isLoading = data
    }
  },
  actions: {
    async fetchCurrentUser({commit}){
      try{
        const response = await userAPI.getCurrentUser()
        const { id, account, name, avatar } = response.data.data
        if(response.data.status !== 'success'){
          throw new Error(response.data.data.status )
        }
        commit('setCurrentUser', {
          id,
          name,
          account,
          avatar: avatar ? avatar : require('../assets/static/images/alphaTown2.png')
        })
        commit('getCurrentUserStatus', true)
        return true
      }catch(error){
        console.log(error)
        commit('getCurrentUserStatus', false)
        return false
      }
     
    }
  },
  modules: {
  }
})
