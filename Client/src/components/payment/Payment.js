/** @format */

import React, { useState, useEffect } from "react";
import axios from "axios";
import {
	useStripe,
	useElements,
	PaymentRequestButtonElement,
	Elements,
} from "@stripe/react-stripe-js";
import StripeCheckout from "react-stripe-checkout";

import { loadStripe } from "@stripe/stripe-js";
import api from "../../utils/api";

const stripePromise = loadStripe(process.env.REACT_APP_KEY);

const Payment = ({ userPaymentStatus }) => {
	const stripe = useStripe();
	const elements = useElements();
	const [paymentRequest, setPaymentRequest] = useState(null);
	const [canMakePayment, setCanMakePayment] = useState(false);
	const [paid, setPaid] = useState(userPaymentStatus);
	const product = {
		name: "Linker Registration Fee",
		price: 100, // Amount in cents, $1.00
	};

	useEffect(() => {
		if (stripe) {
			const pr = stripe.paymentRequest({
				country: "US",
				currency: "usd",
				total: {
					label: product.name,
					amount: product.price,
				},
				requestPayerName: true,
				requestPayerEmail: true,
			});

			pr.canMakePayment().then((result) => {
				if (result) {
					setPaymentRequest(pr);
					setCanMakePayment(true);
				}
			});

			pr.on("paymentmethod", async (event) => {
				try {
					const response = await axios.post("/api/payment", {
						paymentMethodId: event.paymentMethod.id,
					});

					if (response.data.success) {
						event.complete("success");
						setPaid(true);
					} else {
						event.complete("fail");
						console.error("Payment failed:", response.data.error);
					}
				} catch (error) {
					event.complete("fail");
					console.error("Error making payment:", error);
				}
			});
		}
	}, [stripe]);

	return (
		<Elements stripe={stripePromise}>
			<div className='payment-component'>
				<h1 className='paid-indicator'>
					{paid
						? "Paid"
						: "You have not paid your registration fee. Please pay $1.00 to gain full access to your account."}
				</h1>
				{canMakePayment && paymentRequest ? (
					<PaymentRequestButtonElement options={{ paymentRequest }} />
				) : (
					<></>
				)}
				<StripeCheckout
					amount={product.price}
					stripeKey={process.env.REACT_APP_KEY}
					token={async (token) => {
						const body = {
							token,
							product,
						};
						const headers = {
							"Content-Type": "application/json",
						};

						console.log(token);

						try {
							const response = await api.post("/payment", body, { headers });
							console.log(response, "response");

							const { status } = response;

							if (status === 200) {
								setPaid(true);
							}

							return status;
						} catch (error) {
							console.error("Error making payment:", error);
						}
					}}
					name={product.name}
					bitcoin={true}
				>
					<button className='btn-wide'>Pay</button>
				</StripeCheckout>
			</div>
		</Elements>
	);
};

export default Payment;
