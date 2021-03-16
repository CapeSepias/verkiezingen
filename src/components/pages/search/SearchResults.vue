<script>
    import SearchResult from "./SearchResult";

    export default {
        name: 'SearchResults',
        components: {
            SearchResult
        },
        props: {},
        computed: {
            searchValue() {
                return this.$store.state.ui.searchValue;
            },
            results() {
                return this.$store.state.municipalities.all
                    .filter(municipality => this.searchValue.length > 0 && municipality.title.toLowerCase().indexOf(this.searchValue.toLowerCase()) > -1)
                    .sort((a,b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0));
            }
        },
        methods: {}
    }
</script>


<template>
    <div class="SearchResults">
        <div
            v-if="results.length > 0"
            class="SearchResults__results">
            <SearchResult
                v-for="municipality in results"
                :municipality="municipality"/>
        </div>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .SearchResults {
        position: relative;

        .SearchResults__results {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            max-height: 200px;
            overflow: auto;
            background: #fff;
            box-shadow: 2px 2px 5px rgba(0,0,0,0.2);
            z-index: 5;
        }
    }
</style>