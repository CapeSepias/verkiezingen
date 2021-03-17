<script>
    import mapMixin from "./map-mixin";
    import canvasTools from '@/tools/canvas';
    import municipalities from "@/data/municipalities";
    import PrintButton from "./PrintButton";

    export default {
        name: 'Map',
        components: {PrintButton},
        mixins: [mapMixin],
        data() {
            let id = Math.round(Math.random() * 1000000);
            return {
                id
            }
        },
        props: {},
        computed: {
            municipalities() {
                return this.$store.state.municipalities.all;
            },
            activeParties() {
                return this.$store.state.parties.active;
            }
        },
        methods: {
            draw() {
                this.clear();
                let settings = {
                    key: 'map-' + this.$store.state.ui.canvasWidth,
                    width: this.$store.state.ui.canvasWidth,
                    height: this.$store.state.ui.canvasHeight,
                    shiftX: 0,
                    shiftY: 0,
                    zoom: this.$store.state.ui.zoom,
                };
                canvasTools.draw(this.ctx, this.municipalities, settings, this.activeParties);
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
            }
        }
    }
</script>


<template>
    <div class="Map">
        <canvas :id="'canvas-' + id"></canvas>
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