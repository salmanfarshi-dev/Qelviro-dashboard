import { createSlice } from "@reduxjs/toolkit";

export const UserinfoSlies = createSlice({
  name: "info",
  initialState: {
    value: localStorage.getItem("userinfo") ? JSON.parse(localStorage.getItem("userinfo")): null,
  },

  reducers: {
    activeuserinfo: (state, action) => {

        state.value = action.payload
        localStorage.setItem("userinfo", state.value)
     
    },
  },
});

export const { activeuserinfo } =
  UserinfoSlies.actions;

export default UserinfoSlies.reducer;
