<template>
    <div id="cinema-preview">
        <div
                :style="{ 'background-image': `url(${cinema.posterurl})` }"
                class="poster">
        </div>
        <h2>{{ cinema.originalTitle }}</h2>
        <div class="cinema-info">
            <span class="year">{{cinema.year}}</span>
            <span class="genres" v-bind:key="genre" v-for="genre in cinema.genres">{{genre}}</span>
            <span class="duration">{{duration}}</span>
        </div>
        <div class="rating"></div>
        <div class="rating-meter"></div>
        <button class="cinema-link">
            <router-link :to="cinema.id">Movie Details</router-link>
        </button>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        name: 'CinemaPreview',

        props: {
            /**
             * @param {string} id
             */
            id: {
                type: String,
                required: true
            }
        },

        computed: {
            duration () {
                const cinemaDuration = ((this.cinema || {}).duration || '').replace(/[^0-9]/g, '') || 0;
                const hours = Math.floor(cinemaDuration / 60);
                const minutes = cinemaDuration % 60;

                return hours + 'h ' + minutes + 'min';
            }
        },

        data: function () {
            return {
                cinema: {
                    id: '',
                    year: '',
                    genres: [],
                    duration: '',
                    originalTitle: '',
                    imdbRating: '',
                    posterUrl: ''
                }
            };
        },

        created () {
            axios.get(`data/${ this.id }.json`).then((response) => {
                this.cinema = response.data;
            });
        }
    }
</script>

<style scoped lang="scss">
    #cinema-preview {
        .poster {
            height: 50vh;
            width: 100%;
            background-size: contain;
            background-repeat: no-repeat;
            background-position: center;
        }
    }
</style>