<script>
    export default {
        name: 'RegionType',
        components: {},
        props: {
            type: {
                type: Object,
                required: true
            }
        },
        computed: {
            isActive() {
                return this.$store.state.ui.currentRegionType === this.type.tag;
            }
        },
        methods: {
            select() {
                this.$store.commit('ui/updateProperty', {key: 'currentRegionType', value: this.type.tag});
            }
        }
    }
</script>


<template>
    <div
        @click="select()"
        :class="{
            'RegionType--current': isActive
        }"
        class="RegionType">
        {{type.label}}
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .RegionType {
        cursor: pointer;
        margin-right: 12px;
        font-size: 11px;
        border-bottom: 1px solid transparent;

        &.RegionType--current {
            border-bottom: 1px solid #000;
        }
    }
</style>