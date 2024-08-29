/** @format */

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));

const stripePromise = loadStripe(process.env.REACT_APP_KEY);
root.render(
	<React.StrictMode>
		<Elements stripe={stripePromise}>
			<App />
		</Elements>
	</React.StrictMode>
);

reportWebVitals();
