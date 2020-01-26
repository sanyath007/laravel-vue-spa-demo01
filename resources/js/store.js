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
    customers: [],
    pagination: {},
    responseErrors: null
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
    },
    pagination(state) {
      return state.pagination;
    },
    responseErrors(state) {
      return state.responseErrors;
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
    customerRequest(state) {
      state.loading = true;
    },
    customerSuccess(state, payload) {
      state.loading = false;
      state.customers = payload;
      state.responseErrors = null
    },
    customerFailed(state, payload) {
      state.loading = false;
      state.customer = null;
      state.responseErrors = payload
    },
    setPagination(state, payload) {
      state.pagination = payload;
    }
  },
  actions: {
    login(context) {
      context.commit('login');
    },
    getCustomers(context, url) {
      context.commit('customerRequest');

      let endpoint = url || '/api/customers'

      axios.get(endpoint)
        .then(res => {
          context.commit('customerSuccess', res.data.customers.data);

          context.commit('setPagination', {
            path: res.data.customers.path,
            total: res.data.customers.total,
            per_page: res.data.customers.per_page,
            current_page: res.data.customers.current_page,
            last_page: res.data.customers.last_page,
            next_page_url: res.data.customers.next_page_url,
            prev_page_url: res.data.customers.prev_page_url,
            last_page_url: res.data.customers.last_page_url,
          });
        })
        .catch(err => {
          let errors = { code: err.response.status, message: err.response.statusText };

          context.commit('customerFailed', errors)
        })
    }
  }
});
