import axios from 'axios';

const api = axios.create({
  baseURL: 'https://ifpi-refeitorio.herokuapp.com'
});

export default api;