/** @format */
import { Link } from "react-router-dom";
import React from "react";

const Navbar = () => {
	const authLinks = (
		<ul>
			<li>
				<Link to='/profiles'>Members</Link>
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
				<a onClick={null} href='#!'>
					<i className='fas fa-sign-out-alt' />{" "}
					<span className='hide-sm'></span>
				</a>
			</li>
		</ul>
	);

	const guestLinks = (
		<ul className='nav-links'>
			<li>
				<Link to='/'>Members</Link>
			</li>
			<li>
				<Link to='/'>Register</Link>
			</li>
			<li>
				<Link to='/'>Login</Link>
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
			<>{guestLinks}</>
		</nav>
	);
};
export default Navbar;
