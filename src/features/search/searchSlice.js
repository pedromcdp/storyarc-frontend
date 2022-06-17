import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  showSearch: false,
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    showSearch: (state) => {
      state.showSearch = true;
    },
    hideSearch: (state) => {
      state.showSearch = false;
    },
  },
});

export const { showSearch, hideSearch } = searchSlice.actions;
export const useSearch = (state) => state.search.showSearch;
export default searchSlice.reducer;
