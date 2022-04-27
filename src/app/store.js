import { configureStore } from '@reduxjs/toolkit';
import feedFilterReducer from '../features/feedFilter/feedFilterSlice';

export const store = configureStore({
  reducer: {
    feedfilter: feedFilterReducer,
  },
});
