/** @format */

import React, { useEffect } from "react";
import axios from "axios";

const GoogleSignInButton = () => {
	const BACKEND_URL = "http://localhost:5000";

	function handleGoogleSignIn() {
		window.open(`${BACKEND_URL}/api/auth/google/callback`, "_self");
	}

	return (
		<button className='btn-wide' onClick={handleGoogleSignIn}>
			Sign In With Google
		</button>
	);
};

export default GoogleSignInButton;
