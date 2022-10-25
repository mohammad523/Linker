/** @format */

import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const Alert = ({ alerts }) => {
	const mapAlerts = alerts.map((alert) => {
		return (
			<div key={alert.id} className={`alert alert-${alert.alertType}`}>
				{alert.msg}
			</div>
		);
	});

	return <div className='alert-wrapper'>{mapAlerts}</div>;
};

Alert.propTypes = {
	alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
	alerts: state.alert,
});

export default connect(mapStateToProps)(Alert);
