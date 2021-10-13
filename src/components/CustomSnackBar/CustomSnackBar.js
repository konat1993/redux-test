/* import React, { useEffect } from "react";

import CheckIcon from "@material-ui/icons/Check";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

import classNames from "classnames";
import classes from "./styles.module.scss";

const snackBarClasses = (props, type) => {
  return classNames(classes.root, {
    [classes.info]: type === "info",
    [classes.warning]: type === "warning",
    [classes.danger]: type === "danger"
  });
};

export const CustomSnackBar = (props) => {
  const { onCloseClick, autoHideDuration, msg, type, ...otherProps } = props;
  setTimeout(() => {
    onCloseClick();
  }, autoHideDuration);
  useEffect(() => {
    console.log("effect");
  });
  const test = ["one", "two"];
  return (
    <>
      {test &&
        test.map((el) => {
          console.log(el);
          return <div>{el}</div>;
        })}
      <div className={snackBarClasses(props, type)} {...otherProps}>
        <CheckIcon />
        <p>{msg}</p>
        <HighlightOffIcon
          className={classes.deleteIcon}
          onClick={onCloseClick}
        />
      </div>
      }
    </>
  );
};

export default CustomSnackBar; */

import { useSnackbar } from "notistack";

export const CustomSnackBar = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const handleClick = () => {
    enqueueSnackbar("I love hooks");
  };

  return <Button onClick={handleClick}>Show snackbar</Button>;
};

export default CustomSnackBar;
