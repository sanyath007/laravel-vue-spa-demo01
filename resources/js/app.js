require('./bootstrap');
import Vue from 'vue';
import Vuex from 'vuex';

import router from './routes';

import App from './components/App';

Vue.use(Vuex);

const app = new Vue({
    el: '#app',
    components: { App }, 
    router
});
