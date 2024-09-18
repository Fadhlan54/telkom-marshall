import { configureStore } from "@reduxjs/toolkit";
import navbarReducer from "./slices/navbarSlice";
import toastReducer from "./slices/toastSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      navbar: navbarReducer,
      toast: toastReducer,
    },
  });
};
