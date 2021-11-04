import axios, {AxiosError, AxiosInstance, AxiosRequestConfig} from "axios";
import TokenService from "../services/token.service"

const apiUrl = process.env.apiUrl;

const client: AxiosInstance = axios.create({
   baseURL: apiUrl,
   withCredentials: true,
});

// include access token in requests
const perRequestInterceptor = (config: AxiosRequestConfig) : AxiosRequestConfig => {
   const token = TokenService.getLocalAccessToken();

   if (token) {
      config.headers.Authorization = `Bearer ${token}`
   }

   return config;
}

// Refresh token on expire
const perErrorInterceptor = async (error) => {
   const originalRequest = error.config;
   if (error.response.status === 401 && error.config && !error.config._isRetry) {
      originalRequest._isRetry = true;
      try {
         await axios.post<string>("/auth/token/refresh", {},
            {baseURL: apiUrl, withCredentials: true})
            .then(response => response.data)
            .then(data => TokenService.setLocalAccessToken(data));

         return client.request(originalRequest);
      } catch (e) {
         return Promise.reject(e);
      }
   }
   return Promise.reject(error);
}

client.interceptors.request.use(perRequestInterceptor, (error: AxiosError) => Promise.reject(error));
client.interceptors.response.use(null, perErrorInterceptor)

export const serv = (accessToken: string) =>
   axios.create(
      {
         baseURL: process.env.apiUrl,
         headers: {authorization: `Bearer ${accessToken}`}
      })

export default client;