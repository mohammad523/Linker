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

function App() {
	return (
		<Provider store={store}>
			<Router>
				<Nav />
				<Alert />
				<Routes>
					<Route path='/' element={<Register />} />
					<Route path='/Login' element={<Login />} />
					<Route path='/Members' element={<Members />} />
				</Routes>
			</Router>
		</Provider>
	);
}

export default App;
