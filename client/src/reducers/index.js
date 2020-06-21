import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import modplanReducer from "./modplanReducer";

export default combineReducers ({
    auth: authReducer,
    errors: errorReducer,
    modplan: modplanReducer
});
