import httpClient from '@/api/httpClient';

const getOrderStatus = () => httpClient.get('/db/orderStatus');

export default {
  getOrderStatus,
};
