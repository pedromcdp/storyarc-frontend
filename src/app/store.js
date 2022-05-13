import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import { StoryArcAPI } from '../services/storyarc';
import feedFilterReducer from '../features/feedFilter/feedFilterSlice';
import authReducer from '../features/auth/authSlice';
import dialogReducer from '../features/dialog/dialogSlice';

const makeStore = () =>
  configureStore({
    reducer: {
      feedfilter: feedFilterReducer,
      auth: authReducer,
      dialog: dialogReducer,
      [StoryArcAPI.reducerPath]: StoryArcAPI.reducer,
    },
    middleware: (gDM) => gDM().concat(StoryArcAPI.middleware),
  });

export const wrapper = createWrapper(makeStore);
