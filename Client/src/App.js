/** @format */

import { React, State } from "react";
import "./App.css";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Switch,
	Navigate,
} from "react-router-dom";
import axios from "axios";
import Register from "./components/auth/Register/Register";
import Login from "./components/auth/Login";
import Nav from "./components/layout/Navbar";
import Members from "./components/profiles/Members";
import styles from "./App.css";
import { Provider } from "react-redux";
import store from "./store";
import Alert from "./components/layout/Alert";
import { useEffect, useState } from "react";
import setAuthToken from "./utils/setAuthToken";
import { loadUser } from "./actions/auth";
import Dashboard from "./components/dashboard/Dashboard";
import PrivateRoute from "./components/routing/PrivateRoute";
import { LOGOUT } from "./actions/types";
import Posts from "./components/posts/Posts";
import Post from "./components/post/Post";
import AddExperience from "./components/profile-forms/AddExperience";
import AddEducation from "./components/profile-forms/AddEducation";
import ProfileForm from "./components/profile-forms/ProfileForm";
import NotFound from "./components/layout/NotFound";

function App() {
	useEffect(() => {
		// check for token in LS when app first runs
		if (localStorage.token) {
			// if there is a token set axios headers for all requests
			setAuthToken(localStorage.token);
		}
		// try to fetch a user, if no token or invalid token we
		// will get a 401 response from our API
		store.dispatch(loadUser());

		// log user out from all tabs if they log out in one tab
		window.addEventListener("storage", () => {
			if (!localStorage.token) store.dispatch({ type: LOGOUT });
		});
	}, []);
	return (
		<Provider store={store}>
			<Router>
				<Nav />
				<Alert />
				<Routes>
					<Route path='/' element={<Login />} />
					<Route path='/login' element={<Login />} />
					<Route path='/register' element={<Register />} />
					<Route path='/members' element={<Members />} />
					<Route
						path='/dashboard'
						element={<PrivateRoute component={Dashboard} />}
					/>
					<Route
						path='/create-profile'
						element={<PrivateRoute component={ProfileForm} />}
					/>
					<Route
						path='/edit-profile'
						element={<PrivateRoute component={ProfileForm} />}
					/>
					<Route
						path='/add-experience'
						element={<PrivateRoute component={AddExperience} />}
					/>
					<Route
						path='/add-education'
						element={<PrivateRoute component={AddEducation} />}
					/>
					<Route path='posts' element={<PrivateRoute component={Posts} />} />
					<Route path='posts/:id' element={<PrivateRoute component={Post} />} />
					<Route path='/*' element={<NotFound />} />
				</Routes>
			</Router>
		</Provider>
	);
}

export default App;
