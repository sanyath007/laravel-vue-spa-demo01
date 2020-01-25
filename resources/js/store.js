import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

import { getLocalUser } from './helper/auth';

Vue.use(Vuex);

const user = getLocalUser();

export default new Vuex.Store({
  state: {
    currentUser: user,
    isLoggedIn: !!user,
    loading: false,
    auth_error: null,
    customers: []
  },
  getters: {
    isLoading(state) {
      return state.loading;
    },
    isLoggedIn(state) {
      return state.isLoggedIn;
    },
    currentUser(state) {
      return state.currentUser;
    },
    authError(state) {
      return state.auth_error;
    },
    customers(state) {
      return state.customers;
    }
  },
  mutations: {
    login(state) {
      state.loading = true;
      state.auth_error = null;
    },
    loginSuccess(state, payload) {
      state.auth_error = null;
      state.loading = false;
      state.isLoggedIn = true;
      state.currentUser = Object.assign({}, payload.user, { token: payload.access_token});

      localStorage.setItem('user', JSON.stringify(state.currentUser));
    },
    loginFailed(state, payload) {
      state.loading = false;
      state.auth_error = payload.err;
    },
    logout(state) {
      localStorage.removeItem('user');
      state.isLoggedIn = false;
      state.currentUser = null;
    },
    updateCustomer(state, payload) {
      state.customers = payload;
    }
  },
  actions: {
    login(context) {
      context.commit('login');
    },
    getCustomers(context) {
      axios.get('/api/customers', {
        headers: {
          "Authorization": `bearer ${context.state.currentUser.token}`
        }
      }).then(res => {
        context.commit('updateCustomer', res.data.customers);
      })
    }
  }
});
