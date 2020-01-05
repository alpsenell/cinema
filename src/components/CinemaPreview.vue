<template>
    <div id="cinema-preview">
        <poster :url="cinema.posterurl"></poster>
        <cinema-title :title="cinema.originalTitle"></cinema-title>
        <cinema-info
                :duration="cinema.duration"
                :genres="cinema.genres"
                :year="cinema.year">
        </cinema-info>
        <imdb-rating :rating="cinema.imdbRating"></imdb-rating>
        <rating-meter :rating="cinema.imdbRating"></rating-meter>
        <cinema-router :id="cinema.id"></cinema-router>
    </div>
</template>

<script>
    import axios from 'axios';
    import ImdbRating from './CinemaPreview/ImdbRating';
    import CinemaRouter from './CinemaPreview/CinemaRouter';
    import RatingMeter from './CinemaPreview/RatingMeter';
    import Poster from './CinemaPreview/Poster';
    import CinemaInfo from './CinemaPreview/CinemaInfo';
    import CinemaTitle from './CinemaPreview/CinemaTitle';

    export default {
        name: 'CinemaPreview',

        components: {
            ImdbRating,
            CinemaRouter,
            RatingMeter,
            Poster,
            CinemaInfo,
            CinemaTitle
        },

        props: {
            /**
             * @param {string} id
             */
            id: {
                type: String,
                required: true
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
                    imdbRating: 0,
                    posterurl: ''
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
        height: 100vh;
        max-height: 100vh;
        overflow: auto;
        background: linear-gradient(#ff6000 32%, #FFFFFf 60%, #ffffff 100%);
    }
</style>