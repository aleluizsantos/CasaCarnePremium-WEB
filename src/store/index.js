import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import rootReduce from "./Reduces";

const store = createStore(rootReduce, applyMiddleware(thunk));

// const store = createStore(
//   rootReduce,
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// );

// const store = createStore(
//   rootReduce,
//   composeWithDevTools(applyMiddleware(...middleware))
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(applyMiddleware(...middleware))
// );

export default store;
