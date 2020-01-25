require('./bootstrap');

import Vue from 'vue';

import router from './routes';
import store from './store';

import App from './components/App';

const app = new Vue({
    el: '#app',
    components: { App }, 
    router,
    store
});
