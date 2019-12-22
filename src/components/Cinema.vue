<template>
    <div>
        <p>Cinema id is {{ $route.params.id }}</p>
        <div class="cinema-image"  v-bind:style="{ backgroundImage: 'url(' + cinema.posterurl + ')' }"></div>
        <h1>{{cinema.originalTitle}}</h1>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        name: 'Cinema',
        data: function () {
            return {
                cinema: {}
            }
        },
        methods: {
            updateCinemaData () {
                axios.get(`data/${this.$route.params.id}.json`).then((response) => {
                    this.cinema = response.data;
                });
            }
        },
        watch: {
            $route(to, from) {
                if (to !== from) {
                    this.updateCinemaData();
                }
            }
        },
        beforeMount() {
            axios.get(`data/${this.$route.params.id}.json`).then((response) => {
                this.cinema = response.data;
            });
        }
    }
</script>

<style scoped>
    .cinema-image {
        height: 50vh;
        width: 100vw;
        background-size: contain;
        background-repeat: no-repeat;
    }
</style>