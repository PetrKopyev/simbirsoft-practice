import axios from 'axios';

const httpClient = axios.create({
  baseURL: '/api',
  headers: {
    'X-Api-Factory-Application-Id': '5e25c641099b810b946c5d5b',
    'Content-Type': 'application/json',
  },
});

export default httpClient;
