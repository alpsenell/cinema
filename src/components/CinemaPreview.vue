<template>
    <div id="cinema-preview">
        <div
                :style="{ 'background-image': `url(${cinema.posterurl})` }"
                class="poster">
        </div>
        <h1>{{ cinema.originalTitle }}</h1>
        <div class="cinema-info">
            <span class="year">{{ cinema.year }}</span>
            <div class="genres">
                <span class="genre" v-bind:key="genre" v-for="genre in cinema.genres">{{ genre }}</span>
            </div>
            <span class="duration">{{ duration }}</span>
        </div>
        <div class="rating">
            <span>{{ cinema.imdbRating }}</span>/10
        </div>
        <div class="rating-meter">
            <span
                    :style="{ width: `${ratingMeter}%` }"
                    class="meter"></span>
        </div>
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
        height: 100vh;
        overflow: auto;
        background: linear-gradient(#ff6000 32%, #FFFFFf 60%, #ffffff 100%);

        .poster {
            height: 50vh;
            margin-top: 10vh;
            width: 100%;
            background-size: contain;
            background-repeat: no-repeat;
            background-position: center;
            -webkit-border-radius: 4px;
            -moz-border-radius: 4px;
            border-radius: 4px;
        }

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

        .rating {
            span {
                font-size: 24px;
                font-weight: bold;
            }
        }

        .rating-meter {
            width: 80%;
            height: 10px;
            background-color: #ebebeb;
            margin: 0 auto;
            border-radius: 10px;
            overflow: hidden;

            .meter {
                background-color: #ff6000;
                height: 100%;
                display: block;
            }
        }
    }
</style>