import httpClient from '@/api/httpClient';

const getRateType = () => httpClient.get('/db/rateType');

export default {
  getRateType,
};
