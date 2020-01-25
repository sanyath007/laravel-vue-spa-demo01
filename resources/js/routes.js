import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from './components/Home';
import Login from './components/auth/Login';
import CustomersMain from './components/customers/Main';
import CustomerList from './components/customers/List';
import NewCutomer from './components/customers/New';
import CustomerView from './components/customers/View';

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
    },
    {
      path: '/customers',
      component: CustomersMain,
      meta: {
        requiresAuth: true
      },
       children: [
         {
           path: '/',
           component: CustomerList
         },
         {
           path: 'new',
           component: NewCutomer
         },
         {
           path: ':id',
           component: CustomerView
         }
       ]
    }
  ]
});
