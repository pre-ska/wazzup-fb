import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    userData: null,
    didTryAutoLogin: false,
  },
  reducers: {
    authenticate: (state, action) => {
      const { payload } = action;
      state.token = payload.token;
      state.userData = payload.userData;
      state.didTryAutoLogin = true;
    },
    setDidTryAutoLogin: (state, action) => {
      state.didTryAutoLogin = true;
    },
    logout: (state, action) => {
      state.token = null;
      state.userData = null;
      state.didTryAutoLogin = false;
    },
  },
});

export const logout = authSlice.actions.logout; // akcija iz reducers objekta
export const setDidTryAutoLogin = authSlice.actions.setDidTryAutoLogin; // akcija iz reducers objekta
export const authenticate = authSlice.actions.authenticate; // akcija iz reducers objekta

export default authSlice.reducer; // metoda na authSlice po defaultu iz reduxa
