import _base from './_base-module';


const state = {
    colorMode: 'regular',
    canvasWidth: 0,
    canvasHeight: 0,
    zoom: 0,
    searchValue: '',
    hoverValue: '',
    currentRegionType: 'municipality'
};

const getters = {
    ..._base.getters,
    getRegionOfFocus:(state, getters, rootState, rootGetters) => (region) => {
        if (region) {
            switch(state.currentRegionType) {
                case 'municipality':
                    return region;
                case 'safety-region':
                    return rootGetters['safetyRegions/getItemByProperty']('safetyRegion_code', region.safetyRegion_code, true);
                case 'province':
                    return rootGetters['provinces/getItemByProperty']('province_code', region.province_code, true);
                case 'country':
                    return rootGetters['countries/getItemById'](region.country_id);
            }
        } else {
            return null;
        }
    },
    regions(state, getters, rootState, rootGetters) {
        switch(state.currentRegionType) {
            case 'municipality':
                return rootState.municipalities.all;
            case 'safety-region':
                return rootState.safetyRegions.all;
            case 'province':
                return rootState.provinces.all;
            case 'country':
                return rootState.countries.all;
        }
    },
};

const actions = {};

const mutations = {
    updateProperty(state, payload) {
        state[payload.key] = payload.value;
    },
    reset(state) {
        state.dataLoaded = false
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}