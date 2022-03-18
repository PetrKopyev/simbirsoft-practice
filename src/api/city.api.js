import httpClient from '@/api/httpClient';

const getCities = () => httpClient.get('/db/city');

const getPoints = () => httpClient.get('/db/point');

export default {
  getCities,
  getPoints,
};
