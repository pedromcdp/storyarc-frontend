import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
};

const dialogSlice = createSlice({
  name: 'dialog',
  initialState,
  reducers: {
    openDialog: (state) => {
      state.isOpen = true;
    },
    closeDialog: (state) => {
      state.isOpen = false;
    },
  },
});

export const { openDialog, closeDialog } = dialogSlice.actions;
export const useDialog = (state) => state.dialog.isOpen;
export default dialogSlice.reducer;
