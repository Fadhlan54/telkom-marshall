import { createSlice } from "@reduxjs/toolkit";

export const hasChangedSlice = createSlice({
  name: "hasChanged",
  initialState: {
    hasChanged: false,
  },
  reducers: {
    setHasChanged: (state, action) => {
      state.hasChanged = action.payload;
    },
  },
});

export const { setHasChanged } = hasChangedSlice.actions;

export const selectHasChanged = (state) => state.hasChanged.hasChanged;

export default hasChangedSlice.reducer;
