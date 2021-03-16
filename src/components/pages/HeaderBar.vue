<script>
    export default {
        name: 'HeaderBar',
        components: {},
        props: {},
        computed: {
            currentParty() {
                return this.$store.state.parties.current;
            },
            title() {
                return this.currentParty ? ('Verkiezingen 2021. Kaart van ' + this.currentParty.title) : 'Verkiezingen 2021. Kaart van Nederland';
            }
        },
        methods: {}
    }
</script>


<template>
    <div class="HeaderBar">
        <img src="assets/img/vote.svg"/>
        {{title}}
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .HeaderBar {
        padding: 8px;
        display: flex;
        align-items: center;
        font-size: 24px;

        img {
            height: 100%;
            margin-right: 12px;
        }
    }
</style>