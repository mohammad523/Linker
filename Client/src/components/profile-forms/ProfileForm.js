/** @format */

import { React, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Alert from "../layout/Alert";
import { createProfile, getCurrentProfile } from "../../actions/profile";

const initialState = {
	headline: "",
	website: "",
	company: "",
	status: "",
	skills: "",
	githubusername: "",
	youtube: "",
	twitter: "",
	facebook: "",
	instagram: "",
};
const ProfileForm = ({
	profile: { profile, loading },
	createProfile,
	getCurrentProfile,
}) => {
	const [formData, setFormData] = useState(initialState);
	const [displaySocialInputs, setDisplaySocialInputs] = useState(false);

	useEffect(() => {
		// if there is no profile, attempt to fetch one
		if (!profile) getCurrentProfile();

		// if we finished loading and we do have a profile
		// then build our profileData
		if (!loading && profile) {
			const profileData = { ...initialState };
			for (const key in profile) {
				if (key in profileData) profileData[key] = profile[key];
			}
			for (const key in profile.social) {
				if (key in profileData) profileData[key] = profile.social[key];
			}
			// the skills may be an array from our API response
			if (Array.isArray(profileData.skills))
				profileData.skills = profileData.skills.join(", ");
			// set local state with the profileData
			setFormData(profileData);
		}
	}, [loading, getCurrentProfile, profile]);

	const {
		headline,
		website,
		company,
		status,
		skills,
		githubusername,
		youtube,
		twitter,
		facebook,
		instagram,
	} = formData;

	const onChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const onSubmit = (e) => {
		e.preventDefault();

		createProfile(formData);
	};
	return (
		<div className='page'>
			<form className='register-form' action='' onSubmit={(e) => onSubmit(e)}>
				<h1>Create your profile</h1>
				<small>* = required field</small>
				<input
					className='input-wide'
					type='text'
					placeholder='Headline'
					name='headline'
					value={headline}
					onChange={(e) => onChange(e)}
					// required
				/>
				<small>This will be under your name</small>
				<input
					className='input-wide'
					type='text'
					placeholder=' Personal website'
					name='website'
					value={website}
					onChange={(e) => onChange(e)}
					// required
				/>
				<input
					className='input-wide'
					type='text'
					placeholder='Company'
					name='company'
					value={company}
					onChange={(e) => onChange(e)}
					// required
				/>
				<input
					className='input-wide'
					type='text'
					placeholder='Status'
					name='status'
					value={status}
					onChange={(e) => onChange(e)}
					// required
				/>
				<input
					className='input-wide'
					type='text'
					placeholder='Skills *'
					name='skills'
					value={skills}
					onChange={(e) => onChange(e)}
					// required
				/>
				<small>Please separate your skills with a comma:</small>
				<small>"JavaScript, Python, Management"</small>
				<Link
					className='btn'
					onClick={() => setDisplaySocialInputs(!displaySocialInputs)}
				>
					Social Links
				</Link>

				{displaySocialInputs ? (
					<>
						<input
							className='input-wide'
							type='text'
							placeholder='Github Username'
							name='githubusername'
							value={githubusername}
							onChange={(e) => onChange(e)}
							// required
						/>
						<input
							className='input-wide'
							type='text'
							placeholder='Youtube'
							name='youtube'
							value={youtube}
							onChange={(e) => onChange(e)}
						/>

						<input
							className='input-wide'
							type='text'
							placeholder='Twitter'
							name='twitter'
							value={twitter}
							onChange={(e) => onChange(e)}
						/>

						<input
							className='input-wide'
							type='text'
							placeholder='Facebook'
							name='facebook'
							value={facebook}
							onChange={(e) => onChange(e)}
						/>

						<input
							className='input-wide'
							type='text'
							placeholder='Instagram'
							name='instagram'
							value={instagram}
							onChange={(e) => onChange(e)}
						/>
					</>
				) : (
					""
				)}

				<input type='submit' className='btn-wide ' value='Create Profile' />
				<Alert />
			</form>
		</div>
	);
};

ProfileForm.propTypes = {
	createProfile: PropTypes.func.isRequired,
	getCurrentProfile: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	profile: state.profile,
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
	ProfileForm
);
