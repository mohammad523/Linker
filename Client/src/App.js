/** @format */

import "./App.css";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Switch,
} from "react-router-dom";
import Register from "./components/auth/Register/Register";
import Login from "./components/auth/Login";
import Nav from "./components/layout/Navbar";
import Members from "./components/Members";
import styles from "./App.css";
import { Provider } from "react-redux";
import store from "./store";
import Alert from "./components/layout/Alert";
import { useEffect } from "react";
import setAuthToken from "./utils/setAuthToken";
import { loadUser } from "./actions/auth";
import Dashboard from "./components/dashboard/Dashboard";
import PrivateRoute from "./components/routing/PrivateRoute";

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
	}, []);

	return (
		<Provider store={store}>
			<Router>
				<Nav />
				<Alert />
				<Routes>
					<Route path='/' element={<Register />} />
					<Route path='/login' element={<Login />} />
					<Route path='/members' element={<Members />} />
					<Route
						path='/dashboard'
						element={<PrivateRoute component={Dashboard} />}
					/>
				</Routes>
			</Router>
		</Provider>
	);
}

export default App;
