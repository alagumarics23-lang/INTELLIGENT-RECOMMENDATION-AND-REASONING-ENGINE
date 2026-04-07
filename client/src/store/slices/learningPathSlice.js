import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const generateLearningPath = createAsyncThunk('learningPath/generate', async (_, thunkAPI) => {
  try {
    const { auth: { userToken } } = thunkAPI.getState();
    const config = { headers: { Authorization: `Bearer ${userToken}` } };
    const { data } = await axios.post('http://127.0.0.1:5000/api/recommendations', {}, config);
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response && error.response.data.message ? error.response.data.message : error.message);
  }
});

const learningPathSlice = createSlice({
  name: 'learningPath',
  initialState: {
    path: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(generateLearningPath.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(generateLearningPath.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.path = payload;
      })
      .addCase(generateLearningPath.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export default learningPathSlice.reducer;
