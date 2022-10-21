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

function App() {
	return (
		<Router>
			<Nav />
			<Routes>
				<Route path='/' element={<Register />} />
				<Route path='/Login' element={<Login />} />
				<Route path='/Members' element={<Members />} />
			</Routes>
		</Router>
	);
}

export default App;
