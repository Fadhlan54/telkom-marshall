import { createSlice } from "@reduxjs/toolkit";

export const navbarSlice = createSlice({
  name: "navbar",
  initialState: {
    isSideNavVisible: false,
    isFullSideNavVisible: true,
    isMiniSideNavVisible: false,
    isOffCanvasSideNavVisible: false,
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
    toggleFullSideNav: (state) => {
      state.isFullSideNavVisible = !state.isFullSideNavVisible;
    },

    toggleOffCanvasSideNav: (state) => {
      state.isOffCanvasSideNavVisible = !state.isOffCanvasSideNavVisible;
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

export const {
  setIsSideNavVisible,
  toggleSideNavType,
  toggleFullSideNav,
  toggleOffCanvasSideNav,
} = navbarSlice.actions;

export const selectIsSideNavVisible = (state) => state.navbar.isSideNavVisible;

export const selectIsFullSideNavVisible = (state) =>
  state.navbar.isFullSideNavVisible;

export const selectIsMiniSideNavVisible = (state) =>
  state.navbar.isMiniSideNavVisible;

export const selectIsOffCanvasSideNavVisible = (state) =>
  state.navbar.isOffCanvasSideNavVisible;

export default navbarSlice.reducer;
