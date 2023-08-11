import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  setAuthHeader,
  setAuthHeaderRefresh,
  clearAuthHeader,
} from 'services/http';
import {
  registerUserAPI,
  loginUserAPI,
  resendVerifyEmailAPI,
  logoutAPI,
  refreshTokenAPI,
  getCurrentUserAPI,
  updateUserAPI,
  updateAvatarAPI,
  deleteUserAPI,
} from 'services/authService';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Loading } from 'notiflix/build/notiflix-loading-aio';

export const signUpThunk = createAsyncThunk(
  'auth/register',
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      Loading.pulse({
        svgColor: 'orange',
      });
      const result = await registerUserAPI({ name, email, password });
      Notify.success('SignUp is success!');
      setAuthHeader(result.token);
      Loading.remove();
      return result;
    } catch (error) {
      Notify.failure(
        `${error.response.data.message}. Status code ${error.response.status}`
      );
      Loading.remove();
      return rejectWithValue(
        `${error.response.data.message}. Status code ${error.response.status}`
      );
    }
  }
);

export const loginThunk = createAsyncThunk(
  'auth/login',
  async (data, { rejectWithValue }) => {
    try {
      Loading.pulse({
        svgColor: 'orange',
      });
      const result = await loginUserAPI(data);
      setAuthHeader(result.token);
      Notify.success('Login is success!');
      Loading.remove();
      return result;
    } catch (error) {
      Notify.failure(
        `${error.response.data.message}. Status code ${error.response.status}`
      );
      Loading.remove();
      return rejectWithValue(
        `${error.response.data.message}. Status code ${error.response.status}`
      );
    }
  }
);

export const resendVerifyEmailThunk = createAsyncThunk(
  'auth/resendVerifyEmail',
  async (data, { rejectWithValue }) => {
    try {
      Loading.pulse({
        svgColor: 'orange',
      });
      const result = await resendVerifyEmailAPI(data);
      Notify.success('Verification email has been successfully sent!');
      Loading.remove();
      return result;
    } catch (error) {
      Notify.failure(
        `${error.response.data.message}. Status code ${error.response.status}`
      );
      Loading.remove();
      return rejectWithValue(
        `${error.response.data.message}. Status code ${error.response.status}`
      );
    }
  }
);

export const logOutThunk = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      Loading.pulse({
        svgColor: 'orange',
      });
      const result = await logoutAPI();
      clearAuthHeader();
      Notify.success('Logout is success!');
      Loading.remove();
      return result;
    } catch (error) {
      Notify.failure(
        `${error.response.data.message}. Status code ${error.response.status}`
      );
      Loading.remove();
      return rejectWithValue(
        `${error.response.data.message}. Status code ${error.response.status}`
      );
    }
  }
);

export const refreshTokenThunk = createAsyncThunk(
  'auth/refreshToken',
  async (_, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token;
      const refreshToken = getState().auth.refreshToken;
      if (!token || !refreshToken) {
        return rejectWithValue('No token');
      }
      setAuthHeaderRefresh(token, refreshToken);
      const result = await refreshTokenAPI();
      setAuthHeader(result.token);
      return result;
    } catch (error) {
      localStorage.clear()
      return rejectWithValue(
        `${error.response.data.message}. Status code ${error.response.status}`
      );
    }
  }
);

export const getCurrentUserThunk = createAsyncThunk(
  'auth/getUser',
  async (_, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token;
      if (!token) {
        return rejectWithValue('No token');
      }
      setAuthHeader(token);
      const result = await getCurrentUserAPI();
      return result;
    } catch (error) {
      return rejectWithValue(
        `${error.response.data.message}. Status code ${error.response.status}`
      );
    }
  }
);

export const updateUserThunk = createAsyncThunk(
  'auth/updateUser',
  async (data, { rejectWithValue }) => {
    try {
      const result = await updateUserAPI(data);
      return result;
    } catch (error) {
      return rejectWithValue(
        `${error.response.data.message}. Status code ${error.response.status}`
      );
    }
  }
);

export const updateAvatarThunk = createAsyncThunk(
  'auth/updateAvatar',
  async (data, { rejectWithValue }) => {
    try {
      Loading.pulse({
        svgColor: 'orange',
      });
      const result = await updateAvatarAPI(data);
      Loading.remove();
      return result;
    } catch (error) {
      Loading.remove();
      return rejectWithValue(
        `${error.response.data.message}. Status code ${error.response.status}`
      );
    }
  }
);

export const deleteUserThunk = createAsyncThunk(
  'auth/deleteAccount',
  async (_, { rejectWithValue }) => {
    try {
      Loading.pulse({
        svgColor: 'orange',
      });
      await deleteUserAPI();
      Notify.success('Your account has been successfully deleted.');
      clearAuthHeader();
      Loading.remove();
    } catch (error) {
      Notify.failure(
        `${error.response.data.message}. Status code ${error.response.status}`
      );
      Loading.remove();
      rejectWithValue(
        `${error.response.data.message}. Status code ${error.response.status}`
      );
    }
  }
);
