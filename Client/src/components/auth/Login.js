/** @format */

import { React, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

const Login = (props) => {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	const { email, password } = formData;

	const onChange = (e) => {
		// console.log("event.target.name", e.target.name);
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const onSubmit = (e) => {
		e.preventDefault();

		try {
			async function res(data) {
				await axios.post(`/api/users`, data);
			}
			res();

			console.log(res);
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<div className='login'>
			<form className='login-form' action='' onSubmit={(e) => onSubmit(e)}>
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
			</form>
		</div>
	);
};

export default Login;
