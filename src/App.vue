<template>
  <div id="app">
    <div class="category-list" v-for="movie in movies" v-bind:key="movie.id">
      <router-link :to="movie.id" class="dropdown-item">{{ movie.originalTitle }}</router-link>
    </div>
    <hr>
    <router-view></router-view>
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    name: 'app',
    data() {
      return {
        movies: []
      }
    },
    beforeCreate() {
      axios.get('data/movielist.json').then((response) => {
        this.movies = response.data;
      });
    }
  }
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
