import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import { StoryArcAPI } from '../services/storyarc';
import feedFilterReducer from '../features/feedFilter/feedFilterSlice';
import dialogReducer from '../features/dialog/dialogSlice';
import contentReducer from '../features/addContent/addContentSlice';

const makeStore = () =>
  configureStore({
    reducer: {
      feedfilter: feedFilterReducer,
      dialog: dialogReducer,
      content: contentReducer,
      [StoryArcAPI.reducerPath]: StoryArcAPI.reducer,
    },
    middleware: (gDM) => gDM().concat(StoryArcAPI.middleware),
  });

export const wrapper = createWrapper(makeStore);
