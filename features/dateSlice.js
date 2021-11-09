import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  date: '',
  time: '',
  name: '',
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
      console.log(action.payload);
      state.time = action.payload;
    },
    updateName: (state, action) => {
      console.log(action.payload);
      state.name = action.payload;
    },
  },
});

export const { updateDate, updateTime, updateName } = dateSlice.actions;

export default dateSlice.reducer;
