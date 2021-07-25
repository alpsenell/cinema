<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        name: 'app',
        data () {
            return {
                movies: []
            }
        },
        beforeCreate () {
            axios.get('data/movielist.json').then((response) => {
                console.log(response);
                this.movies = response.data;
            });
        }
    }
</script>

<style>
    html, body {
        margin: 0;
        padding: 0;
    }

    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin: 0;
        padding: 0;
    }
</style>
