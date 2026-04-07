import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// This dynamically picks up your Render URL from Vercel's environment variables
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const userToken = localStorage.getItem('userToken') ? localStorage.getItem('userToken') : null;
const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;

export const login = createAsyncThunk('auth/login', async ({ email, password }, thunkAPI) => {
  try {
    const config = { headers: { 'Content-Type': 'application/json' } };
    const { data } = await axios.post(`${API_URL}/api/auth/login`, { email, password }, config);
    localStorage.setItem('userInfo', JSON.stringify(data));
    localStorage.setItem('userToken', data.token);
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response && error.response.data.message ? error.response.data.message : error.message);
  }
});

export const register = createAsyncThunk('auth/register', async ({ name, email, password, preferences }, thunkAPI) => {
  try {
    const config = { headers: { 'Content-Type': 'application/json' } };
    const { data } = await axios.post(`${API_URL}/api/auth/register`, { name, email, password, preferences }, config);
    localStorage.setItem('userInfo', JSON.stringify(data));
    localStorage.setItem('userToken', data.token);
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response && error.response.data.message ? error.response.data.message : error.message);
  }
});

export const updateProfile = createAsyncThunk('auth/updateProfile', async (profileData, thunkAPI) => {
  try {
    const state = thunkAPI.getState();
    const token = state.auth.userToken;
    const config = { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` } };
    const { data } = await axios.put(`${API_URL}/api/auth/profile`, profileData, config);
    localStorage.setItem('userInfo', JSON.stringify(data));
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response && error.response.data.message ? error.response.data.message : error.message);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    userInfo: userInfo,
    userToken: userToken,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      localStorage.removeItem('userInfo');
      localStorage.removeItem('userToken');
      state.userInfo = null;
      state.userToken = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.userInfo = payload;
        state.userToken = payload.token;
      })
      .addCase(login.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.userInfo = payload;
        state.userToken = payload.token;
      })
      .addCase(register.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProfile.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.userInfo = payload;
      })
      .addCase(updateProfile.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;