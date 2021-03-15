<script>
    import Map from "./map/Map";
    import Detail from "./detail/Detail";

    export default {
        name: 'Main',
        components: {
            Detail,
            Map
        },
        props: {},
        computed: {
            currentMunicipality() {
                return this.$store.state.municipalities.current;
            }
        },
        methods: {}
    }
</script>


<template>
    <div class="Main">
        <Map/>
        <Detail
            v-if="currentMunicipality"
            :municipality="currentMunicipality"/>
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

        .Detail {
            width: 50%;
            height: 100%;
        }
    }
</style>