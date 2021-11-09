import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  date: '',
  time: '',
};

export const dateSlice = createSlice({
  name: 'date',
  initialState,
  reducers: {
    updateDate: (state, action) => {
      const date = action.payload.split('-').reverse().join('-');
      state.date = date;
    },
    updateTime: (state, action) => {
      state.time = action.payload;
    },
  },
});

export const { updateDate, updateTime } = dateSlice.actions;

export default dateSlice.reducer;
