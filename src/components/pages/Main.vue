<script>
    import Map from "./map/Map";
    import Detail from "./detail/Detail";

    export default {
        name: 'Main',
        components: {
            Detail,
            Map
        },
        props: {},
        computed: {
            currentMunicipality() {
                return this.$store.state.municipalities.current;
            },
            currentParty() {
                return this.$store.state.parties.current;
            },
            title() {
                return this.currentParty ? ('Het Nederland van ' + this.currentParty.title) : 'Verkiezingen 2021';
            }
        },
        methods: {}
    }
</script>


<template>
    <div class="Main">
        <div class="Main__top">
            {{title}}
        </div>
        <div class="Main__bottom">
            <Map/>
            <Detail
                    v-if="currentMunicipality"
                    :municipality="currentMunicipality"/>
        </div>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .Main {
        height: 100%;

        .Main__top {
            height: 40px;
            padding: 8px;
            display: flex;
            align-items: center;
            font-weight: 700;
            font-size: 20px;
        }

        .Main__bottom {
            display: flex;
            height: calc(100% - 40px);

            .Map {
                width: 50%;
                height: 100%;
            }

            .Detail {
                width: 50%;
                height: 100%;
            }
        }
    }
</style>