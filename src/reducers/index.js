import { combineReducers } from "redux";
import ClockReducer from "./reducer_clock";

const rootReducer = combineReducers({
  clock: ClockReducer
});

export default rootReducer;
