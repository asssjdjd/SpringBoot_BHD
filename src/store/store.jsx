import { configureStore } from "@reduxjs/toolkit";
import filmReducer from "../features/redux/FilmSlice";
import foodReducer from "../features/redux/FoodSlide";
import userReducer from "../features/redux/UserSlice"

export const store = configureStore({
    reducer: {
      film : filmReducer,
      food: foodReducer,
      user : userReducer,
    },
  });