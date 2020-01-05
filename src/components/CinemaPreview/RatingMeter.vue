<template>
    <div class="rating-meter">
            <span
                    :style="{ width: `${ratingMeter}%` }"
                    class="meter"></span>
    </div>
</template>

<script>
    export default {
        name: 'RatingMeter',

        props: {
            /**
             * @param {number} rating
             */
            rating: {
                type: Number,
                required: true
            }
        },

        computed: {
            ratingMeter () {
                return this.rating.toFixed(1).toString().replace('.', '');
            }
        }
    }
</script>

<style scoped lang="scss">
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
</style>