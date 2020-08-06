import { combineReducers } from "redux";

import postsReducer from "./postsReducer";
import errorReducer from "./errorReducer";
import authReducer from "./authReducer";

const rootReducer = combineReducers({
  posts: postsReducer,
  error: errorReducer,
  auth: authReducer,
});

export default rootReducer;
