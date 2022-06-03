import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import NotFound from '../views/NotFound'
import Signin from '../views/Signin'
import Chat from '../views/Chat.vue'
import {Toast} from '../utils/helpers'

Vue.use(VueRouter)


const routes = [
  {
    path: '/',
    name: 'root',
    meta: { requiresAuth: false },
    component: Signin
  },
  {
    path: '/chat',
    name: 'chat',
    meta: { requiresAuth: true },
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
  let getCurrentUser = store.state.getCurrentUser  //判斷是否已取的currentUser

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
      //已經註冊 但未取的currentUser
      if (isAuthenticated && !getCurrentUser) {
        getCurrentUser = await store.dispatch('fetchCurrentUser')
        next()
        return
      } else {
        Toast.fire({
          icon: 'warning',
          title: '您訪問的頁面需要登入，若尚未註冊，請先註冊'
        })
        next({ path: '/signin' })
        return
      }
    }
  } else {
    if (isAuthenticated){
      next('/chat')
      return
    } else{
      next()
      return
    }  
  }  
})
//有衝突修改為上方，因為有加入註冊後自動導向首頁的功能，所以先採用Seijo原本的作法，如果Irene想修改的話可以再改
// TODO: fetchCurrentUser
// router.beforeEach((to, from, next) => {
//   const tokenInLocalStorage = localStorage.getItem('token')
//   const tokenInStore = store.state.token
//   let isAuthenticated = store.state.isAuthenticated
//   const routerNameWithoutAuthentication = ['sign-in', 'sign-up']

//   if (tokenInLocalStorage && tokenInLocalStorage !== tokenInStore) {
//     isAuthenticated = true
//   }
//   if (!isAuthenticated && !routerNameWithoutAuthentication.includes(to.name)) {
//     next('/signin')
//     return
//   }
//   if (isAuthenticated && routerNameWithoutAuthentication.includes(to.name)) {
//     next('/chat')
//     return
//   }
  
//   next()
// })

export default router
