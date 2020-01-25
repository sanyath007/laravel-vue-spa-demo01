import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    welcomeMessage: 'Welcome to my vue app'
  },
  getters: {
    welcome(state) {
      return state.welcomeMessage;
    }
  },
  mutations: {},
  actions: {}
});
