import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  theart_name: localStorage.getItem("theart_name"),
  time: localStorage.getItem("time"),
};

export const filmSlice = createSlice({
  name: 'film',
  initialState,
  reducers: {
    setTheartName: (state, action) => {
      state.theart_name = action.payload;
    },
    setTime: (state, action) => {
      state.time = action.payload;
    },
    updateAll: (state, action) => {
        state.theart_name = action.payload.theart_name;
        state.time = action.payload.time;
        localStorage.setItem("theart_name",action.payload.theart_name)
        localStorage.setItem("time",action.payload.time)
    },
    reserveBillFilm : (state) => {
      state.theart_name = "";
    state.time = "";
    localStorage.removeItem("theart_name");
    localStorage.removeItem("time");
    }
  },
});

export const { setTheartName, setTime,updateAll,reserveBillFilm } = filmSlice.actions;

export default filmSlice.reducer;
