import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    steps: {
      0: {
        code: 'location',
        translate: 'Местоположение',
        filled: false,
      },
      1: {
        code: 'model',
        translate: 'Модель',
        filled: false,
      },
    },
    order: {
      city: null,
      point: null,
      car: null,
    },
  },
  mutations: {
    SET_ORDER(state, payload) {
      this.state.order = payload;
    },
    SET_STEP_FILLED_STATUS(state, payload) {
      this.state.steps = payload;
    },
  },
  actions: {
    setOrder({ commit, state }, { key, value }) {
      const { order } = state;

      order[key] = value;

      commit('SET_ORDER', order);
    },
    setStepFilledStatus({ commit, state }, { stepName, value }) {
      const { steps } = state;
      const foundStep = Object.values(steps).find((step) => step.code === stepName);

      foundStep.filled = value;

      commit('SET_STEP_FILLED_STATUS', steps);
    },
  },
});
