import httpClient from '@/api/httpClient';

const getOrder = (orderId) => httpClient.get(`/db/order/${orderId}`);

const setOrder = (orderData) => httpClient.post('/db/order', { ...orderData });

const deleteOrder = (orderId) => httpClient.delete(`/db/order/${orderId}`);

export default {
  getOrder,
  setOrder,
  deleteOrder,
};
