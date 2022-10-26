/** @format */

import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const PrivateRoute = ({
	component: Component,
	auth: { isAuthenticated, loading },
}) => {
	if (loading) return <h1>Loading...</h1>;
	if (isAuthenticated) return <Component />;

	return <Navigate to='/login' />;
};

PrivateRoute.propTypes = {
	auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	// below is all the state from the auth reducer
	auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
