import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import auth from "../../reducers/auth";
import logger from "redux-logger";
import message from "../../reducers/message";
import prompt from "../../reducers/prompt";
import data from "../../reducers/data";

const middleware = [thunk];

const reducer = {
  auth,
  message,
  prompt,
  data
};

export default configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
