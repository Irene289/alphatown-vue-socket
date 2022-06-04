import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '@/assets/scss/reset.scss'
import store from './store'
import VueSocketIO from 'vue-socket.io'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-tw'

Vue.config.productionTip = false

const timeFormat = (time, format = 'A hh:mm') => {
  dayjs.locale('zh-tw')
  var updateLocale = require('dayjs/plugin/updateLocale')
  dayjs.extend(updateLocale)
  dayjs.updateLocale('zh-tw', {
    meridiem: function (hh) {
      return hh > 12 ? '下午' : '上午'
    }
  })
  return time ? dayjs(time).format(format) : ''
}
const timeParserPlugin = {
  install(Vue) {
    Vue.prototype.$timeFormat = timeFormat
  }
}
Vue.use(timeParserPlugin)

Vue.use(new VueSocketIO({
  // debug: true,
  // connection: 'https://live-chat-app-2022.herokuapp.com',
  connection: 'http://localhost:3000',
}))

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
