<script>
    import Map from "./map/Map";

    export default {
        name: 'Main',
        components: {Map},
        props: {},
        computed: {},
        methods: {}
    }
</script>


<template>
    <div class="Main">
        <Map/>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .Main {
        display: flex;
        height: 100%;

        .Map {
            width: 50%;
            height: 100%;
        }
    }
</style>