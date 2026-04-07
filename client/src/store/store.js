import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import courseReducer from './slices/courseSlice';
import learningPathReducer from './slices/learningPathSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    courses: courseReducer,
    learningPath: learningPathReducer,
  },
});
