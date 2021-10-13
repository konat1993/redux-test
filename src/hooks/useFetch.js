import React from "react";

export const useFetch = (fn, deps) => {
  const [value, setValue] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [status, setStatus] = React.useState(false);

  const runAsyncFn = React.useCallback(async (data) => {
    setLoading(true);

    try {
      const { responseData, response } = await fn(data);
      if (response.ok) {
        setValue(responseData);
        setStatus({ message: "Data have been sent!", type: "info" });
      } else {
        throw new Error("Something went wrong :(");
      }
    } catch (error) {
      setStatus({
        message: `ERROR OCCURRED: ${error.message}`,
        type: "danger"
      });
    } finally {
      setLoading(false);
      setTimeout(() => {
        setStatus(false);
      }, 2000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return [
    {
      value,
      loading,
      status
    },
    runAsyncFn
  ];
};
