<template>
    <h1>{{ title }}</h1>
</template>

<script>
    export default {
        name: 'CinemaTitle',

        props: {
            /**
             * @param {string} title
             */
            title: {
                type: String,
                required: true
            }
        }
    }
</script>

<style scoped lang="scss">
    h1 {
        margin-bottom: 0;
    }
</style>