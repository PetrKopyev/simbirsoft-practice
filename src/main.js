import Vue from 'vue';
import 'normalize.css';
import { Select, Option, DatePicker } from 'element-ui';
import lang from 'element-ui/lib/locale/lang/ru-RU';
import locale from 'element-ui/lib/locale';
import '@/styles/_main.scss';
import YmapPlugin from 'vue-yandex-maps';
import App from './App.vue';
import router from './router';
import store from './store';

import 'element-ui/lib/theme-chalk/select.css';
import 'element-ui/lib/theme-chalk/select-dropdown.css';
import 'element-ui/lib/theme-chalk/option.css';
import 'element-ui/lib/theme-chalk/date-picker.css';
import 'element-ui/lib/theme-chalk/icon.css';
import 'element-ui/lib/theme-chalk/button.css';

const ymapsConfig = {
  apiKey: '77a5e6ea-6171-44e6-bdac-228f66072a3e',
  lang: 'ru_RU',
  coordorder: 'latlong',
  version: '2.1',
};
Vue.use(YmapPlugin, ymapsConfig);

Vue.config.productionTip = false;

locale.use(lang);
Vue.use(Select);
Vue.use(Option);
Vue.use(DatePicker);

new Vue({
  router,
  store,
  YmapPlugin,
  render: (h) => h(App),
}).$mount('#app');
