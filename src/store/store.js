import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);


import ui from './modules/ui';
import parties from './modules/parties';
import municipalities from './modules/municipalities';
import safetyRegions from './modules/safety-regions';
import provinces from './modules/provinces';
import countries from './modules/countries';


const state = {
};
const mutations = {
    updateProperty(state, payload) {
        state[payload.key] = payload.value;
    }
};

const store = new Vuex.Store({
    state,
    mutations,
    actions: {},
    modules: {
        ui, parties,
        municipalities, safetyRegions, provinces, countries
    }

});

window.store = store;

export default store
