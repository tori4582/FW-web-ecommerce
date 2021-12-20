import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import rootReducers from "./reducers";

const composeEnhancers = typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;
const configureStore = () => {
    const middleware = [
        thunk
    ];
    const enhancer = composeEnhancers(
        applyMiddleware(...middleware)
        // other store enhancers if any
    );
    const store = createStore(rootReducers, enhancer);
    return store;
};

export default configureStore;
