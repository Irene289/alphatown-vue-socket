import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '@/assets/scss/reset.scss'
import store from './store'
import VueSocketIO from 'vue-socket.io'
// import { io } from 'socket.io-client'

Vue.config.productionTip = false

Vue.use(new VueSocketIO({
  debug: true,
  connection: 'http://localhost:3000',
}))

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
