/** @format */

import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import DashboardActions from "./DashboardActions";
import Experience from "./Experience";
import Education from "./Education";
import { getCurrentProfile, deleteAccount } from "../../actions/profile";
import Payment from "../payment/Payment";
import Spinner from "../layout/Spinner";

const Dashboard = ({
	getCurrentProfile,
	deleteAccount,
	auth: { user },
	profile: { profile },
}) => {
	// this is when a user wants to edit his or her profile
	// the current user's profile is preloaded
	useEffect(() => {
		getCurrentProfile();

		// when getcurrentprofile() is called, this use effect will run
	}, [getCurrentProfile]);

	let userPaymentStatus = user ? user.paid : <Spinner />;

	return (
		<div className='page center-text'>
			<h1>
				Welcome to your Dashboard,
				{user && user.firstName}
			</h1>
			<br />
			{userPaymentStatus ? (
				<></>
			) : (
				<Payment userPaymentStatus={userPaymentStatus} />
			)}

			{profile !== null ? (
				<>
					<DashboardActions />
				</>
			) : (
				<>
					<p>You have not created a profile. Please add some info</p>
					<Link to='/create-profile' className='btn'>
						Create Profile
					</Link>
				</>
			)}
		</div>
	);
};

Dashboard.propTypes = {
	getCurrentProfile: PropTypes.func.isRequired,
	deleteAccount: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
	Dashboard
);
