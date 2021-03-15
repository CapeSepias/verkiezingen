<script>
    import Municipality from "@/classes/Municipality";
    import DetailParties from "./DetailParties";

    export default {
        name: 'Detail',
        components: {DetailParties},
        props: {
            municipality: {
                type: Municipality,
                required: true
            }
        },
        computed: {},
        methods: {}
    }
</script>


<template>
    <div class="Detail">
        <div class="Detail__title">
            {{municipality.title}}
        </div>
        <DetailParties
            :municipality="municipality"/>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .Detail {
        border-left: 1px solid $grey-1;
        padding: 8px;
        background: #ddd;

        .Detail__title {
            font-weight: 700;
            font-size: 24px;
            margin-bottom: 12px;
        }


    }
</style>