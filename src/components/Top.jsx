import classes from "./top.module.css";

function Top() {
  return (
    <div className={classes.top}>
      <div className={classes.logo}>
        <div className={classes.icon}>mb</div>
        <div className={classes.text}>monkeybr</div>
      </div>
      <div className={classes.menu}>
        <div
          className={classes["icon-button"]}
          id="startTestButton"
          tabIndex="2"
        >
          <div className={classes["menu-icon"]}>
            <i className="fas fa-keyboard"></i>
          </div>
        </div>
        <div className={classes["icon-button"]} id="trainButton" tabIndex="3">
          <div className={classes["menu-icon"]}>
            <i className="fas fa-dumbbell"></i>
          </div>
        </div>
      </div>
      <div className={classes.config}>
        <div className={classes.group}>
          <button className={classes.button}>punctuation</button>
          <button className={classes.button}>numbers</button>
        </div>
        <div className={classes.group}>
          <button className={classes.button}>time</button>
          <button className={classes.button}>words</button>
        </div>
      </div>
    </div>
  );
}

export default Top;
