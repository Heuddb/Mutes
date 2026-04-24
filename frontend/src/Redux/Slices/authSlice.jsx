import { createSlice } from "@reduxjs/toolkit";

const token = localStorage.getItem("token");
const user = localStorage.getItem("user");
const userId = localStorage.getItem("userId")
const initialState = {
  user: user ? JSON.parse(user) : null,
  token: token,
  userId: userId ,
  isAuthenticated: Boolean(token),
  pendingPhone: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setPendingPhone: (state, action) => {
      state.pendingPhone = action.payload;
    },

    setCredentials: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.userId = action.payload.userId;
      state.isAuthenticated = true;
      state.pendingPhone = null;
    },

    logout: (state) => {
      state.user = null;
      state.token = null;
      state.userId = null;
      state.isAuthenticated = false;
      state.pendingPhone = null;
 
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("userId");
    },
  },
});

export const { setPendingPhone, setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
