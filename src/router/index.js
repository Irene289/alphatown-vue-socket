import Vue from 'vue'
import VueRouter from 'vue-router'
import Signin from '../views/Signin'
import NotFound from '../views/NotFound'
import Chat from '../views/Chat.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Chat
  }
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

export default router
