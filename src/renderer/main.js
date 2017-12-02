import Vue from 'vue'
import axios from 'axios'
import Buefy from 'buefy'
import 'buefy/lib/buefy.css'
import 'font-awesome/css/font-awesome.min.css'

import App from './App'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.use(Buefy, {defaultIconPack: 'fa'})
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  template: '<App/>'
}).$mount('#app')
