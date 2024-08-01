/** @format */

import { React, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { Link, Navigate, redirect } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../../actions/auth";
import GoogleSignInButton from "./0auth/GoogleSignInButton";

const Login = ({ login, isAuthenticated }) => {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	const { email, password } = formData;

	const onChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const onSubmit = (e) => {
		e.preventDefault();

		login(email, password);
	};

	if (isAuthenticated) {
		return <Navigate to='/dashboard' />;
	}

	return (
		<div className='login'>
			<form className='login-form' action='' onSubmit={onSubmit}>
				<h1>Login</h1>
				<input
					className='input-wide'
					type='text'
					placeholder='Email'
					name='email'
					value={email}
					onChange={(e) => onChange(e)}
					required
				/>
				<input
					className='input-wide'
					type='password'
					placeholder='Password'
					name='password'
					value={password}
					onChange={(e) => onChange(e)}
					required
				/>
				<input type='submit' className='btn-wide ' value='Login' />
				<p>
					Don't have have an account?{"  "}
					<Link className='blue-link' to='/Register'>
						Sign Up
					</Link>
				</p>
			</form>
			<GoogleSignInButton />
		</div>
	);
};

Login.propTypes = {
	login: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
