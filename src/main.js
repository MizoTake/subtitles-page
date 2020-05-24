import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import VScrollLock from 'v-scroll-lock'

Vue.config.productionTip = false
Vue.use(VScrollLock)

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
