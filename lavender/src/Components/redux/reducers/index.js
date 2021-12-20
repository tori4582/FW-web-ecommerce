import { combineReducers } from "redux";
import loginReducer from "./login";
import registerReducer from "./register";
import cartReducer from "./cart";

const rootReducer = combineReducers({
    login: loginReducer,
    register: registerReducer,
    cart: cartReducer
});

export default rootReducer;