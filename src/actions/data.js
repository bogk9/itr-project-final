import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    SET_REGISTER_MESSAGE,
    SET_LOGIN_MESSAGE,
  } from "./types";
  
  import { AuthService } from "../services/auth.service";
import { DataService } from "../services/data.service";


  export const fetchItems = (collection_id, type) => (dispatch) => {
    return DataService.fetchItems(collection_id, type)
    .then(response => {
        dispatch({type: "FETCH_ITEMS_SUCCESS", payload: response});
        return Promise.resolve("success");
    })
    .catch(err => {
      dispatch({type: "FETCH_FAILED", payload: err})
      return Promise.reject(err);
    })
  }
  
  export const fetchCollections = (user_id, header) => (dispatch) => {
    return DataService.fetchCollections(user_id, header)
    .then(response => {
        dispatch({type: "FETCH_COLLECTIONS_SUCCESS", payload: response})
        return Promise.resolve("");
    })
    .catch(err => {
        dispatch({type: "FETCH_FAILED", payload: err})
        return Promise.reject(err);
    })


/*
    return AuthService.register(username, email, password, file).then(
      (response) => {
        dispatch({
          type: REGISTER_SUCCESS,
        });
        dispatch({
          type: SET_REGISTER_MESSAGE,
          payload: response.data.message,
        });
        return Promise.resolve();
      },
      (error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        dispatch({
          type: REGISTER_FAIL,
        });
        dispatch({
          type: SET_REGISTER_MESSAGE,
          payload: message,
        });
        return Promise.reject();
      }
    );
    */
  };
  
  export const login = (username, password) => (dispatch) => {
    return AuthService.login(username, password).then(
      (data) => {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: { user: data },
        });
        return Promise.resolve();
      },
      (error) => {
        console.log("ERROR:::" + error);
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        dispatch({
          type: LOGIN_FAIL,
        });
        dispatch({
          type: SET_LOGIN_MESSAGE,
          payload: message,
        });
        return Promise.reject();
      }
    );
  };
  
  export const logout = () => (dispatch) => {
    AuthService.logout();
    dispatch({
      type: LOGOUT,
    });
  };
  