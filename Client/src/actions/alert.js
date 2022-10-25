/** @format */

import { v4 as uuidv4 } from "uuid";
import { REMOVE_ALERT, SET_ALERT } from "./types";

/**
 * uuid?
 *  this is gonna set an id for every 'alert' that we send
 *  we will remove the alert with this unique id that is generated
 *
 * msg?
 *  the message we wanna display in the alert
 *
 * alert type?
 *  what color should the alert be?
 *
 * timeout?
 *  how long do we want the alert to be
 *
 * dispatch?
 *  this is a function of redux store, it will dispatch an action
 *
 * payload?
 *  the information we or message we want to transmit
 *
 * reducer?
 *  JS functions that take in the previous state and an action and return the newly updated state
 *
 *
 */

export const setAlert =
	(msg, alertType, timeout = 5000) =>
	(dispatch) => {
		const id = uuidv4();
		dispatch({
			type: SET_ALERT,
			payload: { msg, alertType, id },
		});

		setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
	};
