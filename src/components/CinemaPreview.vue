<template>
    <div>

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
            // eslint-disable-next-line no-console
            console.log(this.id);
            axios.get(`data/${this.id}.json`).then((response) => {
                this.cinema = response.data;
            });
        }
    }
</script>

<style scoped>

</style>