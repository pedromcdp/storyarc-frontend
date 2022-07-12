import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  show: false,
  title: '',
  subtitle: '',
  type: '',
  timeout: 3000,
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
      state.timeout = action.payload.timeout || 3000;
    },
    hideNotification: () => initialState,
  },
});

export const { hideNotification, showNotification } = notificationSlice.actions;
export const useNotification = (state) => state.notification;
export default notificationSlice.reducer;
