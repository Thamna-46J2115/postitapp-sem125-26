import { configureStore } from "@reduxjs/toolkit";
import useReducer from "../Features/UserSlice.js";

export const store = configureStore({
  reducer: {
    users: useReducer,
  },
});
