import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import feedFilterReducer from '../features/feedFilter/feedFilterSlice';
import authReducer from '../features/auth/authSlice';

const makeStore = () =>
  configureStore({
    reducer: {
      feedfilter: feedFilterReducer,
      auth: authReducer,
    },
  });

export const wrapper = createWrapper(makeStore);
