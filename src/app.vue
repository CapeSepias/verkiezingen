<script>
    import parties from '@/data/parties';

    export default {
        name: 'app',
        components: {},
        props: {},
        computed: {},
        data() {
            return {
                ready: false
            }
        },
        methods: {
            init() {
                this.$store.commit('parties/init', parties);
                this.ready = true;
            }
        },
        mounted() {
            this.init();
        }
    }
</script>


<template>
    <div class="app">
        <router-view v-if="ready"/>
    </div>
</template>


<style lang="scss">
    @import '@/styles/index.scss';
    @import '@/styles/variables.scss';

    .app {


        @include mobile() {


        }
    }
</style>