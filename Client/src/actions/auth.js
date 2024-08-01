/** @format */

import api from "../utils/api";
import setAuthToken from "../utils/setAuthToken";
import { setAlert } from "./alert";
import {
	REGISTER_FAIL,
	REGISTER_SUCCESS,
	USER_LOADED,
	AUTH_ERROR,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT,
	GET_PROFILE,
} from "./types";

// Load User
export const loadUser = () => async (dispatch) => {
	try {
		const res = await api.get("/auth");

		dispatch({
			type: USER_LOADED,
			payload: res.data,
		});
	} catch (err) {
		dispatch({ type: AUTH_ERROR });
	}
};

export const register = (userData) => async (dispatch) => {
	try {
		const res = await api.post("/users", userData);

		dispatch({
			type: REGISTER_SUCCESS,
			payload: res.data,
		});

		dispatch(loadUser());
	} catch (err) {
		const errors = err.response.data.errors;

		if (errors) {
			errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
		}

		dispatch({
			type: REGISTER_FAIL,
		});
	}
};
export const login = (email, password) => async (dispatch) => {
	const body = {
		email,
		password,
	};
	try {
		const res = await api.post("/auth", body);

		dispatch({
			type: LOGIN_SUCCESS,
			payload: res.data,
		});

		dispatch(loadUser());
	} catch (err) {
		const errors = err.response.data.errors;

		if (errors) {
			errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
		}

		dispatch({
			type: LOGIN_FAIL,
		});
	}
};

// Logout
export const logout = () => ({ type: LOGOUT });

// Google OAuth
export const googleRegister = () => async (dispatch) => {
	try {
		const res = window.open(
			`http://localhost:5000/api/auth/google/callback`,
			"_self"
		);

		console.log(res);

		dispatch({
			type: REGISTER_SUCCESS,
			payload: res.data,
		});

		dispatch(loadUser());
	} catch (err) {
		const errors = err.response.data.errors;

		if (errors) {
			errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
		}

		dispatch({
			type: REGISTER_FAIL,
		});
	}
};
