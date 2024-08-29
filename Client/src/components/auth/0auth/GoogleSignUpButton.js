/** @format */

import React from "react";
import { Link, Navigate } from "react-router-dom";
import { googleRegister } from "../../../actions/auth";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import axios from "axios";

const GoogleSignUpButton = ({ googleRegister, isAuthenticated }) => {
	// const BACKEND_URL = "http://localhost:5000";

	// const googleAuth = () => {
	// 	window.open(`${BACKEND_URL}/api/auth/google/callback`, "_self");
	// };

	if (isAuthenticated) {
		return <Navigate to='/dashboard' />;
	}
	return (
		<button className='btn-wide' onClick={googleRegister}>
			Sign Up with Google
		</button>
	);
};

GoogleSignUpButton.propTypes = {
	googleRegister: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { googleRegister })(GoogleSignUpButton);
