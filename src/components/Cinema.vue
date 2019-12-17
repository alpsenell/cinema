<template>
    <div>
        <h1>Cinema Page</h1>
        <p>Cinema id is {{ $route.params.id }}</p>
    </div>
</template>

<script>
    export default {
        name: "Cinema",
        watch: {
            '$route' (to, from) {
                /* eslint-disable no-console */
                console.log(to);
                console.log(from);
            }
        },
        created() {
            console.log(this.$router);
        }
    }
</script>

<style scoped>

</style>