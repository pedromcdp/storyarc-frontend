import { configureStore } from '@reduxjs/toolkit';
import feedFilterReducer from '../features/feedFilter/feedFilterSlice';
import dialogReducer from '../features/dialog/dialogSlice';
import contentReducer from '../features/addContent/addContentSlice';
import searchReducer from '../features/search/searchSlice';
import notficicationReducer from '../features/notification/notificationSlice';

export const store = configureStore({
  reducer: {
    feedfilter: feedFilterReducer,
    dialog: dialogReducer,
    content: contentReducer,
    search: searchReducer,
    notification: notficicationReducer,
  },
});
