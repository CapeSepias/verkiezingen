<script>
    import parties from '@/data/parties';
    import municipalities from '@/data/municipalities';
    import * as d3 from 'd3';

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
            },
            load() {
                const url = "data/2017.csv";

                d3.csv(url)
                    .then((data) => {
                        for (let item of data) {
                            let code, municipality, results;
                            code = 'GM' + item.RegioCode.substring(1);
                            municipality = this.$store.getters['municipalities/getItemByProperty']('identifier', code, true);
                            if (municipality) {
                                results = {
                                    2017: {
                                        votes: [],
                                        voters: Number(item.Kiesgerechtigden),
                                        attendance: Number(item.Opkomst),
                                        invalidVotes: Number(item.OngeldigeStemmen),
                                        validVotes: Number(item.GeldigeStemmen),
                                        blankVotes: Number(item.BlancoStemmen)
                                    }
                                };
                                for (let party of this.$store.state.parties.all) {
                                    if (item[party.colname]) {
                                        results[2017].votes.push({
                                            party_id: party.id,
                                            votes: Number(item[party.colname])
                                        })
                                    }
                                }
                                this.$store.commit('municipalities/updatePropertyOfItem', {item: municipality, property: 'results', value: results});
                            }
                        }

                    })
                    .catch((error) => {
                        console.error(error);
                    });
            }
        },
        mounted() {
            this.init();
            this.load();
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