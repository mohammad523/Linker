/** @format */

import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const MemberItem = ({
	profile: {
		user: { _id, firstName, lastName, avatar },
		headline,
		status,
		company,
		location,
		skills,
	},
}) => {
	console.log(firstName, avatar);

	console.log("profiles");
	return (
		<div className='member-item'>
			<img src={avatar} alt='' className='avatar-img' />
			<div>
				<h2>
					{firstName} {lastName}
				</h2>
				<p>
					{headline} {company && <> at {company}</>}
				</p>
			</div>
		</div>
	);
};

MemberItem.propTypes = {
	profile: PropTypes.object.isRequired,
};

export default MemberItem;
