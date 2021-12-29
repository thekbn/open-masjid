import axios from 'axios';

const apiClient = axios.create({
    baseURL: process.env.API_URL,
    timeout: 1000
  });

export default apiClient;