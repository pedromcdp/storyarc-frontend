import { createSlice } from '@reduxjs/toolkit';
import { feedFilters } from '../../utils/feedFilters';

const initialState = {
  selectedFilter: JSON.stringify(feedFilters[0]),
};

const feedFilterSlice = createSlice({
  name: 'feedfilter',
  initialState,
  reducers: {
    setSelectedFilter: (state, action) => {
      state.selectedFilter = action.payload;
    },
  },
});

export const { setSelectedFilter } = feedFilterSlice.actions;
export const useFeedFilter = (state) => state.feedfilter.selectedFilter;
export default feedFilterSlice.reducer;
