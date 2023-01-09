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
    },
    setDidTryAutoLogin: (state) => {
      state.didTryAutoLogin = true;
    },
  },
});

export const setDidTryAutoLogin = authSlice.actions.setDidTryAutoLogin; // akcija iz reducers objekta
export const authenticate = authSlice.actions.authenticate; // akcija iz reducers objekta

export default authSlice.reducer; // metoda na authSlice po defaultu iz reduxa
