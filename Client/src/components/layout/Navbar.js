/** @format */
import { Link } from "react-router-dom";
import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logout } from "../../actions/auth";

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
	const authLinks = (
		<ul className='nav-links'>
			<li>
				<Link to='/members'>Members</Link>
			</li>
			<li>
				<Link to='/posts'>Posts</Link>
			</li>
			<li>
				<Link to='/dashboard'>
					<i className='fas fa-user' />{" "}
					<span className='hide-sm'>Dashboard</span>
				</Link>
			</li>
			<li>
				<a onClick={logout} href='#!'>
					<span className='hide-sm'>Logout</span>
				</a>
			</li>
		</ul>
	);

	const guestLinks = (
		<ul className='nav-links'>
			<li>
				<Link to='/Members'>Members</Link>
			</li>
			<li>
				<Link to='/'>Register</Link>
			</li>
			<li>
				<Link to='/Login'>Login</Link>
			</li>
		</ul>
	);

	return (
		<nav className='navbar'>
			<h1>
				<Link to='/'>
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
