import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import { modeActions } from '../redux/mode';

import { TIME, WORDS, TIME_MODE, WORDS_MODE } from '../constants';
import classes from './top.module.css';

function Top() {
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.mode);

  const toggleType = function (e) {
    dispatch(modeActions.toggleType(e.target.textContent));
  };

  const toggleMode = function (e) {
    let selectedMode = TIME === e.target.textContent ? TIME_MODE : WORDS_MODE;
    dispatch(modeActions.changeMode(selectedMode));
  };

  const toggleOption = function (e) {
    dispatch(modeActions.changeOption(+e.target.textContent));
  };

  const options = mode.allOptions.map((option) => (
    <button
      key={option}
      className={`${classes.button} ${
        option === mode.currOption ? classes.selected : ''
      }`}
      onClick={toggleOption}
    >
      {option}
    </button>
  ));
  return (
    <div className={classes.top}>
      <div className={classes.logo}>
        <div className={classes.icon}>mb</div>
        <div className={classes.text}>monkeybr</div>
      </div>
      <div className={classes.menu}>
        <div
          className={classes['icon-button']}
          id="startTestButton"
          tabIndex="2"
        >
          <div className={classes['menu-icon']}>
            <i className="fas fa-keyboard"></i>
          </div>
        </div>
        <div className={classes['icon-button']} id="trainButton" tabIndex="3">
          <div className={classes['menu-icon']}>
            <i className="fas fa-dumbbell"></i>
          </div>
        </div>
      </div>
      <div className={classes.config}>
        <div className={classes.group}>
          <button
            className={`${classes.button} ${
              mode.punctuation ? classes.selected : ''
            }`}
            onClick={toggleType}
          >
            punctuation
          </button>
          <button
            className={`${classes.button} ${
              mode.numbers ? classes.selected : ''
            }`}
            onClick={toggleType}
          >
            numbers
          </button>
        </div>
        <div className={classes.group}>
          <button
            className={`${classes.button} ${
              mode.currMode === TIME ? classes.selected : ''
            }`}
            onClick={toggleMode}
          >
            time
          </button>
          <button
            className={`${classes.button} ${
              mode.currMode === WORDS ? classes.selected : ''
            }`}
            onClick={toggleMode}
          >
            words
          </button>
        </div>
        <div className={classes.group}>{options}</div>
      </div>
    </div>
  );
}

export default Top;
