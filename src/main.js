import Vue from 'vue'
import Vuex from 'vuex';
import App from './App.vue'
import VueRouter from 'vue-router'
import MainPage from './components/MainPage'
import Cinema from './components/Cinema'

Vue.use(Vuex);

const store = new Vuex.Store({
  cinema: {
    id: 0,
    year: 0,
    genres: [],
    duration: '',
    originalTitle: '',
    IMDBRating: 0,
    actors: [],
    writers: [],
    directors: [],
    storyline: '',
    posterUrl: ''
  }
});

Vue.use(VueRouter);

Vue.config.devtools = true;

const routes = [
  { path: '/:id', component: Cinema },
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