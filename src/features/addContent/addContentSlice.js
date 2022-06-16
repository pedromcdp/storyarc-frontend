import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  show: false,
  showloading: false,
};

const addContentSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {
    openAddContent: (state) => {
      state.show = true;
    },
    closeAddContent: (state) => {
      state.show = false;
    },
    showLoading: (state) => {
      state.showloading = true;
    },
    hideLoading: (state) => {
      state.showloading = false;
    },
  },
});

export const { openAddContent, closeAddContent, showLoading, hideLoading } =
  addContentSlice.actions;
export const useAddContent = (state) => state.content.show;
export const useShowLoading = (state) => state.content.showloading;
export default addContentSlice.reducer;
