import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { wordsActions } from '../redux/words';
import { ignoreSet, SPACE, BACKSPACE, CAPS, TIME } from '../constants';

import Words from './Words';
import classes from './middle.module.css';

function Middle() {
  const dispatch = useDispatch();
  // Global States
  const mode = useSelector((state) => state.mode);
  const {
    currWords: words,
    currWordIndex: wordIndex,
    currLetterIndex: letterIndex,
    space,
  } = useSelector((state) => state.words);

  // Timer State
  const [timerOrWord, setTimerOrWord] = useState(
    mode.currMode === TIME ? mode.currOption : `0/${mode.currOption}`
  );

  // Input States
  const [caretStyle, setCaretStyle] = useState({ top: '1px', left: '5px' });
  const [indicator, setIndicators] = useState({ opacity: 0 });
  const [capslock, setCapslock] = useState('hidden');

  // Initialise Timer/Word Count through useEffect hook.
  useEffect(() => {
    const timer = setInterval(() => {
      setTimerOrWord((state) => {
        return state - 1;
      });
    }, 1000);

    if (timerOrWord === 0) {
      clearInterval(timer);
    }
  }, [timerOrWord]);

  /**
   * @summary Moves Caret by certain width;
   * @param {number} offSetWidth - can be negative or positve based on direction.
   * @returns {void};
   */
  const moveCaretLetter = function (offSetWidth) {
    setCaretStyle((state) => {
      return {
        ...state,
        left:
          +state.left.slice(0, -2) +
          offSetWidth +
          (letterIndex === 0 ? 0.4125 : 0) +
          'px',
      };
    });
  };

  /**
   * @summary Handles any keyDown event for the test.
   * @param {event} e
   * @returns {void}
   */
  const handleInput = function (e) {
    const key = e.key;

    // if the user presses an unwanted key such as Alt, Control should not impact the test.
    if (ignoreSet.has(key)) {
      return;
    }

    // Toggle CapsLock warning if the CapsLock key is pressed
    if (key === CAPS) {
      setCapslock((state) => {
        return state === 'hidden' ? '' : 'hidden';
      });
      return;
    }

    // Show Indicators - Timer/Word Count, Live WPM, Live Accuracy.
    setIndicators({ opacity: 1 });
    if (mode.currMode === TIME) {
      startTimer();
    }

    // Get the current letter details which the user has to press to evaluate the keydown event.
    const currLetter = words[wordIndex].charAt(letterIndex);
    const spanObject = document.getElementById(`${wordIndex}-${letterIndex}`);
    const offSetWidth = spanObject.offsetWidth;

    // if user presses the Backspace key.
    if (BACKSPACE === key) {
      let span;
      // if the user wants to delete the last letter of the current word.
      if (letterIndex === 0 && space) {
        span = document.getElementById(
          `${wordIndex - 1}-${words[wordIndex - 1].length - 1}`
        );
        span.classList.remove('correct');
        span.classList.remove('error');
        moveCaretLetter(-1 * offSetWidth);
        dispatch(wordsActions.decrementLetter(true));
        dispatch(wordsActions.setSpace());
        return;
      }

      // if the current letter of the word is the first don't allow backspace.
      if (letterIndex === 0) {
        return;
      }

      dispatch(wordsActions.decrementLetter());
      moveCaretLetter(-1 * offSetWidth);
      span = document.getElementById(`${wordIndex}-${letterIndex - 1}`);
      span.classList.remove('correct');
      span.classList.remove('error');

      return;
    }

    // When the user has to hit the Space key to move on to the next word.
    if (space) {
      // if key pressed is not Space don't do anything.
      if (SPACE !== key) {
        return;
      }

      moveCaretLetter(offSetWidth);
      dispatch(wordsActions.setSpace());
      return;
    }

    // Evaluate any other scenario.
    if (key === currLetter) {
      spanObject.classList.add('correct');
    } else {
      spanObject.classList.add('error');
    }

    moveCaretLetter(offSetWidth);
    dispatch(wordsActions.incrementLetter());
  };

  const startTimer = function () {
    setTimerOrWord(mode.currOption);
  };

  return (
    <div className={classes.page}>
      <div id="typingTest">
        <div className={`${classes.caps} ${capslock}`}>
          <i className="fas fa-lock"></i> <p>Caps Lock</p>
        </div>
        <input
          className={classes['word-input']}
          tabIndex="0"
          autoComplete="off"
          autoFocus
          onKeyDown={handleInput}
        />
        <div className={classes.indicators} style={indicator}>
          <div className={classes.indicator}>{timerOrWord}</div>
          <div className={classes.indicator}>0</div>
          <div className={classes.indicator}>NaN%</div>
        </div>
        <div className={classes['words-container']}>
          <div className={classes.caret} style={caretStyle}></div>
          <div className={classes.words}>
            <Words />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Middle;
