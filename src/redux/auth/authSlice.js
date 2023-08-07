import { createSlice } from '@reduxjs/toolkit';
import {
  signUpThunk,
  loginThunk,
  logOutThunk,
  refreshTokenThunk,
  getCurrentUserThunk,
  updateUserThunk,
  updateAvatarThunk,
  deleteUserThunk,
} from './authOperations';

const initialState = {
  token: null,
  refreshToken: null,
  refreshTime: null,
  user: {
    avatarURL: null,
    name: null,
    email: null,
    phone: null,
    birthday: null,
    skype: null,
    review: null,
  },
  isLoading: false,
  isLogin: false,
  error: null,
};

const handlePending = state => {
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder

      //? signUp

      .addCase(signUpThunk.pending, handlePending)
      .addCase(signUpThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isLogin = true;
        state.token = payload.token;
        state.refreshToken = payload.refreshToken;
        state.refreshTime = payload.refreshTime;
        state.user = payload.user;
        state.error = null;
      })
      .addCase(signUpThunk.rejected, handleRejected)

      //? login

      .addCase(loginThunk.pending, handlePending)
      .addCase(loginThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isLogin = true;
        state.token = payload.token;
        state.refreshToken = payload.refreshToken;
        state.refreshTime = payload.refreshTime;
        state.user = payload.user;
        state.error = null;
      })
      .addCase(loginThunk.rejected, handleRejected)

      //? logout

      .addCase(logOutThunk.pending, handlePending)
      .addCase(logOutThunk.fulfilled, () => {
        return initialState;
      })
      .addCase(logOutThunk.rejected, handleRejected)

      //? refresh Token

      .addCase(refreshTokenThunk.pending, handlePending)
      .addCase(refreshTokenThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isLogin = true;
        state.token = payload.token;
        state.refreshToken = payload.refreshToken;
        state.refreshTime = payload.refreshTime;
        state.error = null;
      })
      .addCase(refreshTokenThunk.rejected, handleRejected)

      //? get Current User

      .addCase(getCurrentUserThunk.pending, handlePending)
      .addCase(getCurrentUserThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isLogin = true;
        state.user = payload;
        state.error = null;
      })
      .addCase(getCurrentUserThunk.rejected, handleRejected)

      //? update User

      .addCase(updateUserThunk.pending, handlePending)
      .addCase(updateUserThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.user = payload.user;
        state.error = null;
      })
      .addCase(updateUserThunk.rejected, handleRejected)

      //? update Avatar

      .addCase(updateAvatarThunk.pending, handlePending)
      .addCase(updateAvatarThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.user.avatarURL = payload.secure_url;
        state.error = null;
      })
      .addCase(updateAvatarThunk.rejected, handleRejected)

      //? delete User account

      .addCase(deleteUserThunk.pending, handlePending)
      .addCase(deleteUserThunk.fulfilled, () => {
        return initialState;
      })
      .addCase(deleteUserThunk.rejected, handleRejected);
  },
});
export const authReducer = authSlice.reducer;
