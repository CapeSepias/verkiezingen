<script>
    import DetailParties from "./DetailParties";
    import _Region from "@/classes/geo/_Region";

    export default {
        name: 'Detail',
        components: {DetailParties},
        props: {
            region: {
                type: _Region | null,
                required: true
            }
        },
        computed: {
            parties() {
                return this.$store.state.parties.active;
            },
            partiesString() {
                return this.parties.map(p => p.title).join( ' + ');
            },
            percentageAttendance() {
                return Math.round(100 * (this.region.results[2017].attendance / this.region.results[2017].voters));
            },
            percentageOfParties() {
                let results, votes;
                results = this.region.results[2017].votes;
                votes = 0;
                for (let party of this.parties) {
                    let votesForParty = results.find(v => v.party_id === party.id);
                    if (votesForParty) {
                        votes += votesForParty.votes;
                    }
                }
                return Math.round(100 * votes / this.region.results[2017].validVotes);
            }
        },
        methods: {
            styleNumber(value) {
                if (value > 0) {
                    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                } else {
                    return value;
                }
            },
            close() {
                this.$store.commit('municipalities/setCurrent', null);
            },
            updateResults() {
                if (this.region && !this.region.results) {
                    this.region.createResults(2017);
                }
            }
        },
        watch: {
            region: {
                handler: function() {
                    this.updateResults();
                },
                deep: false
            }
        }
    }
</script>


<template>
    <div
        :class="{'Detail--active': region}"
        class="Detail">
        <div class="Detail__title">
            {{region ? region.title : ''}}
        </div>
        <DetailParties
            :region="region"/>

        <div
            v-if="region"
            class="Detail__body">
            <div class="Detail__section">
                <div class="Detail__row">
                    <div class="Detail__label">
                        Kiesgerechtigden
                    </div>
                    <div class="Detail__label">
                        {{styleNumber(region.results[2017].voters)}}
                    </div>
                </div>
                <div class="Detail__row">
                    <div class="Detail__label">
                        Opkomst
                    </div>
                    <div class="Detail__label">
                        {{styleNumber(region.results[2017].attendance)}} ({{percentageAttendance}}%)
                    </div>
                </div>
                <div class="Detail__row">
                    <div class="Detail__label">
                        Ongeldige stemmen
                    </div>
                    <div class="Detail__label">
                        {{styleNumber(region.results[2017].invalidVotes)}}
                    </div>
                </div>
                <div class="Detail__row">
                    <div class="Detail__label">
                        Blanco Stemmen
                    </div>
                    <div class="Detail__label">
                        {{styleNumber(region.results[2017].blankVotes)}}
                    </div>
                </div>
            </div>
            <div class="Detail__section">
                <div class="Detail__row">
                    <div class="Detail__label">
                        {{partiesString}}
                    </div>
                    <div class="Detail__label">
                        {{percentageOfParties}}%
                    </div>
                </div>
            </div>

        </div>

        <div
            @click="close()"
            class="close-button"></div>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .Detail {
        border-left: 1px solid $grey-1;
        padding: 8px;
        background: #ddd;

        .Detail__title {
            font-size: 24px;
            margin-bottom: 12px;
            height: 36px;
        }

        .Detail__body {
            margin-top: 16px;
            max-width: 300px;
            font-size: 13px;

            .Detail__section {
                margin-bottom: 24px;
            }

            .Detail__row {
                display: flex;
                //align-items: center;
                padding: 3px 0;

                .Detail__label {
                    width: 50%;
                }

                .Detail__label {
                    width: 50%;
                }
            }
        }

        .close-button {
            display: none;
        }

        @include mobile() {

            .close-button {
                display: block;
            }
        }
    }
</style>