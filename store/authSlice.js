import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    userData: null,
  },
  reducers: {
    authenticate: (state, action) => {
      const { payload } = action;
      state.token = payload.token;
      state.userData = payload.userData;

      console.log(state);
    },
  },
});

export const authenticate = authSlice.actions.authenticate; // akcija iz reducers objekta

export default authSlice.reducer; // metoda na authSlice po defaultu iz reduxa
