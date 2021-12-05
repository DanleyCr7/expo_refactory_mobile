import axios from "axios";

const api = axios.create({
  // baseURL: "http://ifpiparnaiba.edu.br/node/node",
  // baseURL: "https://ifpi-refeitorio.herokuapp.com/node",
  baseURL: "http://192.168.18.6:3334/node",
});

export default api;
