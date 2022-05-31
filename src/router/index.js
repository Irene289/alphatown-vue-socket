import Vue from 'vue'
import VueRouter from 'vue-router'
import Signin from '../views/Signin'
import NotFound from '../views/NotFound'
import Chat from '../views/Chat.vue'
import store from '../store'
import {Toast} from '../utils/helpers'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    meta: { requiresAuth: true },
    name: 'home',
    component: Chat
  },
  {
    path: '/signin',
    meta: { requiresAuth: false },
    name: 'sign-in',
    component: Signin
  },
  {
    path: '/signup',
    meta: { requiresAuth: false },
    name: 'sign-up',
    component: () => import('../views/Signup.vue')
  },
  {
    path: '*',
    name: 'not-found',
    component: NotFound,
  },
]

const router = new VueRouter({
  routes
})
router.beforeEach(async(to, from, next) => {
  const storageToken = localStorage.getItem('token')
  const stateToken = store.state.token
  let isAuthenticated = store.state.isAuthenticated
  let getCurrentUser = store.state.getCurrentUser
  if (to.matched.some(record => record.meta.requiresAuth)){
    //如果已取得token且state的token 和 localStorage的toke不同，那就重新重新打currentUser api獲取資料＆token
    if (storageToken && storageToken !== stateToken) {
      isAuthenticated = await store.dispatch('fetchCurrentUser')
    }
    //如果已經註冊or登入 而且 也已經取得currentUser資料
    if (getCurrentUser && isAuthenticated && stateToken) {
      next()
      return
    } else {
      //已經登註冊 但未取的currentUser
      if (isAuthenticated && !getCurrentUser) {
        getCurrentUser = await store.dispatch('fetchCurrentUser')
        //註冊後導向首頁
        next({ name: 'home' })
        return
      } else {
        Toast.fire({
          icon: 'warning',
          title: '您訪問的頁面需要登入，若尚未註冊，請先註冊在登入'
        })
        next({ path: '/signin' })
        return
      }
     
    }
  } else {
    next()
    return
  }  
})

export default router
