<script>
    import canvasTools from '@/tools/canvas';

    export default {
        name: 'download-image-mixin',
        components: {},
        props: {},
        computed: {
            municipalities() {
                return this.$store.state.municipalities.all;
            },
            imageScale() {
                return 1;
            },
            width() {
                return 2480 * this.imageScale;
            },
            height() {
                return 3508 * this.imageScale;
            },
            body() {
                return document.getElementsByTagName("body")[0];
            },
            downloadLink() {
                return document.createElement('a');
            },
            canvas() {
                return document.createElement('canvas');
            },
            ctx() {
                return this.canvas.getContext("2d");
            }
        },
        methods: {
            prepair(width = this.width, height = this.height) {
                this.canvas.id = 'image-for-download';
                this.canvas.width = width;
                this.canvas.height = height;
                canvasTools.addBackground(this.ctx, width, height);
            },
            addHead() {
                let width, height;
                width = 240 * this.imageScale;
                height = 240 * this.imageScale;
                return new Promise((resolve, reject) => {
                    let img = new Image();
                    img.src = 'assets/img/vote.png';
                    img.onload = () => {
                        this.ctx.drawImage(img, (150 * this.imageScale), (150 * this.imageScale), width, height);
                        resolve();
                    }
                });
            },
            addCustomText(text, x, y) {
                let ctx = this.ctx;
                ctx.font = 'bold ' + (140 * this.imageScale) + 'px spacemono';
                ctx.fillStyle = 'black';
                ctx.textAlign = 'left';
                ctx.fillText(text, x, y);
            },
            addCreator() {
                let ctx = this.ctx;
                ctx.font = (40 * this.imageScale) + 'px spacemono';
                ctx.fillStyle = '#000';
                ctx.fillText('Created by: @innouveau', (150 * this.imageScale),  (3330 * this.imageScale));
            },
            finish(name) {
                return new Promise((resolve, reject) => {
                    let fileName = 'verkiezingsposter-' + this.year + '.png';
                    this.downloadLink.setAttribute('download', fileName);
                    this.canvas.toBlob((blob) => {
                        let url = URL.createObjectURL(blob);
                        this.downloadLink.setAttribute('href', url);
                        this.downloadLink.click();
                        resolve();
                    });
                })
            }
        }
    }
</script>


<template></template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .download-image-mixin {

    }
</style>