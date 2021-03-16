<script>
    import Map from "./map/Map";
    import Detail from "./detail/Detail";
    import HeaderBar from "./HeaderBar";
    import Search from "./search/Search";
    import Parties from "./parties/Parties";

    export default {
        name: 'Main',
        components: {
            Parties,
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
            <Parties/>
            <Detail
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
            position: relative;

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

            .Parties {
                display: none;
            }

            .Detail {
                width: 50%;
                height: 100%;
            }
        }

        @include mobile() {

            .HeaderBar {
                height: 120px;
            }

            .Main__bottom {
                height: calc(100% - 120px);
                display: block;

                .map-container {
                    width: 100%;
                    height: calc(100% - 80px);
                }

                .Parties {
                    display: flex;
                    height: 80px;
                }

                .Detail {
                    position: absolute;
                    left: 100%;
                    top: 48px;
                    width: 100%;
                    height: calc(100% - 48px);
                    transition: all 0.3s ease;
                    overflow: auto;

                    &.Detail--active {
                        left: 0;
                    }
                }
            }
        }
    }
</style>