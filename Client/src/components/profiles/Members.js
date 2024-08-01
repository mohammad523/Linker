/** @format */

import React, { useEffect } from "react";
import { connect } from "react-redux";
import MemberItem from "./MemberItem";
import { getProfiles } from "../../actions/profile";
import PropTypes from "prop-types";

const Members = ({ getProfiles, profile: { profiles, loading } }) => {
	useEffect(() => {
		getProfiles();
	}, [getProfiles]);

	return (
		<div className='page'>
			{loading ? (
				<>
					<h1>Loading...</h1>
				</>
			) : (
				<>
					<h1>Members</h1>

					<div className='members'>
						{profiles.length > 0 ? (
							profiles.map((profileItem) => (
								<MemberItem
									key={profileItem._id ? profileItem._id : "0"}
									profile={profileItem}
								/>
							))
						) : (
							<h2>No profiles found...</h2>
						)}
					</div>
				</>
			)}
		</div>
	);
};

Members.propTypes = {
	getProfiles: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	profile: state.profile,
});

export default connect(mapStateToProps, { getProfiles })(Members);
