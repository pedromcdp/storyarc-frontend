import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  show: false,
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
  },
});

export const { openAddContent, closeAddContent } = addContentSlice.actions;
export const useAddContent = (state) => state.content.show;
export default addContentSlice.reducer;
