/** @format */

import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Register from "./components/auth/Register";
import styles from "./App.css";

function App() {
	return (
		<div className='App'>
			<Register />
		</div>
	);
}

export default App;
