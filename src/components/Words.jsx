import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { wordsActions } from '../redux/words';

import { generateWords } from '../utils/generateWords';
import classes from './words.module.css';

function Words() {
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.mode);
  const words = useSelector((state) => state.words.currWords);

  useEffect(() => {
    dispatch(
      wordsActions.setWords(generateWords(mode.currOption, mode.difficulty))
    );
  }, [dispatch, mode]);

  const wordDivs = words.map((word, wIndex) => (
    <div key={'' + wIndex} id={'' + wIndex} className={classes.word}>
      {[...word].map((letter, lIndex) => (
        <span key={wIndex + '-' + lIndex} id={wIndex + '-' + lIndex}>
          {letter}
        </span>
      ))}
    </div>
  ));

  return wordDivs;
}

export default Words;
