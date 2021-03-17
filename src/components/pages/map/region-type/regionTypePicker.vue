<script>
    import RegionType from "./RegionType";

    export default {
        name: 'RegionTypeicker',
        components: {
            RegionType
        },
        props: { },
        computed: {
            types() {
                return [
                    {
                        label: 'Gemeente',
                        showRegion: false,
                        tag: 'municipality'
                    },
                    {
                        label: 'Veiligheidsregio',
                        showRegion: false,
                        tag: 'safety-region'
                    },
                    {
                        label: 'Provincie',
                        showRegion: false,
                        tag: 'province'
                    }
                ]
            }
        },
        methods: {}
    }
</script>


<template>
    <div class="RegionTypeicker">
        <RegionType
            v-for="type in types"
            :type="type"/>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .RegionTypeicker {
        display: flex;
        flex-wrap: wrap;
    }
</style>