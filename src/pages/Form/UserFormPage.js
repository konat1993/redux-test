import React from "react";
import { useSnackbar } from "notistack";

import { useForm } from "react-hook-form";
import { useFetch } from "../../hooks/useFetch";
import { postUser } from "../../api/fetchConfig";

import { Message } from "../../components/Message";

import classes from "./styles.module.scss";

export const errorLabel = (errors, tag) => {
  return errors[tag] && <span>{errors[tag].message}</span>;
};

export const UserFormPage = () => {
  const [state, postFetch] = useFetch(postUser, []);
  const { enqueueSnackbar } = useSnackbar();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  const onSubmit = (data) => {
    postFetch(data);
    reset();
    return null;
  };

  const handleClick = (message, type) => {
    enqueueSnackbar(message, { variant: type });
  };
  return (
    <>
      {state.status && (
        <Message
          handleClick={handleClick}
          msg={state.status.message}
          type={state.status.type}
        />
      )}

      {state.loading && (
        <Message
          handleClick={handleClick}
          msg={"Fetching..."}
          type={"warning"}
        />
      )}

      <div className={classes.formWrapper}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h3>Contact form</h3>
          <div>
            <input
              className={errors.name && classes.error}
              type="text"
              {...register("name", {
                required: {
                  value: true,
                  message: "Required field!"
                }
              })}
              placeholder="Name"
            />
            {errorLabel(errors, "name")}
          </div>
          <div>
            <input
              className={errors.email && classes.error}
              type="email"
              {...register("email", {
                required: {
                  value: true,
                  message: "Required field!"
                }
              })}
              placeholder="Email"
            />
            {errorLabel(errors, "email")}
          </div>
          <div>
            <textarea
              className={errors.content && classes.error}
              type="textarea"
              {...register("content", {
                required: {
                  value: true,
                  message: "Required field!"
                }
              })}
              placeholder="Content"
            />
            {errorLabel(errors, "content")}
          </div>
          <div>
            <input type="submit" value="SEND" />
          </div>
        </form>
      </div>
    </>
  );
};

export default UserFormPage;
