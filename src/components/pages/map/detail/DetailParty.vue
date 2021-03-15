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
                :style="{'background': party.color}"
                class="DetailParty__score"></div>
        </div>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .DetailParty {
        display: flex;
        margin-bottom: 6px;
        opacity: 0.5;
        transition: all 0.4s ease;
        cursor: pointer;

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

            .DetailParty__score {
                position: absolute;
                left: 0;
                top: 0;
                width: 50%;
                height: 100%;
            }

        }

        &.DetailParty--current {
            opacity: 1;
        }
    }
</style>