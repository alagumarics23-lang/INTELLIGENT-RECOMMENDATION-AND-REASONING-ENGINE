import { createSlice } from '@reduxjs/toolkit';

const recommendationSlice = createSlice({
  name: 'recommendations',
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
});

export default recommendationSlice.reducer;
