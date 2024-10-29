import axios from 'axios';
import { getToken, logout, getEmpresa, getLocal, linkApi } from './auth';
const api = axios.create({ baseURL: linkApi });

api.interceptors.request.use(async config => {
    const token = getToken();
    const empresa = getEmpresa();
    const local = getLocal();

    if (token) config.headers.Authorization = `Bearer ${token}`;
    if (empresa) config.headers.codigoempresa = empresa;
    if (local) config.headers.codigolocal = local;

    return config;
});

api.interceptors.response.use(function (response) {
    return response;
  }, function (error) {
    if (error.response.status === 401) { 
        logout();
    }
    return Promise.reject(error);
  });

export default api;