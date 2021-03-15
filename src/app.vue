<script>
    import parties from '@/data/parties';
    import municipalities from '@/data/municipalities';

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
                let ms = municipalities.map(m => {
                    m.id = municipalities.indexOf(m) + 1;
                    return m
                });
                this.$store.commit('parties/init', parties);
                this.$store.commit('municipalities/init', ms);
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