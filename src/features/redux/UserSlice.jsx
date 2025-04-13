import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  role : localStorage.getItem("role"),
  id : localStorage.getItem('user_id'),
  isAuthenticated : localStorage.getItem("authenticated"),
  time_buy_ticket : localStorage.getItem("time-buy"),
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateAll: (state, action) => {
        state.role = action.payload.role;
        state.id = action.payload.id;
        state.isAuthenticated = action.payload.isAuthenticated;
        localStorage.setItem("role",action.payload.role)
        localStorage.setItem("user_id",action.payload.id)
        localStorage.setItem("authenticated",action.payload.isAuthenticated)
    },

    logOut: () => {
        localStorage.removeItem("role")
        localStorage.removeItem("user_id")
        localStorage.removeItemI("authenticated")
    },

    getTimeBuy: (state,action) => {
      state.time_buy_ticket = action.payload.time_buy_ticket;
      localStorage.setItem("time-buy",action.payload.time_buy_ticket)
    },

    outTimeBuy: () => {
      localStorage.removeItem('time-buy')
    }
  },
});

export const { updateAll,logOut,getTimeBuy,outTimeBuy } = userSlice.actions;

export default userSlice.reducer;
