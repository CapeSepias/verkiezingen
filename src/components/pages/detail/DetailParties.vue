<script>
    import _Region from "@/classes/geo/_Region";
    import DetailParty from "./DetailParty";

    export default {
        name: 'DetailParties',
        components: {DetailParty},
        props: {
            region: {
                type: _Region | null,
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
            :region="region"/>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .DetailParties {

    }
</style>