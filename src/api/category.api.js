import httpClient from '@/api/httpClient';

const getCategory = () => httpClient.get('/db/category');

export default {
  getCategory,
};
