/** @format */

import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Register.css";
// Latest version - v3.0.0 with Tree Shaking to reduce bundle size
import { Country, State, City } from "country-city-state";

const Register = () => {
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		phoneNumber: "",
		password: "",
		password2: "",
		linkedIn: "",
		location: "",
		bio: "",
	});

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
		location,
		bio,
	} = formData;

	const { jobSeeking, hiring, justNetworking, meetMe } = checkboxes;

	// Forms on change
	const onChange = (e) => {
		// console.log("event.target.name", e.target.name);
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	// Checkboxes on change

	const onChckChange = (e) => {
		setCheckboxes({ ...checkboxes, [e.target.name]: e.target.checked });

		setFormData({ ...formData, ...checkboxes });
	};

	// Phone number client side rendering

	// Backend password encryption

	// Backend Error checking

	const onSubmit = (e) => {
		e.preventDefault();

		if (password !== password2) {
			alert("Passwords do not match");
			return;
		}
		let obj = { ...formData, ...checkboxes };

		console.log(obj);

		// Axios post request try catch

		try {
			async function res(data) {
				await axios.post(`/api/users`, data);
			}
			res(obj);

			console.log(res);
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<>
			<h1>Register for Linker</h1>
			<form className='register-form' action='' onSubmit={(e) => onSubmit(e)}>
				<input
					className='input-wide'
					type='text'
					placeholder='First Name'
					name='firstName'
					value={firstName}
					onChange={(e) => onChange(e)}
					required
				/>
				<input
					className='input-wide'
					type='text'
					placeholder='Last Name'
					name='lastName'
					value={lastName}
					onChange={(e) => onChange(e)}
					required
				/>
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
					type='text'
					placeholder='Phone Number'
					name='phoneNumber'
					value={phoneNumber}
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
				<input
					className='input-wide'
					type='password'
					placeholder='Confirm Password'
					name='password2'
					value={password2}
					onChange={(e) => onChange(e)}
					required
				/>
				<input
					className='input-wide'
					type='text'
					placeholder='LinkedIn Profile'
					name='linkedIn'
					value={linkedIn}
					onChange={(e) => onChange(e)}
				/>
				<input
					className='input-wide'
					type='text'
					placeholder='Location: City, State'
					name='location'
					value={location}
					onChange={(e) => onChange(e)}
				/>
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
				</div>{" "}
				<input
					style={{ width: "90%" }}
					type='submit'
					className='btn-wide '
					value='Register'
				/>
			</form>
		</>
	);
};

export default Register;
