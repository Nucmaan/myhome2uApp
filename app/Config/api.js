
import axios from 'axios';

const API_URL = 'https://backendm2u.myhome2u.online';

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export default api;

