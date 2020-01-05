<template>
    <div id="rating">
        <span>{{ rating }}</span>/10
    </div>
</template>

<script>
    export default {
        name: 'ImdbRating',

        props: {
            /**
             * @param {number}
             */
            rating: {
                type: Number,
                required: true
            }
        }
    }
</script>

<style scoped lang="scss">
    #rating {
        span {
            font-size: 24px;
            font-weight: bold;
        }
    }
</style>