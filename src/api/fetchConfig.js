const URL = "https://api.airtable.com/v0/appDzJ8xYJ64Jhphk/addUserForm";

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
  const response = await fetch(URL, requestConfig(data));
  const responseData = await response.json();

  return {
    response,
    responseData
  };
};
