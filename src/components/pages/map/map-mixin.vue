<script>
    import $ from 'jquery';
    import map from "@/data/map";

    export default {
        name: 'map-mixin',
        components: {},
        props: {},

        computed: {
            width() {
                return this.$store.state.ui.canvasWidth;
            },
            height() {
                return this.$store.state.ui.canvasHeight;
            },
            regions() {
                return this.$store.state[this.currentMap.module].all;
            },
            canvas() {
                return document.getElementById('canvas-' + this.id);
            },
            ctx() {
                return this.canvas.getContext('2d');
            },
            colorMode() {
                return this.$store.state.ui.colorMode;
            }
        },
        methods: {
            init() {
                this.measure();
                setTimeout(() => {
                    this.canvas.width = this.width;
                    this.canvas.height = this.height;
                    this.draw();
                    //this.addEvents();
                });
                //
                // $(window).resize(() => {
                //     this.resize();
                // });
            },
            resize() {
                this.measure();
                setTimeout(() => {
                    this.clearCache();
                    this.canvas.width = this.width;
                    this.canvas.height = this.height;
                    this.draw();
                });
            },
            clearCache() {
                for (let region of this.$store.state[this.currentMap.module].all) {
                    for (let path of region.paths) {
                        path.storedPaths = {};
                    }
                }
            },
            measure() {
                let elementWidth, elementHeight, canvasWidth, canvasHeight, mapRatio, elementRatio, windowWidth;
                elementWidth = this.$el.clientWidth;
                elementHeight = this.$el.clientHeight;
                elementRatio = elementWidth / elementHeight;
                mapRatio = map.ratio;

                if (mapRatio > elementRatio) {
                    canvasWidth = elementWidth;
                    canvasHeight = canvasWidth / mapRatio;
                } else {
                    canvasHeight = elementHeight;
                    canvasWidth = canvasHeight * mapRatio;
                }


                this.$store.commit('ui/updateProperty', {key: 'canvasWidth', value: Math.round(canvasWidth)});
                this.$store.commit('ui/updateProperty', {key: 'canvasHeight', value: Math.round(canvasHeight)});
                this.$store.commit('ui/updateProperty', {key: 'zoom', value: (canvasHeight * map.zoom)});

            },
            addEvents() {
                this.addClickEvent();
                this.addHoverEvent();
            },
            addClickEvent() {
                this.canvas.addEventListener('click', (event) => {
                    let x, y, region;
                    x = event.offsetX;
                    y = event.offsetY;
                    region = this.getRegionForPoint(x, y);
                    if (region) {
                        this.view.currentRegion = region;
                        this.$store.commit('ui/updateProperty', {key: 'menu', value: 'city'});
                        this.$store.commit('ui/updateProperty', {key: 'searchValue', value: ''});
                        this.$store.commit('ui/updateProperty', {key: 'hoverValue', value: ''});
                    } else {
                        this.view.currentRegion = region;
                    }
                }, false);
            },
            addHoverEvent() {
                this.canvas.addEventListener('mousemove', (event) => {
                    let x, y, region;
                    x = event.offsetX;
                    y = event.offsetY;
                    region = this.getRegionForPoint(x, y);
                    if (region) {
                        this.$store.commit('ui/updateProperty', {key: 'hoverValue', value: region.title});
                    } else {
                        this.$store.commit('ui/updateProperty', {key: 'hoverValue', value: ''});
                    }
                }, false);
            },
            getRegionForPoint(x, y) {
                let reversed = this.regions.slice().reverse();
                for (let region of reversed) {
                    for (let path of region.paths) {
                        if (this.ctx.isPointInPath(path.storedPaths['map-' + this.$store.state.ui.canvasWidth], x, y)) {
                            return region;
                        }
                    }
                }
                return null;
            },
            clear() {
                this.ctx.clearRect(0, 0, this.width, this.height);
            },
            openMapTools() {
                this.$store.commit('ui/updateProperty', {key: 'mapToolsPopup', value: true});
            }
        },
        watch: {
            // view: {
            //     handler: function() {
            //         this.draw();
            //     },
            //     deep: true
            // }
        }
    }
</script>


<template></template>
<style lang="scss"></style>