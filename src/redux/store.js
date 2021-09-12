import { configureStore } from '@reduxjs/toolkit';
import modeReducer from './mode';
import wordsReducer from './words';

const store = configureStore({
  reducer: { mode: modeReducer, words: wordsReducer },
});

export default store;
