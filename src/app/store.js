import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import { StoryArcAPI } from '../services/storyarc';
import feedFilterReducer from '../features/feedFilter/feedFilterSlice';
import authReducer from '../features/auth/authSlice';

const makeStore = () =>
  configureStore({
    reducer: {
      feedfilter: feedFilterReducer,
      auth: authReducer,
      [StoryArcAPI.reducerPath]: StoryArcAPI.reducer,
    },
    middleware: (gDM) => gDM().concat(StoryArcAPI.middleware),
  });

export const wrapper = createWrapper(makeStore);
