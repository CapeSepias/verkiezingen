<script>
    import Municipality from "@/classes/Municipality";
    import DetailParties from "./DetailParties";

    export default {
        name: 'Detail',
        components: {DetailParties},
        props: {
            municipality: {
                type: Municipality | null,
                required: true
            }
        },
        computed: {
            percentageAttendance() {
                return Math.round(100 * (this.municipality.results[2017].attendance / this.municipality.results[2017].voters));
            }
        },
        methods: {
            styleNumber(value) {
                if (value > 0) {
                    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                } else {
                    return value;
                }
            }
        }
    }
</script>


<template>
    <div class="Detail">
        <div class="Detail__title">
            {{municipality ? municipality.title : ''}}
        </div>
        <DetailParties
            :municipality="municipality"/>

        <div
            v-if="municipality"
            class="Detail__body">
            <div class="Detail__row">
                <div class="Detail__label">
                    Kiesgerechtigden
                </div>
                <div class="Detail__label">
                    {{styleNumber(municipality.results[2017].voters)}}
                </div>
            </div>
            <div class="Detail__row">
                <div class="Detail__label">
                    Opkomst
                </div>
                <div class="Detail__label">
                    {{styleNumber(municipality.results[2017].attendance)}} ({{percentageAttendance}}%)
                </div>
            </div>
            <div class="Detail__row">
                <div class="Detail__label">
                    Ongeldige stemmen
                </div>
                <div class="Detail__label">
                    {{styleNumber(municipality.results[2017].invalidVotes)}}
                </div>
            </div>
            <div class="Detail__row">
                <div class="Detail__label">
                    Blanco Stemmen
                </div>
                <div class="Detail__label">
                    {{styleNumber(municipality.results[2017].blankVotes)}}
                </div>
            </div>
        </div>
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

            .Detail__row {
                display: flex;
                align-items: center;
                padding: 3px 0;

                .Detail__label {
                    width: 50%;
                }

                .Detail__label {
                    width: 50%;
                }
            }
        }
    }
</style>