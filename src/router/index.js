import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import NotFound from '../views/NotFound'
import Signin from '../views/Signin'
import Chat from '../views/Chat.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'root',
    component: Signin
  },
  {
    path: '/chat',
    name: 'chat',
    component: Chat
  },
  {
    path: '/signin',
    name: 'sign-in',
    component: Signin
  },
  {
    path: '/signup',
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

// TODO: fetchCurrentUser
router.beforeEach((to, from, next) => {
  const tokenInLocalStorage = localStorage.getItem('token')
  const tokenInStore = store.state.token
  let isAuthenticated = store.state.isAuthenticated
  const routerNameWithoutAuthentication = ['sign-in', 'sign-up']

  if (tokenInLocalStorage && tokenInLocalStorage !== tokenInStore) {
    isAuthenticated = true
  }
  if (!isAuthenticated && !routerNameWithoutAuthentication.includes(to.name)) {
    next('/signin')
    return
  }
  if (isAuthenticated && routerNameWithoutAuthentication.includes(to.name)) {
    next('/chat')
    return
  }
  
  next()
})

export default router
