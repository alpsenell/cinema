import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
//import VueAxios from 'vue-axios'

Vue.config.productionTip = false

new Vue({
  data () {
    return {
      info: null
    }
  },
  mounted () {
    axios
        .get('https://raw.githubusercontent.com/alpsenell/cinema/master/data/movielist.json')
        .then(response => (this.info = response))
  },
  render: h => h(App),
}).$mount('#app')