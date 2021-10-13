export const FETCH_USER_REQUESTED = "FETCH_USER_REQUESTED";
export const FETCH_USER_SUCCEDED = "FETCH_USER_SUCCEDED";
export const FETCH_USER_FAILED = "FETCH_USER_FAILED";
export const RESET_USERS = "RESET_USERS";
export const ADD_NEXT_USER = "ADD_NEXT_USER";
export const RESET_USERS_VANISH = "RESET_USERS_VANISH";

export const fetchRequested = () => ({
  type: FETCH_USER_REQUESTED
});
export const fetchSucceded = (data) => ({
  type: FETCH_USER_SUCCEDED,
  payload: data
});
export const fetchFailed = () => ({
  type: FETCH_USER_FAILED
});
export const resetUsers = () => ({
  type: RESET_USERS
});
export const addNextUser = (data) => ({
  type: ADD_NEXT_USER,
  payload: data
});

export const resetVanish = () => ({
  type: RESET_USERS_VANISH
});

const initialState = {
  users: [],
  isLoading: false,
  hasError: false,
  isReset: false
};

export const fetchUsers = (resultsUsers = 3, type) => {
  return function (dispatch) {
    dispatch(fetchRequested());
    fetch(`https://randomuser.me/api/?results=${resultsUsers}`)
      .then((response) => response.json())
      .then((data) => {
        if (type === "add") {
          dispatch(addNextUser(data.results));
        } else {
          dispatch(fetchSucceded(data.results));
        }
      })
      .catch((error) => {
        dispatch(fetchFailed());
      });
  };
};

export const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_REQUESTED:
      return {
        ...state,
        isLoading: true,
        hasError: false
      };
    case FETCH_USER_SUCCEDED:
      return {
        ...state,
        isLoading: false,
        hasError: false,
        users: action.payload
      };
    case FETCH_USER_FAILED:
      return {
        ...state,
        isLoading: false,
        hasError: true
      };
    case RESET_USERS:
      return {
        ...state,
        users: [],
        isReset: true
      };
    case RESET_USERS_VANISH:
      return {
        ...state,
        isReset: false
      };
    case ADD_NEXT_USER:
      return {
        ...state,
        users: [...action.payload, ...state.users],
        isLoading: false,
        hasError: false
      };
    default:
      return state;
  }
};

export default usersReducer;
