import axios from 'axios';

export const privateAPI = axios.create({
  baseURL: 'https://goose-track-rest-api-s6pu.onrender.com',
  //   baseURL: 'http://localhost:3001/',
});

export const publicAPI = axios.create({
  baseURL: 'https://goose-track-rest-api-s6pu.onrender.com',
  //   baseURL: 'http://localhost:3001/',
});

// Utility to add JWT
export const setAuthHeader = token => {
  privateAPI.defaults.headers.common.Authorization = `Bearer ${token}`;
};

// Utility to add refresh JWT
export const setAuthHeaderRefresh = (token, refreshToken) => {
  privateAPI.defaults.headers.common.Authorization = `Bearer ${token} ${refreshToken}`;
};

// Utility to remove JWT
export const clearAuthHeader = () => {
  privateAPI.defaults.headers.common.Authorization = '';
};
