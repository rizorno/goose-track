export const getAccessToken = state => state.auth.token;
export const getRefreshTime = state => state.auth.refreshTime;
export const getUser = state => state.auth.user;
export const getUserAvatar = state => state.auth.user.avatarURL;
export const getErrorUser = state => state.auth.error;
