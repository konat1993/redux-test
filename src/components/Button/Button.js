import React from "react";
import classNames from "classnames";

import { Typography } from "../Typography";

import classes from "./styles.module.scss";

const btnClasses = (props) => {
  return classNames(classes.root, {
    [classes.contained]: props.variant === "contained",
    [classes.text]: props.variant === "text",
    [classes.primary]: props.color === "primary",
    [classes.secondary]: props.color === "secondary",
    [classes.info]: props.color === "info",
    [classes.warning]: props.color === "warning",
    [classes.error ]: props.color === "error"
  });
};

export const Button = (props) => {
  const { children, ...otherProps } = props;
  return (
    <div>
      <button className={btnClasses(props)} {...otherProps}>
        <Typography variant="button">{children}</Typography>
      </button>
    </div>
  );
};

export default Button;
