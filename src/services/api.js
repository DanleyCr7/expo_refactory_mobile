import axios from 'axios';

const api = axios.create({
  // baseURL: 'https://ifpi-refeitorio.herokuapp.com'
  baseURL: 'http://192.168.18.6:3333'
});

export default api;