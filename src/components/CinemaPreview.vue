<template>
    <div id="cinema-preview">
        <poster :url="cinema.posterurl"></poster>
        <h1>{{ cinema.originalTitle }}</h1>
        <div class="cinema-info">
            <span class="year">{{ cinema.year }}</span>
            <div class="genres">
                <span class="genre" v-bind:key="genre" v-for="genre in cinema.genres">{{ genre }}</span>
            </div>
            <span class="duration">{{ duration }}</span>
        </div>
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
    import Poster from './CinemaPreview/Poster'

    export default {
        name: 'CinemaPreview',

        components: {
            ImdbRating,
            CinemaRouter,
            RatingMeter,
            Poster
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

        computed: {
            duration () {
                const cinemaDuration = this.cinema.duration.replace(/[^0-9]/g, '');
                const hours = Math.floor(cinemaDuration / 60);
                const minutes = cinemaDuration % 60;

                return hours + 'h ' + minutes + 'min';
            },

            ratingMeter () {
                return this.cinema.imdbRating.toFixed(1).toString().replace('.', '');
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

        h1 {
            margin-bottom: 0;
        }

        .cinema-info {
            span {
                color: #5d5d5d;
            }

            .genres {
                display: inline-block;

                & span {
                    &:not(:last-child):after {
                        content: ',';
                    }
                }
            }

            > div {
                margin: 0 3px;

                &:before {
                    content: '·';
                    margin-right: 3px;
                }

                &:after {
                    content: '·';
                    margin-left: 3px;
                }
            }
        }
    }
</style>