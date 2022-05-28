import Vue from 'vue'
import VueRouter from 'vue-router'
import Signin from '../views/Signin'
import NotFound from '../views/NotFound'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'signIn',
    component: Signin
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
  // {
  //   path: '/chat',
  //   name: 'chat',
  //   component: Chat
  // },
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
