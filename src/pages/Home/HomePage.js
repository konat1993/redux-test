import React from "react";
import { useSnackbar } from "notistack";
import { useHistory } from "react-router";

import { connect } from "react-redux";
import {
  fetchUsers,
  resetUsers,
  resetVanish
} from "../../store/users/usersDuck";
import { addMessage } from "../../store/messages/messagesDuck";

import { Message } from "../../components/Message";
import { Button } from "../../components/Button";

import classes from "./styles.module.scss";

export const HomePage = (props) => {
  const { isLoading, hasError, isReset, messages } = props;
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();

  const onClickLoad = () => {
    props.fetchUsers(5);
    props.addMessageLabel({ type: "info", message: "Loading Users" });
  };
  const onClickReset = () => {
    props.resetUsers();
    props.addMessageLabel({
      type: "error",
      message: "Users have been reset :)"
    });
    setTimeout(() => {
      props.resetVanish();
    }, 1500);
  };

  const onClickAdd = () => {
    props.fetchUsers(1, "add");
    props.addMessageLabel({
      type: "warning",
      message: "Adding one more user."
    });
  };

  const handleClick = (message, type) => {
    setTimeout(() => {
      enqueueSnackbar(message, { variant: type });
    }, 500);
    history.push("/users");
  };

  return (
    <>
      <div className={classes.homeWrapper}>
        {isLoading && (
          <Message
            handleClick={handleClick}
            msg={messages[0].message}
            type={messages[0].type}
          />
        )}
        {hasError && (
          <p className={classes.errorBackdrop}>
            <span>
              <span>ERROR ! ! !</span>
              <span>Reload page and try again</span>
            </span>
          </p>
        )}
        {isReset && (
          <Message
            handleClick={handleClick}
            msg={messages[0].message}
            type={messages[0].type}
          />
        )}
        <div className={classes.buttonWrapper}>
          <p>Click here to reload users:</p>
          <Button
            name="load"
            variant="contained"
            color="info"
            onClick={onClickLoad}
          >
            Reload users
          </Button>
        </div>
        <div className={classes.buttonWrapper}>
          <p>Click here to add next user:</p>
          <Button
            name="add"
            variant="contained"
            color="warning"
            onClick={onClickAdd}
          >
            Add
          </Button>
        </div>
        <div className={classes.buttonWrapper}>
          <p>Click here to reset users:</p>
          <Button
            name="reset"
            variant="contained"
            color="error"
            onClick={onClickReset}
          >
            Reset
          </Button>
        </div>
      </div>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    users: state.users.users,
    isLoading: state.users.isLoading,
    hasError: state.users.hasError,
    isReset: state.users.isReset,

    messages: state.messages.messages
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUsers: (resultsUsers, type) =>
      dispatch(fetchUsers(resultsUsers, type)),
    resetUsers: () => dispatch(resetUsers()),
    resetVanish: () => dispatch(resetVanish()),

    addMessageLabel: (msg) => dispatch(addMessage(msg))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
