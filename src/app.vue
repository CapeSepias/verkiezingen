<script>
    import parties from '@/data/parties';
    import municipalities from '@/data/municipalities';
    import safetyRegions from '@/data/safety-regions';
    import provinces from '@/data/provinces';
    import countries from '@/data/countries';
    import fusions from '@/data/fusions';
    import * as d3 from 'd3';

    export default {
        name: 'app',
        components: {},
        props: {},
        data() {
            return {
                ready: false
            }
        },
        computed: {
            municipalities() {
                return this.$store.state.municipalities.all;
            },
        },
        methods: {
            init() {
                let ms = municipalities.map(m => {
                    m.id = municipalities.indexOf(m) + 1;
                    return m
                });
                for (let fusion of fusions) {
                    let municipality = ms.find(m => m.title === fusion.current);
                    if (municipality) {
                        municipality.fusions = fusion.previous;
                    }
                }
                this.$store.commit('parties/init', parties);
                this.$store.commit('municipalities/init', ms);
                this.$store.commit('safetyRegions/init', safetyRegions);
                this.$store.commit('provinces/init', provinces);
                this.$store.commit('countries/init', countries);
            },
            addData(municipality, row) {
                let results = {
                    2017: {
                        votes: [],
                        voters: Number(row.Kiesgerechtigden),
                        attendance: Number(row.Opkomst),
                        invalidVotes: Number(row.OngeldigeStemmen),
                        validVotes: Number(row.GeldigeStemmen),
                        blankVotes: Number(row.BlancoStemmen)
                    }
                };
                for (let party of this.$store.state.parties.all) {
                    if (row[party.colname]) {
                        results[2017].votes.push({
                            party_id: party.id,
                            votes: Number(row[party.colname])
                        })
                    }
                }
                this.$store.commit('municipalities/updatePropertyOfItem', {item: municipality, property: 'results', value: results});
            },
            addMultipleData(municipality, rows) {
                let results = {
                    2017: {
                        votes: [],
                        voters: 0,
                        attendance: 0,
                        invalidVotes: 0,
                        validVotes: 0,
                        blankVotes: 0
                    }
                };
                for (let row of rows) {
                    results[2017].voters +=  Number(row.Kiesgerechtigden);
                    results[2017].attendance +=  Number(row.Opkomst);
                    results[2017].invalidVotes +=  Number(row.OngeldigeStemmen);
                    results[2017].validVotes +=  Number(row.GeldigeStemmen);
                    results[2017].blankVotes +=  Number(row.BlancoStemmen);
                }


                for (let party of this.$store.state.parties.all) {
                    for (let row of rows) {
                        if (row[party.colname]) {
                            let item = results[2017].votes.find(i => i.party_id === party.id);
                            if (!item) {
                                results[2017].votes.push({
                                    party_id: party.id,
                                    votes: Number(row[party.colname])
                                })
                            } else {
                                item.votes += Number(row[party.colname]);
                            }
                        }
                    }
                }
                this.$store.commit('municipalities/updatePropertyOfItem', {item: municipality, property: 'results', value: results});
            },
            load() {
                const url = "data/2017.csv";

                d3.csv(url)
                    .then((data) => {
                        for (let municipality of this.municipalities) {
                            let item, items, results;
                            if (municipality.fusions.length === 0) {
                                item = data.find(row => {
                                    let code = 'GM' + row.RegioCode.substring(1);
                                    return municipality.identifier === code;
                                });
                                if (item) {
                                    this.addData(municipality, item);
                                }
                            } else {
                                items = data.filter(row => municipality.fusions.indexOf(row.RegioNaam) > -1);
                                this.addMultipleData(municipality, items);
                            }
                        }

                        this.readQuery();
                        this.ready = true;
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            },
            readQuery() {
                if (this.$route.query.p) {
                    let partieStrings = this.$route.query.p.split(',');
                    this.$store.commit('parties/empty');
                    for (let partieString of partieStrings) {
                        let party = this.$store.getters['parties/getItemByProperty']('title', partieString, true);
                        this.$store.commit('parties/toggle', party);
                    }
                } else {
                    this.$store.commit('parties/toggle', this.$store.parties.all[0]);
                }
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

    $font: 'spacemono';

    @font-face {
        font-family: $font;
        src: url('fonts/space-mono/SpaceMono-Regular.ttf');
    }

    body {
        font-family: $font;
        font-size: 11px;
        line-height: 1.4;
    }
</style>