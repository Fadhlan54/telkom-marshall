import { configureStore } from "@reduxjs/toolkit";
import navbarReducer from "./slices/navbarSlice";
import toastReducer from "./slices/toastSlice";
import hasChangedReducer from "./slices/hasChangedSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      navbar: navbarReducer,
      toast: toastReducer,
      hasChanged: hasChangedReducer,
    },
  });
};
