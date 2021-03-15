<script>
    import Municipality from "@/classes/Municipality";
    import DetailParty from "./DetailParty";

    export default {
        name: 'DetailParties',
        components: {DetailParty},
        props: {
            municipality: {
                type: Municipality,
                required: true
            }
        },
        computed: {
            parties() {
                return this.$store.state.parties.all;
            }
        },
        methods: {}
    }
</script>


<template>
    <div class="DetailParties">
        <DetailParty
            v-for="party in parties"
            :party="party"
            :municipality="municipality"/>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .DetailParties {

    }
</style>