import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  show: false,
};

const addContentSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {
    setAddContent: (state, action) => {
      state.show = action.payload;
    },
  },
});

export const { setAddContent } = addContentSlice.actions;
export const isShowingContentModal = (state) => state.content.show;
export default addContentSlice.reducer;
