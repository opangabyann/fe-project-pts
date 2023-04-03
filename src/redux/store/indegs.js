import {
    combineReducers,
    legacy_createStore as createStore,
    compose,
    applyMiddleware,
  } from "redux";
//   import { reducer } from "../reducers/countReducers";
//   import { colorReducer } from "../reducers/colorReducers";
//   import { logger,tes } from "../middleware/logger";
//   import { authProses } from "../reducers/authReducers";
  import thunk from "redux-thunk"
import { authProses } from "../reducer/authreducer";
  
  const allReducers = combineReducers({
    // count: reducer,
    // color: colorReducer,
    authProses : authProses,
  });
  
  const composeEnhancers =
    (typeof window !== "undefined" &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose;
  
  export const store = createStore(
    allReducers,
    composeEnhancers(applyMiddleware(thunk))
  );
  
  //   export const store = createStore(
  //     allReducers,
  //     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  //   );