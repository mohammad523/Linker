/** @format */

import { compose, applyMiddleware } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import setAuthToken from "./utils/setAuthToken";

const initialState = {};

const middleware = [thunk];

const composedMiddleware = composeWithDevTools(applyMiddleware(...middleware));

const store = configureStore({
	reducer: rootReducer,
	initialState,
	composedMiddleware,
});

/*
  NOTE: set up a store subscription listener
  to store the users token in localStorage
 */

/*
  initialize current state from redux store for subscription comparison
  preventing undefined error
 */

// let currentState = store.getState();

// store.subscribe(() => {
// 	let previousState = currentState;

// 	currentState = store.getState();

// 	if (previousState.auth.token !== currentState.auth.token) {
// 		const token = currentState.auth.token;
// 		setAuthToken(token);
// 	}
// });

export default store;
