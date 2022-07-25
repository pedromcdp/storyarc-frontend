import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  show: false,
  title: '',
  subtitle: null,
  type: '',
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    showNotification: (state, action) => {
      state.show = true;
      state.title = action.payload.title;
      state.subtitle = action.payload.subtitle;
      state.type = action.payload.type;
    },
    hideNotification: (state) => {
      state.show = false;
    },
  },
});

export const { hideNotification, showNotification } = notificationSlice.actions;
export const useNotification = (state) => state.notification;
export default notificationSlice.reducer;
