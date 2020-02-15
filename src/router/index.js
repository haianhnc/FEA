import Vue from 'vue';
import Router from 'vue-router';
import Register from '@/pages/Register';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/register',
      name: 'register',
      component: Register,
      exact: true,
    },
  ],
});
