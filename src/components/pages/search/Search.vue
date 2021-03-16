<script>
    import SearchResults from "./SearchResults";

    export default {
        name: 'Search',
        components: {
            SearchResults
        },
        props: {},
        computed: {
            searchValue() {
                return this.$store.state.ui.searchValue;
            },
            hoverValue() {
                return this.$store.state.ui.hoverValue;
            }
        },
        methods: {
            updateSearchValue(ev) {
                this.$store.commit('ui/updateProperty', {key: 'searchValue', value: ev.target.value});
            }
        }
    }
</script>


<template>
    <div class="Search">
        <input
            :value="searchValue"
            @keyup="updateSearchValue"
            placeholder="Zoek of klik op de kaart...">
        <div
            v-if="hoverValue.length > 0"
            class="hover-value">{{hoverValue}}</div>
        <SearchResults/>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .Search {
        position: relative;

        input {
            width: 100%;
            background: #fff;
            box-shadow: 1px 1px 3px rgba(0,0,0,0.1);
        }

        .hover-value {
            position: absolute;
            left: 8px;
            top: 8px;
            width: calc(100% - 16px);
            height: calc(100% - 16px);
            padding: 10px;
            display: flex;
            align-items: center;
            z-index: 1;
            background: #fff;
        }
    }
</style>