import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currWords: [],
  currWordIndex: 0,
  currLetterIndex: 0,
  space: false,
};

const wordsSlice = createSlice({
  name: 'words',
  initialState,
  reducers: {
    setWords(state, action) {
      state.currWords = action.payload;
    },

    incrementLetter(state) {
      state.currLetterIndex++;
      if (
        state.currLetterIndex >= state.currWords[state.currWordIndex].length
      ) {
        state.currLetterIndex = 0;
        state.currWordIndex++;
        state.space = true;
      }
    },

    decrementLetter(state, action) {
      if (action.payload) {
        state.currLetterIndex = state.currWords[state.currWordIndex - 1].length;
        state.currWordIndex--;
      }

      state.currLetterIndex--;
      if (state.currLetterIndex < 0) {
        state.currLetterIndex = 0;
      }
    },

    setSpace(state) {
      state.space = false;
    },
  },
});

export const wordsActions = wordsSlice.actions;

export default wordsSlice.reducer;
