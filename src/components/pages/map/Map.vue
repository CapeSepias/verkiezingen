<script>
    import mapMixin from "./map-mixin";
    import canvasTools from '@/tools/canvas';
    import municipalities from "@/data/municipalities";

    export default {
        name: 'Map',
        components: {},
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
                    fill: true
                };
                canvasTools.draw(this.ctx, this.municipalities, settings);
            }
        },
        mounted() {
            this.init();
        }
    }
</script>


<template>
    <div class="Map">
        <canvas :id="'canvas-' + id"></canvas>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .Map {
    }
</style>