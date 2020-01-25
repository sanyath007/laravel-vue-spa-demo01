require('./bootstrap');

import Vue from 'vue';
import axios from 'axios';

import router from './routes';
import store from './store';
import { initialize } from './helper/auth';

import App from './components/App';

initialize(store, router);

const app = new Vue({
    el: '#app',
    components: { App }, 
    router,
    store
});
