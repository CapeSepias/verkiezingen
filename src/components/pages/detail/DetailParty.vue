<script>
    import Municipality from "@/classes/Municipality";
    import Party from "@/classes/Party";


    export default {
        name: 'DetailParty',
        components: {},
        props: {
            municipality: {
                type: Municipality,
                required: true
            },
            party: {
                type: Party,
                required: true
            }
        },
        computed: {
            isCurrent() {
                return this.$store.state.parties.current === this.party;
            },
            result() {
                return this.municipality.results[2017].votes.find(v => v.party_id === this.party.id);
            },
            percentage() {
                return Math.round(100 * (this.result.votes / this.municipality.results[2017].validVotes));
            },
            width() {
                return this.percentage;
            }
        },
        methods: {
            selectParty() {
                this.$store.commit('parties/setCurrent', this.party);
            }
        }
    }
</script>


<template>
    <div
        @click="selectParty()"
        :class="{'DetailParty--current': isCurrent}"
        class="DetailParty">
        <div class="DetailParty__party">
            {{party.title}}
        </div>
        <div class="DetailParty__score-container">
            <div
                v-if="result"
                :style="{'background': party.color, width: width + '%'}"
                class="DetailParty__score"></div>
        </div>
        <div class="DetailParty__percentage">
            {{percentage}}%
        </div>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .DetailParty {
        display: flex;
        align-items: center;
        margin-bottom: 8px;
        opacity: 0.5;
        transition: all 0.4s ease;
        cursor: pointer;

        .DetailParty__party {
            width: 80px;
        }

        .DetailParty__score-container {
            width: 100px;
            position: relative;
            height: 12px;
            background: #fff;
            border-radius: 6px;
            overflow: hidden;
            margin-right: 12px;

            .DetailParty__score {
                position: absolute;
                left: 0;
                top: 0;
                height: 100%;
                background: red!important;
                transition: all 0.2s ease;
            }

        }

        &.DetailParty--current {
            opacity: 1;
        }
    }
</style>