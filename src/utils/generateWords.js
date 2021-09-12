import { ENGLISH, TIME_120, TIME_15, TIME_30, TIME_60 } from '../constants';
import english from './english.json';

const generateRandomIndex = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getUserSelectedWords = function (option, difficulty) {
  let selectedWords = [];
  let limit = 0;

  switch (difficulty) {
    case ENGLISH:
      selectedWords = english.words;
      break;
    default:
      selectedWords = english.words;
  }

  switch (option) {
    case 10:
      break;
    case 15:
      limit = TIME_15;
      break;
    case 25:
      break;
    case 30:
      limit = TIME_30;
      break;
    case 50:
      break;
    case 60:
      limit = TIME_60;
      break;
    case 100:
      break;
    case 120:
      limit = TIME_120;
      break;
    default:
      limit = TIME_30;
      break;
  }

  return { selectedWords, limit };
};

export const generateWords = function (currOption, currDifficulty) {
  let { selectedWords, limit } = getUserSelectedWords(
    currOption,
    currDifficulty
  );

  const words = [];
  let prevIndex = -1;
  let currIndex = generateRandomIndex(0, selectedWords.length - 1);

  while (limit-- > 0) {
    if (prevIndex !== currIndex) {
      words.push(english.words[currIndex]);
      prevIndex = currIndex;
      currIndex = generateRandomIndex(0, selectedWords.length - 1);
    } else {
      currIndex = generateRandomIndex(0, selectedWords.length - 1);
      limit++;
    }
  }

  return words;
};
