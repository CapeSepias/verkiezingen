<script>
    import DetailParty from "../detail/DetailParty";

    export default {
        name: 'Parties',
        components: {
            DetailParty,
        },
        props: {},
        computed: {
            parties() {
                return this.$store.state.parties.all;
            }
        },
        methods: {}
    }
</script>


<template>
    <div class="Parties">
        <DetailParty
            v-for="party in parties"
            :party="party"
            :municipality="null"/>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .Parties {
        padding: 8px;
        flex-wrap: wrap;

        .DetailParty {

            .DetailParty__vote {
                width: 16px;
                height: 16px;
            }

            .DetailParty__party {
                width: auto;
                margin-right: 12px;
            }
        }
    }
</style>