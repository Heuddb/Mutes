import { createSlice } from "@reduxjs/toolkit";

const token = localStorage.getItem("token");
const user = localStorage.getItem("user");
const userId = localStorage.getItem("userId")
const initialState = {
  user: user ? JSON.parse(user) : null,
  token: token,
  userId: userId ,
  isAuthenticated: Boolean(token),
  pendingEmail: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setPendingEmail: (state, action) => {
      state.pendingEmail = action.payload;
    },

    setCredentials: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.userId = action.payload.userId;
      state.isAuthenticated = true;
      state.pendingEmail = null;
    },

    logout: (state) => {
      state.user = null;
      state.token = null;
      state.userId = null;
      state.isAuthenticated = false;
      state.pendingEmail = null;
 
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("userId");
    },
  },
});

export const { setPendingEmail, setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
