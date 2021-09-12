// Mode Constants
export const TIME = 'time';
export const TIME_MODE_OPTIONS = [15, 30, 60, 120];
export const TIME_MODE = { currMode: TIME, currOptions: TIME_MODE_OPTIONS };
export const WORDS = 'words';
export const WORD_MODE_OPTIONS = [10, 25, 50, 100];
export const WORDS_MODE = { currMode: WORDS, currOptions: WORD_MODE_OPTIONS };
export const PUNCTUATION = 'punctuation';
export const NUMBERS = 'numbers';

// Difficulty Constants
export const ENGLISH = 'english';
export const ENGLISH_1k = 'english1k';
export const ENGLISH_5k = 'english5k';
export const ENGLISH_10k = 'english10k';
export const ENGLISH_25k = 'english25k';

// Words Constants
export const TIME_15 = 75;
export const TIME_30 = 150;
export const TIME_60 = 210;
export const TIME_120 = 275;

// KeyStoke Constants
// prettier-ignore
export const ignoreSet = new Set(['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Enter','Control', 'Alt', 'Tab']);
export const SPACE = ' ';
export const BACKSPACE = 'Backspace';
export const CAPS = 'CapsLock';
