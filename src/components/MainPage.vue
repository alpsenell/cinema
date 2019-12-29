<template>
    <div>
        <cinema-preview id="0001"></cinema-preview>
        <cinema-preview id="0002"></cinema-preview>
        <cinema-preview id="0003"></cinema-preview>
    </div>
</template>

<script>
    import CinemaPreview from './CinemaPreview';

    export default {
        name: 'MainPage',
        components: {
            CinemaPreview: CinemaPreview
        }
    }
</script>


<style scoped>

</style>
