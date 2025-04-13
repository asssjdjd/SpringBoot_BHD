// redux/reducers/rootReducer.js
import { combineReducers } from "redux";
import foodReducer from "../redux/FoodSlide";
import filmReducer from "../redux/FilmSlice";
import userReducer from "../redux/UserSlice"

const rootReducer = combineReducers({
  food: foodReducer,
  film: filmReducer,
  user: userReducer,
});

export default rootReducer;
