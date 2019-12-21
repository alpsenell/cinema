<template>
    <div>
        <h1>Cinema Page</h1>
        <p>Cinema id is {{ $route.params.id }}</p>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        name: 'Cinema',
        data: function () {
            return {
                cinema: {}
            }
        },
        watch: {
            $route(to, from) { // eslint-disable-line no-unused-vars
                // eslint-disable-next-line no-console
                console.log('to is', to);
                // eslint-disable-next-line no-console
                console.log('from is', from);
            }
        },
        beforeMount() {
            // eslint-disable-next-line no-console
            console.log('inside before create');

            axios.get(`data/${this.$route.params.id}.json`).then((response) => {
                this.cinema = response.data;
            });
        }
    }
</script>

<style scoped>

</style>