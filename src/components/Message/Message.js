import React, { useEffect } from "react";
import classNames from "classnames";

import { Typography } from "../Typography";

import classes from "./styles.module.scss";

const msgClasses = (type) => {
  return classNames(classes.rootChildWrapper, {
    [classes.info]: type === "info",
    [classes.warning]: type === "warning",
    [classes.error]: type === "error"
  });
};

export const Message = (props) => {
  const { msg, type, handleClick, ...otherProps } = props;
  useEffect(() => {
    return () => {
      handleClick(msg, type);
    };
  }, []);

  return (
    <div className={classes.root} {...otherProps}>
      <div className={msgClasses(type)}>
        <Typography variant="h3">{msg}</Typography>
      </div>
    </div>
  );
};

export default Message;
