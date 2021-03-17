<script>
    import mapMixin from "./map-mixin";
    import canvasTools from '@/tools/canvas';
    import municipalities from "@/data/municipalities";
    import PrintButton from "./PrintButton";
    import RegionTypeicker from "./region-type/regionTypePicker";

    export default {
        name: 'Map',
        components: {
            RegionTypeicker,
            PrintButton},
        mixins: [mapMixin],
        data() {
            let id = Math.round(Math.random() * 1000000);
            return {
                id
            }
        },
        props: {},
        computed: {
            currentRegionType() {
                return this.$store.state.ui.currentRegionType;
            },
            municipalities() {
                return this.$store.state.municipalities.all;
            },
            activeParties() {
                return this.$store.state.parties.active;
            },
            regions() {
                return this.$store.getters['ui/regions'];
            }
        },
        methods: {
            updatePaths(settings) {
                for (let region of this.regions) {
                    for (let path of region.paths) {
                        if (!path.storedPaths[settings.key]) {
                            path.create(settings);
                        }
                    }
                }
            },
            draw() {
                this.clear();
                let settings, key;
                key = 'map-' + this.$store.state.ui.canvasWidth;
                settings = {
                    key: key,
                    width: this.$store.state.ui.canvasWidth,
                    height: this.$store.state.ui.canvasHeight,
                    shiftX: 0,
                    shiftY: 0,
                    zoom: this.$store.state.ui.zoom,
                };
                this.updatePaths(settings);
                canvasTools.draw(this.ctx, this.regions, settings, this.activeParties);
            }
        },
        mounted() {
            this.init();
        },
        watch: {
            activeParties: {
                handler: function() {
                    this.draw();
                },
                deep: true
            },
            currentRegionType: {
                handler: function() {
                    this.draw();
                },
                deep: false
            }
        }
    }
</script>


<template>
    <div class="Map">
        <canvas :id="'canvas-' + id"></canvas>
        <RegionTypeicker/>
        <PrintButton/>
        <div class="credits">
            <a href="https://twitter.com/innouveau" target="_blank">
                @innouveau
            </a>
        </div>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .Map {
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;

        .RegionTypeicker {
            position: absolute;
            left: 10px;
            top: 10px;
        }

        .credits {
            position: absolute;
            right: 10px;
            bottom: 10px;

            a {
                color: #000;
            }
        }

        .PrintButton {
            position: absolute;
            left: 10px;
            bottom: 10px;
        }
    }
</style>