import { configureStore } from '@reduxjs/toolkit';
import dateSlice from '../features/dateSlice';

export const store = configureStore({
  reducer: {
    date: dateSlice,
  },
});
