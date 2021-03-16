<script>
    import Municipality from "@/classes/Municipality";
    import Party from "@/classes/Party";

    export default {
        name: 'DetailParty',
        components: {},
        props: {
            municipality: {
                type: Municipality | null,
                required: true
            },
            party: {
                type: Party,
                required: true
            }
        },
        computed: {
            activeParties() {
                return this.$store.state.parties.active;
            },
            isActive() {
                return this.activeParties.indexOf(this.party) > -1;
            },
            result() {
                return this.municipality ? this.municipality.results[2017].votes.find(v => v.party_id === this.party.id) : null;
            },
            percentage() {
                return Math.round(100 * (this.result.votes / this.municipality.results[2017].validVotes));
            },
            width() {
                return this.percentage;
            },
            routePath() {
                return window.location.href.split('?')[0];
            },
            url() {
                return this.routePath + this.query;
            },
            query() {
                if (this.activeParties.length > 0) {
                    return '?p=' + this.activeParties.map(p => p.title.toLowerCase()).join(',')
                } else {
                    return '';
                }
            }
        },
        methods: {
            selectParty() {
                this.$store.commit('parties/toggle', this.party);
            },
            updateQuery() {
                history.pushState(
                    {},
                    null,
                    this.url
                );
            }
        },
        watch: {
            query: function () {
                this.updateQuery();
            }
        }
    }
</script>


<template>
    <div
        @click="selectParty()"
        :class="{'DetailParty--active': isActive}"
        class="DetailParty">
        <div class="DetailParty__vote"><div class="DetailParty__vote-inner"></div></div>
        <div class="DetailParty__party">
            {{party.title}}
        </div>
        <div
            v-if="municipality"
            class="DetailParty__score-container">
            <div
                v-if="result"
                :style="{width: width + '%'}"
                class="DetailParty__score"></div>
        </div>
        <div
            v-if="municipality"
            class="DetailParty__percentage">
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
        transition: all 0.4s ease;
        cursor: pointer;

        .DetailParty__vote {
            width: 18px;
            height: 18px;
            background: #000;
            position: relative;
            margin-right: 6px;
            z-index: 0;

            .DetailParty__vote-inner {
                position: absolute;
                width: calc(100% - 4px);
                height: calc(100% - 4px);
                border-radius: 50%;
                background: #fff;
                z-index: 1;
                top: 2px;
                left: 2px;

                &:after {
                    content: '';
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    transform: translate(-50%, -50%);
                    width: 6px;
                    height: 6px;
                    border-radius: 50%;
                    background: transparent;
                }
            }
        }

        .DetailParty__party {
            width: 100px;
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
                background: #000;
                transition: all 0.2s ease;
            }

        }

        &.DetailParty--active {

            .DetailParty__vote {

                .DetailParty__vote-inner {
                    background: red;
                }
            }

            .DetailParty__score-container {

                .DetailParty__score {
                    background: red;
                }
            }
        }

        &:hover {

            .DetailParty__vote {

                .DetailParty__vote-inner {

                    &:after {
                        background: red;
                    }
                }
            }
        }
    }
</style>