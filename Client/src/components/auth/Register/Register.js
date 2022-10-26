/** @format */

import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Register.css";
// connect connects the component to redux
import { connect } from "react-redux";
import { setAlert } from "../../../actions/alert";
import { register } from "../../../actions/auth";
import { Country, State, City } from "country-state-city";
import Payment from "./Payment";
import { Link, Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import Alert from "../../layout/Alert";

const Register = ({ setAlert, register, isAuthenticated }) => {
	/**
	 * TO DO FOR REGISITER COMPONENT
	 */

	// Phone number client side rendering

	// Backend password encryption

	// Backend Error checking
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		phoneNumber: "",
		password: "",
		password2: "",
		linkedIn: "",
		bio: "",
		paid: "true",
	});
	const [states, setStates] = useState(State.getStatesOfCountry("US"));
	const [cities, setCities] = useState();
	const [stateInput, setStateInput] = useState("");
	const [cityInput, setCityInput] = useState("");
	const [location, setLocation] = useState("");
	const [checkboxes, setCheckboxes] = useState({
		jobSeeking: false,
		hiring: false,
		justNetworking: false,
		meetMe: false,
	});

	const {
		firstName,
		lastName,
		email,
		phoneNumber,
		password,
		password2,
		linkedIn,
		bio,
	} = formData;

	let stateAndCodeObj = {};

	// Map through states array
	let stateNames = states.map((state, index) => {
		// Create an object with name and iso code key value pair
		stateAndCodeObj = { ...stateAndCodeObj, [state.name]: state.isoCode };
		return (
			<option key={index} value={state.name} statecode={state.isoCode}>
				{state.name}
			</option>
		);
	});

	const handleStateChange = async (e) => {
		await setStateInput(e.target.value);

		const stateCode = stateAndCodeObj[e.target.value];

		setCities(City.getCitiesOfState("US", stateCode));
	};
	const handleCityChange = (e) => {
		setCityInput(e.target.value);
		setLocation(`${e.target.value}, ${stateInput}`);
	};

	let cityNames = cities
		? cities.map((city, index) => {
				return (
					<option key={index} value={city.name}>
						{city.name}
					</option>
				);
		  })
		: "";

	const { jobSeeking, hiring, justNetworking, meetMe } = checkboxes;

	// Forms on change
	const onChange = (e) => {
		// console.log("event.target.name", e.target.name);
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	// Checkboxes on change

	const onChckChange = (e) => {
		setCheckboxes({ ...checkboxes, [e.target.name]: e.target.checked });

		setFormData({
			...formData,
			...checkboxes,
		});
	};

	const onSubmit = (e) => {
		e.preventDefault();

		if (password !== password2) {
			setAlert("Passwords do not match", "danger");
			return;
		}
		let obj = { ...formData, ...checkboxes, location };

		register(obj);
	};

	if (isAuthenticated) {
		return <Navigate to='/Dashboard' />;
	}

	return (
		<>
			<form className='register-form' action='' onSubmit={(e) => onSubmit(e)}>
				<h1>Register</h1>
				<input
					className='input-wide'
					type='text'
					placeholder='First Name'
					name='firstName'
					value={firstName}
					onChange={(e) => onChange(e)}
					// required
				/>
				<input
					className='input-wide'
					type='text'
					placeholder='Last Name'
					name='lastName'
					value={lastName}
					onChange={(e) => onChange(e)}
					// required
				/>
				<input
					className='input-wide'
					type='text'
					placeholder='Email'
					name='email'
					value={email}
					onChange={(e) => onChange(e)}
					// required
				/>
				<input
					className='input-wide'
					type='tel'
					placeholder='Phone Number'
					name='phoneNumber'
					value={phoneNumber}
					onChange={(e) => onChange(e)}
					// required
				/>
				<input
					className='input-wide'
					type='password'
					placeholder='Password'
					name='password'
					value={password}
					onChange={(e) => onChange(e)}
					// required
				/>
				<input
					className='input-wide'
					type='password'
					placeholder='Confirm Password'
					name='password2'
					value={password2}
					onChange={(e) => onChange(e)}
					// required
				/>
				<input
					className='input-wide'
					type='text'
					placeholder='LinkedIn Profile'
					name='linkedIn'
					value={linkedIn}
					onChange={(e) => onChange(e)}
				/>
				<label>State and city</label>
				<div>
					<select
						name='states'
						id='states'
						placeholder='State'
						className='dropdown-input'
						value={stateInput}
						onChange={(e) => handleStateChange(e)}
					>
						{stateNames ? stateNames : ""}
					</select>
					<select
						name='cities'
						placeholder='City'
						className='dropdown-input'
						value={cityInput}
						id='cities'
						onChange={(e) => handleCityChange(e)}
					>
						{cityNames ? cityNames : ""}
					</select>
				</div>
				<textarea
					className='input-wide'
					type='text'
					placeholder='Bio'
					name='bio'
					maxLength='155'
					value={bio}
					onChange={(e) => onChange(e)}
				/>
				<h2>Why are you joining this website?</h2>
				<div className='checkboxes-div'>
					<span>
						<input
							type='checkbox'
							name='jobSeeking'
							value={jobSeeking}
							onChange={(e) => onChckChange(e)}
						/>
						<label htmlFor='jobSeeking'> Job Seeking</label>
					</span>
					<span>
						<input
							type='checkbox'
							name='hiring'
							value={hiring}
							onChange={(e) => onChckChange(e)}
						/>
						<label htmlFor='hiring'> Hiring</label> <br />
					</span>

					<span>
						<input
							type='checkbox'
							name='justNetworking'
							value={justNetworking}
							onChange={(e) => onChckChange(e)}
						/>
						<label htmlFor='justNetworking'> Just Networing</label>
						<br />
					</span>

					<span>
						<input
							type='checkbox'
							name='meetMe'
							value={meetMe}
							onChange={(e) => onChckChange(e)}
						/>
						<label htmlFor='meetMe'> Meet Me</label>
					</span>
				</div>
				<Payment />
				<input type='submit' className='btn-wide ' value='Register' />
				<Alert />
				<p>
					Already have an account?{"  "}
					<Link className='blue-link' to='/login'>
						Sign In
					</Link>
				</p>
			</form>
		</>
	);
};

Register.propTypes = {
	setAlert: PropTypes.func.isRequired,
	register: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, register })(Register);
