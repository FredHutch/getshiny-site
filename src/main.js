import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'
import VueResource from 'vue-resource'
import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
Vue.use(VueResource)
Vue.http.options.emulateJSON = true
const http=Vue.http
export default http

Vue.use(Vuetify)
Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
