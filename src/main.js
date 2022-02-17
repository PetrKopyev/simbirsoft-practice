import Vue from 'vue';
import 'normalize.css';
import App from './App.vue';
import '@/styles/_main.scss';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
