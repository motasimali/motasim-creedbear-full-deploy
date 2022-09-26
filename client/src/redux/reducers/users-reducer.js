import {
  ADD_USER,
  GET_USERS,
  MODIFY_USER,
  REMOVE_USER,
  SET_PAGE,
  SET_SIZE,
  SET_USERS_LOADING,
} from "../types";

const initialState = {
  list: [],
  loading: true,
  page: 1,
  size: 5,
  total: 0,
  total_pages: 0,
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PAGE:
      return {
        ...state,
        loading: true,
        page: action.payload,
      };
    case SET_SIZE:
      return {
        ...state,
        loading: true,
        size: action.payload,
      };
    case SET_USERS_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case GET_USERS:
      return {
        ...state,
        loading: false,
        list: action.payload.data,
        page: Number(action.payload.page),
        size: Number(action.payload.per_page),
        total: Number(action.payload.total),
        total_pages: Number(action.payload.total_pages),
      };
    case ADD_USER:
      return {
        ...state,
        list: [
          {
            ...action.payload,
          },
          ...state.list,
        ],
        loading: true,
      };
    case REMOVE_USER:
      return {
        ...state,
        list: [
          ...state.list.slice().filter((user) => user.id !== action.payload),
        ],
      };
    case MODIFY_USER:
      return {
        ...state,
        list: [
          ...state.list.map((user) =>
            user.id === action.payload.id ? action.payload : user
          ),
        ],
      };
    default:
      return state;
  }
};
export default usersReducer;
