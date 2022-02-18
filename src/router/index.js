import Vue from 'vue';
import VueRouter from 'vue-router';
import StartPage from '@/components/StartPage.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'StartPage',
    component: StartPage,
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
