require('./bootstrap');

import Vue from 'vue';

import router from './routes';
import store from './store';

import App from './components/App';

router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(rec => rec.meta.requiresAuth);
    const currentUser = store.state.currentUser;

    if(requiresAuth && !currentUser) {
        next('/login');
    } else if(to.path == '/login' && currentUser) {
        next('/');
    } else {
        next();
    }
});

const app = new Vue({
    el: '#app',
    components: { App }, 
    router,
    store
});
