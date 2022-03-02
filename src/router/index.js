import Vue from 'vue';
import VueRouter from 'vue-router';
import StartPage from '@/components/StartPage.vue';
import Order from '@/components/order/Order.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'StartPage',
    component: StartPage,
  },
  {
    path: '/order/:stepName?',
    name: 'Order',
    component: Order,
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
