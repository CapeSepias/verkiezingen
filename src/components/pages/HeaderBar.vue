<script>
    export default {
        name: 'HeaderBar',
        components: {},
        props: {},
        computed: {
            municipalities() {
                return this.$store.state.municipalities.all;
            },
            activeParties() {
                return this.$store.state.parties.active;
            },
            activePartiesString() {
                return this.activeParties.map(p => p.title).join(' + ');
            },
            year() {
                return 2017;
            },
            title() {
                return this.activeParties.length > 0 ? ('Verkiezingskaart ' + this.year + '. Kaart van ' + this.activePartiesString) : 'Verkiezingskaart ' + this.year;
            },
            percentage() {
                let votes, voters;
                votes = 0;
                voters = 0;
                for (let municipality of this.municipalities) {
                    if (municipality.results) {
                        let results = municipality.results[2017].votes;
                        for (let party of this.activeParties) {
                            let votesForParty = results.find(v => v.party_id === party.id);
                            if (votesForParty) {
                                votes += votesForParty.votes;
                            }
                        }
                        voters += municipality.results[2017].validVotes
                    }
                }
                return Math.round(100 * (votes / voters));
            }
        },
        methods: {}
    }
</script>


<template>
    <div class="HeaderBar">
        <img src="assets/img/vote.svg"/>
        {{title}} ({{percentage}}%)
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .HeaderBar {
        padding: 8px;
        display: flex;
        align-items: center;
        font-size: 24px;
        line-height: 1.2;
        overflow: hidden;

        img {
            height: 100%;
            margin-right: 12px;
        }

        @include mobile() {
            font-size: 20px;
            align-items: flex-start;
        }
    }
</style>