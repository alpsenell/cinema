import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import MainPage from './components/MainPage'
import Cinema from './components/Cinema'

Vue.use(VueRouter);

Vue.config.devtools = true;

const routes = [
  { path: '/cinema/:id', component: Cinema },
  { path: '/', component: MainPage }
];

const router = new VueRouter({
  routes,
  mode: 'history'
});

new Vue({
  el: '#app',
  router,
  render: h => h(App)
});