<script>
    import Municipality from "@/classes/Municipality";

    export default {
        name: 'Detail',
        components: {},
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
        <div class="Detail">
            {{municipality.title}}
        </div>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .Detail {
        background: pink;
    }
</style>