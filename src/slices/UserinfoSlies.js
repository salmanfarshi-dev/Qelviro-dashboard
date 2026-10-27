import { createSlice } from "@reduxjs/toolkit";

export const UserinfoSlies = createSlice({
  name: "info",
  initialState: {
    value: localStorage.getItem("userinfo")
      ? JSON.parse(localStorage.getItem("userinfo"))
      : null,
  },

  reducers: {
    activeuserinfo: (state, action) => {
      state.value = action.payload;
      localStorage.setItem("userinfo", state.value);
    },
    logout: (state, action) => {
      state.value = "";
      localStorage.setItem("userinfo", "");
    },
  },
});

export const { activeuserinfo, logout } = UserinfoSlies.actions;

export default UserinfoSlies.reducer;
