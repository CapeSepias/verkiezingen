<script>
    import Map from "./map/Map";
    import Detail from "./detail/Detail";
    import HeaderBar from "./HeaderBar";
    import Search from "./search/Search";

    export default {
        name: 'Main',
        components: {
            Search,
            HeaderBar,
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
        <HeaderBar/>
        <div class="Main__bottom">
            <div class="map-container">
                <Search/>
                <Map/>
            </div>
            <Detail
                    v-if="currentMunicipality"
                    :municipality="currentMunicipality"/>
        </div>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .Main {
        height: 100%;

        .HeaderBar {
            height: 60px;
        }

        .Main__bottom {
            display: flex;
            height: calc(100% - 60px);

            .map-container {
                width: 50%;
                height: 100%;
                background: #F7E9D0;

                .Search {
                    height: 48px;
                    padding: 8px;
                }

                .Map {
                    height: calc(100% - 48px);
                }
            }

            .Detail {
                width: 50%;
                height: 100%;
            }
        }
    }
</style>