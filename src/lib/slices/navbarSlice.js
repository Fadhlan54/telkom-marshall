import { createSlice } from "@reduxjs/toolkit";

export const navbarSlice = createSlice({
  name: "navbar",
  initialState: {
    isSideNavVisible: false,
    isFullSideNavVisible: false,
    isMiniSideNavVisible: false,
  },
  reducers: {
    setIsSideNavVisible: (state, action) => {
      state.isSideNavVisible = action.payload;
    },
    setIsFullSideNavVisible: (state, action) => {
      state.isFullSideNavVisible = action.payload;
    },
    setIsMiniSideNavVisible: (state, action) => {
      state.isMiniSideNavVisible = action.payload;
    },
    toggleSideNav: (state) => {
      if (state.isSideNavVisible) {
        state.isSideNavVisible = false;
        state.isFullSideNavVisible = false;
        state.isMiniSideNavVisible = false;
      } else {
        state.isSideNavVisible = true;
        state.isFullSideNavVisible = true;
        state.isMiniSideNavVisible = false;
      }
    },

    toggleSideNavType: (state) => {
      if (state.isFullSideNavVisible) {
        state.isSideNavVisible = true;
        state.isFullSideNavVisible = false;
        state.isMiniSideNavVisible = true;
      } else {
        state.isSideNavVisible = true;
        state.isFullSideNavVisible = true;
        state.isMiniSideNavVisible = false;
      }
    },
    hideSideNav: (state) => {
      state.isSideNavVisible = false;
      state.isFullSideNavVisible = false;
      state.isMiniSideNavVisible = false;
    },
  },
});

export const { setIsSideNavVisible, toggleSideNav, toggleSideNavType } =
  navbarSlice.actions;

export const selectIsSideNavVisible = (state) => state.navbar.isSideNavVisible;

export const selectIsFullSideNavVisible = (state) =>
  state.navbar.isFullSideNavVisible;

export const selectIsMiniSideNavVisible = (state) =>
  state.navbar.isMiniSideNavVisible;

export default navbarSlice.reducer;
