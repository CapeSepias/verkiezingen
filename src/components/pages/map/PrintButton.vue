<script>
    import downloadImageMixin from './download-image-mixin';
    import canvasTools from '@/tools/canvas';

    export default {
        name: 'PrintButton',
        components: {},
        props: {},
        mixins: [downloadImageMixin],
        computed: {
            activeParties() {
                return this.$store.state.parties.active;
            },
            activePartiesString() {
                return this.activeParties.map(p => p.title).join(' + ');
            },
            year() {
                return 2017;
            },
            string1() {
                return 'Verkiezingskaart ' + this.year;
            },
            string2() {
                return this.activePartiesString;
            },
            regions() {
                return this.$store.getters['ui/regions'];
            }
        },
        methods: {
            updatePaths(settings) {
                for (let region of this.regions) {
                    for (let subregion of region.regions) {
                        for (let path of subregion.paths) {
                            if (!path.storedPaths[settings.key]) {
                                path.create(settings);
                            }
                        }
                    }
                }
            },
            print() {
                let factor, settings;
                factor = 4.5;
                settings = {
                    key: 'map-poster',
                    width: 597*factor,
                    height: 656*factor,
                    shiftX: -100,
                    shiftY: 500,
                    zoom: 200*factor,
                    border: 3
                };
                this.updatePaths(settings);

                this.prepair();
                this.addHead().then(() => {

                    this.addCreator();
                    this.addCustomText(this.string1, 480, 280);
                    this.addCustomText(this.string2, 480, 440);
                    canvasTools.draw(this.ctx, this.regions, settings, this.activeParties);
                    this.finish();
                });
            }
        }
    }
</script>


<template>
    <div
        @click="print()"
        class="PrintButton">
        <img src="assets/img/print.svg">
        <div class="PrintButton__label">
            Print poster
        </div>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .PrintButton {
        display: flex;
        align-items: center;
        cursor: pointer;
        z-index: 10;

        img {
            width: 24px;
            margin-right: 6px;
        }
    }
</style>