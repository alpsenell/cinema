<template>
    <button id="cinema-link">
        <router-link :to="id">Movie Details</router-link>
    </button>
</template>

<script>
    export default {
        name: 'CinemaRouter',

        props: {
            /**
             * @param {string}
             */
            id: {
                type: String,
                required: true
            }
        }
    }
</script>

<style scoped lang="scss">
    #cinema-link {
        width: 80vw;
        border-radius: 8px;
        background-color: #ff6000;
        padding: 20px 0;
        margin-top: 30px;
        border: none;

        a {
            text-decoration: none;
            color: white;
            font-size: 22px;
            letter-spacing: 1.5px;
            text-transform: uppercase;
        }
    }
</style>