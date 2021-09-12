import { createSlice } from '@reduxjs/toolkit';
import { NUMBERS, PUNCTUATION, TIME, TIME_MODE_OPTIONS } from '../constants';

const initialState = {
  currMode: TIME,
  currOption: TIME_MODE_OPTIONS[1],
  allOptions: TIME_MODE_OPTIONS,
  punctuation: false,
  numbers: false,
  difficulty: 'english',
};

const modeSlice = createSlice({
  name: 'mode',
  initialState,
  reducers: {
    changeMode(state, action) {
      state.currMode = action.payload.currMode;
      state.allOptions = action.payload.currOptions;
      state.currOption = action.payload.currOptions[1];
    },

    changeOption(state, action) {
      state.currOption = action.payload;
    },

    toggleType(state, action) {
      if (PUNCTUATION === action.payload) {
        state.punctuation = !state.punctuation;
      }

      if (NUMBERS === action.payload) {
        state.numbers = !state.numbers;
      }
    },
  },
});

export const modeActions = modeSlice.actions;
export default modeSlice.reducer;
