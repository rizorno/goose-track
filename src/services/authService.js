import { privateAPI, publicAPI } from './http';

export const registerUserAPI = async user => {
  const { data } = await publicAPI.post('api/auth/register', user);
  return data;
};

export const loginUserAPI = async user => {
  const { data } = await publicAPI.post('api/auth/login', user);
  return data;
};

export const verifyEmailAPI = async verificationToken => {
  const { data } = await publicAPI.get(`api/auth/verify/${verificationToken}`);
  return data;
};

export const resendVerifyEmailAPI = async email => {
  const { data } = await publicAPI.post('api/auth/verify', email);
  return data;
};

export const logoutAPI = async () => {
  const { data } = await privateAPI.post('api/auth/logout');
  return data;
};

export const refreshTokenAPI = async () => {
  const { data } = await privateAPI.post('api/auth/refresh');
  return data;
};

export const getCurrentUserAPI = async () => {
  const { data } = await privateAPI.get('api/auth/current');
  return data;
};

export const updateUserAPI = async dataUser => {
  const { data } = await privateAPI.put('api/auth', dataUser);
  return data;
};

export const updateAvatarAPI = async avatar => {
  const { data } = await privateAPI.patch('api/auth/avatar', avatar);
  return data;
};

export const deleteUserAPI = async () => {
  const { data } = await privateAPI.delete(`api/auth/`);
  return data;
};
