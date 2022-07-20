import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  login: {
    currentUser: null,
    isLogged: false,
    isVendor: false,
  },
  register: {
    success: false,
  },
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.login.currentUser = action.payload;
      state.login.isLogged = true;
    },
    saveProfile: (state, action) => {
      state.login.currentUser = action.payload;
    },
    registerSuccess: state => {
      state.register.success = true;
    },
    logoutSuccess: state => {
      state.login.currentUser = null;
      state.login.isLogged = false;
      state.login.isVendor = false;
    },

    loginVendorSuccess: (state, action) => {
      state.login.currentUser = action.payload;
      state.login.isLogged = true;
      state.login.isVendor = true;
    },
  },
});

export const { loginSuccess, registerSuccess, logoutSuccess, loginVendorSuccess, saveProfile } =
  authSlice.actions;

export default authSlice.reducer;
