import React from "react";
import classNames from "classnames";

import classes from "./styles.module.scss";

const typographyClasses = (props) => {
  return classNames(classes.root, {
    [classes.h1]: props.variant === "h1",
    [classes.h3]: props.variant === "h3",
    [classes.button]: props.variant === "button"
  });
};

export const Typography = (props) => {
  const { children } = props;

  return <span className={typographyClasses(props)}>{children}</span>;
};

export default Typography;
