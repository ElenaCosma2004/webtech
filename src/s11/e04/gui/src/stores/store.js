import { createStore, applyMiddleware } from "redux";
import reducer from "../reducers";
import promise from "redux-promise-middleware";
import thunk from "redux-thunk";
import rootReducer from "../reducers";
const store = createStore(rootReducer, applyMiddleware(promise, thunk));

export default store;
