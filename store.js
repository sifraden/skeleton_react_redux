import { createStore, combineReducers, applyMiddleware} from "redux";
import popupReducer from "./reducers/popupReducer.js";
import refreshReducer from "./reducers/refreshReducer.js";
import loginReducer from "./reducers/loginReducer.js";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";


export default createStore(combineReducers({popupReducer, refreshReducer, loginReducer}), applyMiddleware(createLogger(), thunk));