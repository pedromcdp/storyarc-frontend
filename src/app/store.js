import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import feedFilterReducer from '../features/feedFilter/feedFilterSlice';

const makeStore = () =>
  configureStore({
    reducer: {
      feedfilter: feedFilterReducer,
    },
  });

export const wrapper = createWrapper(makeStore);
