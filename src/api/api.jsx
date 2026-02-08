import axios from "axios";

const api = axios.create({
  baseURL:  'https://socio-app-backend-yfma.onrender.com/api',
  withCredentials: true 
});

export default api;
 