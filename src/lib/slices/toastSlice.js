import { createSlice } from "@reduxjs/toolkit";

const resetToast = (state) => {
  state.isOpen = false;
  state.message = "";
};

export const toastSlice = createSlice({
  name: "toast",
  initialState: {
    isOpen: false,
    message: "",
    type: "",
  },
  reducers: {
    openToast: (state, action) => {
      resetToast(state);
      state.isOpen = true;
      state.message = action.payload.message;
      state.type = action.payload.type;
    },
    closeToast: (state) => {
      resetToast(state);
    },
  },
});

export const { openToast, closeToast } = toastSlice.actions;

export const showToastWithTimeout = (toastData) => (dispatch) => {
  dispatch(openToast(toastData));

  setTimeout(() => {
    dispatch(closeToast());
  }, toastData.duration || 4000);
};

export const selectToast = (state) => state.toast;
export default toastSlice.reducer;
