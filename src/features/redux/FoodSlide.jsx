import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  total : localStorage.getItem("total"),
  amount : localStorage.getItem('amount'),
  title : localStorage.getItem("title"),
};

export const foodSlide = createSlice({
  name: 'food',
  initialState,
  reducers: {
    updateAll: (state, action) => {
        state.total = action.payload.total;
        state.amount = action.payload.amount;
        state.title = action.payload.title;
        localStorage.setItem("total",action.payload.total)
        localStorage.setItem("amount",action.payload.amount)
        localStorage.setItem("title",action.payload.title)

    },
    reserverBillFood: (state) => {
      state;
      localStorage.removeItem("total");
      localStorage.removeItem("title");
      localStorage.removeItem("amount"); // ← Sửa chỗ này
    }
    

  },
});

export const { updateAll,reserverBillFood } = foodSlide.actions;

export default foodSlide.reducer;
