import { configureStore, combineReducers } from "@reduxjs/toolkit";
import usersReducer from "./redux/reducers/users-reducer";

const combinedReducer = combineReducers({
  users: usersReducer,
});

const rootReducer = (state, action) => {
  //   if (action.type === "app/logout") {
  //     state = undefined;
  //   }
  return combinedReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
});
