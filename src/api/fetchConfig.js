const { REACT_APP_API_URL } = process.env

const userDataStructure = (data) => {
  return {
    records: [
      {
        fields: {
          name: data.name,
          email: data.email,
          content: data.content
        }
      }
    ]
  };
};

const requestConfig = (data) => {
  return {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer keynRLHfDEUHJGpbp"
    },
    body: JSON.stringify(userDataStructure(data))
  };
};

export const postUser = async (data) => {
  const response = await fetch(REACT_APP_API_URL, requestConfig(data));
  const responseData = await response.json();

  return {
    response,
    responseData
  };
};
