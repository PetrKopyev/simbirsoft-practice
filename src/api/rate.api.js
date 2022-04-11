import httpClient from '@/api/httpClient';

const getRate = () => httpClient.get('/db/rate');

export default {
  getRate,
};
