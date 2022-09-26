import api from "../../api";
import {
  ADD_USER,
  GET_USERS,
  MODIFY_USER,
  REMOVE_USER,
  SET_PAGE,
  SET_SIZE,
  SET_USERS_LOADING,
} from "../types";

export const getUsersList = () => async (dispatch, getState) => {
  dispatch({
    type: SET_USERS_LOADING,
    payload: true,
  });
  try {
    const page = getState().users.page;
    const size = getState().users.size;
    const { data } = await api.getUsersList(page, size);
    dispatch({
      type: GET_USERS,
      payload: data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const removeUser = (uid) => async (dispatch) => {
  dispatch({
    type: SET_USERS_LOADING,
    payload: true,
  });
  try {
    const { data } = await api.removeUser(uid);
    dispatch({
      type: REMOVE_USER,
      payload: data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const modifyUser = (user) => async (dispatch) => {
  return new Promise((resolve, reject) => {
    api
      .modifyUser(user)
      .then(({ data }) => {
        if (data) {
          dispatch({
            type: MODIFY_USER,
            payload: user,
          });
          resolve(data);
        }
      })
      .catch((err) => {
        console.log(err);
        reject(err.response?.data);
      });
  });
};

export const addUser = (user) => async (dispatch) => {
  return new Promise((resolve, reject) => {
    api
      .addUser(user)
      .then((data) => {
        if (data.data) {
          dispatch({
            type: ADD_USER,
            payload: data.data.user,
          });
          resolve(data.data);
        }
      })
      .catch((err) => {
        reject(err.response?.data);
      });
  });
};

export const setPage = (pageNo) => (dispatch) => {
  dispatch({
    type: SET_PAGE,
    payload: pageNo + 1,
  });
};

export const setSize = (pageSize) => (dispatch) => {
  dispatch({
    type: SET_SIZE,
    payload: pageSize,
  });
};
