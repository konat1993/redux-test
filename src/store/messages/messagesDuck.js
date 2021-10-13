export const ADD_MESSAGE = "ADD_MESSAGE";

export const addMessage = (data) => {
  return {
    type: ADD_MESSAGE,
    payload: data
  };
};

const initialState = {
  messages: []
};

export const messageReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_MESSAGE:
      return {
        ...state,
        messages: [action.payload]
      };
    default:
      return state;
  }
};

export default messageReducer;
