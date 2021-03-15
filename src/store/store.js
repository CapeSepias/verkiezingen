import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);


import ui from './modules/ui';
import parties from './modules/parties';
import municipalities from './modules/municipalities';


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
        ui, parties, municipalities
    }

});

window.store = store;

export default store
