import React, { useEffect } from "react";

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import classes from "./styles.module.scss"
export const Message = (props) => {
  const { msg, type, handleClick, ...otherProps } = props;
  useEffect(() => {
    return () => {
      handleClick(msg, type);
    };
  }, []);

  return (
    <div className={classes.root}>
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={true}
    >
      <CircularProgress color="inherit" />
  </Backdrop>
  </div>
  );
};

export default Message;
