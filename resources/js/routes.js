import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from './components/Home';
import Login from './components/auth/Login';
import Customers from './components/Customers';

Vue.use(VueRouter);

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Home,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      component: Login
    }
    {
      path: '/customers',
      component: CustomersMain,
      meta: {
        requiresAuth: true
      },
       children: [
         {
           path: '/',
           component: CustomersList
         },
         {
           path: 'new',
           component: NewCutomer
         },
         {
           path: ':id',
           component: Customers
         }
       ]
    }
  ]
});
