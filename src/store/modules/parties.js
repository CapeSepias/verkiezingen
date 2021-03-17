import _base from './_base-module';
import Party from '@/classes/Party';

const Model = Party;

const state = {
    all: [],
    active: []
};

const getters = {
    ..._base.getters
};

const actions = {
    create(context, item){
        return _base.actions.create(context, item);
    },
    update(context, item){
        return _base.actions.update(context, item);
    },
    delete(context, item){
        return _base.actions.delete(context, item);
    }
};

const mutations = {
    init(state, set) {
        return _base.mutations.init(state, set, Model);
    },
    toggle(state, item) {
        let index = state.active.indexOf(item);
        if (index === -1) {
            state.active.push(item);
        } else {
            state.active.splice(index, 1);
        }
    },
    empty(state) {
        state.active = [];
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}