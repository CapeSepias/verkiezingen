import _base from './_base-module';


const state = {
    colorMode: 'regular',
    canvasWidth: 0,
    canvasHeight: 0,
    zoom: 0
};

const getters = {
    ..._base.getters
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