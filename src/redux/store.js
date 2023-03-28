// import configureStore
import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./slices/loginSlice";

// configure store
export const store = configureStore({
  reducer: {
    login: loginReducer,
  },
});
