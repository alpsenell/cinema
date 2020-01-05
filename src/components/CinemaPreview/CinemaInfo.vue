<template>
    <div id="cinema-info">
        <span class="year">{{ year }}</span>
        <div class="genres">
            <span class="genre" v-bind:key="genre" v-for="genre in genres">{{ genre }}</span>
        </div>
        <span class="duration">{{ cinemaDuration }}</span>
    </div>
</template>

<script>
    export default {
        name: 'CinemaInfo',

        props: {
            /**
             * @param {array} genres
             */
            genres: {
                type: Array,
                required: true
            },

            /**
             * @param {string} duration
             */
            duration: {
                type: String,
                required: true,
            },

            /**
             * @param {string} year
             */
            year: {
                type: String,
                required: true
            }
        },

        computed: {
            cinemaDuration () {
                const cinemaDuration = this.duration.replace(/[^0-9]/g, '');
                const hours = Math.floor(cinemaDuration / 60);
                const minutes = cinemaDuration % 60;

                return hours + 'h ' + minutes + 'min';
            }
        }
    }
</script>

<style scoped lang="scss">
    #cinema-info {
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
</style>