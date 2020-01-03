<template>
    <div id="cinema-preview">
        <div
                class="poster"
                :style="{'background-image': `url(${cinema.posterurl})`}">
        </div>
        <h2>{{cinema.originalTitle}}</h2>
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

        data: function () {
            return {
                cinema: {}
            };
        },

        beforeMount() {
            axios.get(`data/${this.id}.json`).then((response) => {
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