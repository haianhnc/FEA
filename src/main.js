// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import { faUserSecret } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import '@fortawesome/fontawesome-free/css/all.css';

import App from './App';
import router from './router';
import '../node_modules/bulma/css/bulma.css';
// eslint-disable-next-line import/first
import { library } from '@fortawesome/fontawesome-svg-core';

require('typeface-open-sans');

Vue.config.productionTip = false;
library.add(faUserSecret);
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
});
