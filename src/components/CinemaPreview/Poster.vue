<template>
    <div
            :style="{ 'background-image': `url(${url})` }"
            id="poster">
    </div>
</template>

<script>
    export default {
        name: 'Poster',

        props: {
            /**
             * @param {string} url
             */
            url: {
                type: String,
                required: true
            }
        }
    }
</script>

<style scoped lang="scss">
    #poster {
        margin-top: 10vh;
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
        height: 50vh;
        width: 60vw;
        margin: 10vh auto 0;
    }
</style>