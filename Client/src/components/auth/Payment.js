/** @format */

import { React, useState } from "react";
import axios from "axios";
import {
	useElements,
	Elements,
	useStripe,
	CardElement,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import StripeCheckout from "react-stripe-checkout";

const loadingStripe = loadStripe(
	"pk_test_51LtSimCZreCAdwFJvNNfiuiXbeFHmH4qE9wis8KdCFkWiWHj1TnMvLck7ku7GSAx462rZoNM33EuIHoSY2sDe2c3008JkWyGnG"
);

const Payment = () => {
	const [product, setproduct] = useState({
		name: "Linker Regristration Fee",
		price: 100,
	});

	const makePayment = (token) => {
		const body = {
			token,
			product,
		};
		const headers = {
			"Content-Type": "application/json",
		};

		return fetch(`http://localhost:5000/api/payment`, {
			method: "POST",
			headers,
			body: JSON.stringify(body),
		})
			.then((response) => {
				console.log("body", body);
				console.log("RESPONSE", response, body);
				const { status } = response;
				console.log("STATUS", status);
			})
			.catch((err) => console.log(err));
	};

	return (
		<div>
			<h1>Payment Component</h1>
			<StripeCheckout
				stripeKey={
					"pk_test_51LtSimCZreCAdwFJvNNfiuiXbeFHmH4qE9wis8KdCFkWiWHj1TnMvLck7ku7GSAx462rZoNM33EuIHoSY2sDe2c3008JkWyGnG"
				}
				token={makePayment}
				name={product.name}
				amount={product.price}
				bitcoin={true}
			>
				<button className='btn-wide'>Pay</button>
			</StripeCheckout>
		</div>
	);
};

export default Payment;
