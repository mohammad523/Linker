/** @format */
import { Link } from "react-router-dom";
import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logout } from "../../actions/auth";
import axios from "axios";

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
	const authLinks = (
		<ul className='nav-links'>
			<li>
				<Link to='/members'>👥</Link>
			</li>
			<li>
				<Link to='/posts'>Posts</Link>
			</li>
			<li>
				<Link to='/dashboard'>
					<span className='hide-sm'>Dashboard</span>
				</Link>
			</li>
			<li onClick={logout}>
				<Link to='/login'>
					<span className='hide-sm'>🚪</span>
				</Link>
			</li>
		</ul>
	);

	const guestLinks = (
		<ul className='nav-links'>
			<li>
				<Link to='/Members'>Members</Link>
			</li>
			<li>
				<Link to='/Register'>Register</Link>
			</li>
			<li>
				<Link to='/login'>Login</Link>
			</li>
		</ul>
	);

	return (
		<nav className='navbar'>
			<h1>
				<Link to='/login'>
					<i className='fas fa-code' /> muz-link
				</Link>
			</h1>
			<>{isAuthenticated ? authLinks : guestLinks}</>
		</nav>
	);
};

Navbar.propTypes = {
	logout: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
