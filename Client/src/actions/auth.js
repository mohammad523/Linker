/** @format */

import axios from "axios";
import { setAlert } from "./alert";
import { REGISTER_FAIL, REGISTER_SUCCESS } from "./types";

export const register = (userData) => async (dispatch) => {
	const config = {
		headers: {
			"Content-Type": "application/json",
		},
	};
	const body = JSON.stringify(userData);

	try {
		const res = await axios.post("/api/users", body, config);

		console.log(userData);

		dispatch({
			type: REGISTER_SUCCESS,
			payload: res.data,
		});
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
