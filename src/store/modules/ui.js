import _base from './_base-module';


const state = {
    // number of days
    resolution: 7,
    timelineContainerIsMeasured: false,
    timelineContainer: 0,
    isDragging: false
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