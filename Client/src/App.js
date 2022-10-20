/** @format */

import "./App.css";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Switch,
} from "react-router-dom";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Nav from "./components/layout/Navbar";
import styles from "./App.css";

function App() {
	return (
		<Router>
			<Nav />
			<Routes>
				<Route path='/' element={<Register />} />
				<Route path='/Login' element={<Login />} />
			</Routes>
		</Router>
	);
}

export default App;
