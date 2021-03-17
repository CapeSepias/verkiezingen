<script>
    import Municipality from "@/classes/geo/Municipality";

    export default {
        name: 'SearchResult',
        components: {},
        props: {
            municipality: {
                type: Municipality,
                required: true
            }
        },
        computed: { },
        methods: {
            select() {
                this.$store.commit('municipalities/setCurrent', this.municipality);
                this.$store.commit('ui/updateProperty', {key: 'searchValue', value: ''});
            }
        }
    }
</script>


<template>
    <div
        @click="select()"
        class="SearchResult">
        {{municipality.title}}
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .SearchResult {
        border-bottom: 1px solid $grey-1;
        padding: 14px 10px;
        cursor: pointer;

        &:hover {
            background: red;
            color: #fff
        }
    }
</style>