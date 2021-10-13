import React from "react";
import { connect } from "react-redux";

import classes from "./styles.module.scss";

export const UsersPage = (props) => {
  const { users } = props;
  return (
    <div className={classes.usersPageWrapper}>
      <h1>USERS:</h1>
      <div className={classes.usersContainer}>
        {users.length === 0 ? (
          <h3>Currently there are no users.</h3>
        ) : (
          users.map((user, id) => {
            return (
              <div
                key={id}
                className={`${classes.user} ${classes.user}${
                  id % 2 === 0 ? "Odd" : "Even"
                }`}
              >
                <div>
                  <span>{id + 1}.</span>
                  <span>{user.name.first}</span>
                </div>
                <img src={user.picture.thumbnail} alt="avatar"></img>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    users: state.users.users,
    isLoading: state.users.isLoading,
    hasError: state.users.hasError
  };
};

export default connect(mapStateToProps)(UsersPage);
