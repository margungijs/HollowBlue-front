import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import SendData from "../reuse/SendData";
import { ImCheckmark } from "react-icons/im";

const PaymentForm = ({ price, onClose, credits }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState(false);
    const [paymentComplete, setPaymentComplete] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setProcessing(true);

        const data = {
            id: localStorage.getItem("id"),
            price: price
        }

        try {
            const response = await SendData(data, "http://localhost/api/v1/Payment/");
            console.log('Data sent successfully:', response);

            if (response.client_secret) {
                const result = await stripe.confirmCardPayment(response.client_secret, {
                    payment_method: {
                        card: elements.getElement(CardElement),
                        billing_details: {
                            name: "John Doe",
                            email: response.name
                        },
                    }
                });

                if (result.error) {
                    setError(result.error.message);
                    setProcessing(false);
                } else {
                    console.log(result.paymentIntent);
                    setPaymentComplete(true);
                }
            }
        } catch (error) {
            console.error('Error sending data:', error.message);
            setError('Error processing payment.');
            setProcessing(false);
        }
    };

    const handleReset = () => {
        setProcessing(false);
        setError(null);
        setPaymentComplete(false);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="bg-white rounded-lg p-8 w-full max-w-md">
                <span className="absolute top-5 right-5 cursor-pointer text-neutral-50 text-7xl" onClick={onClose}>&times;</span>
                {paymentComplete ? (
                    <div className="text-center">
                        <h1 className="text-3xl">Payment Successful!</h1>
                        <div className = "flex justify-center mb-4">
                            <ImCheckmark className = "text-green-300 text-9xl text-center"/>
                        </div>
                        <button onClick={handleReset} className="bg-blue-500 text-white px-4 py-2 rounded-md w-full mb-4">Make Another Payment</button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="w-full flex flex-col">
                        <h1 className="text-center text-3xl mb-4">{credits} Credits</h1>
                        <CardElement className="mb-10" />
                        {error && <div className="text-red-500 mb-4">{error}</div>}
                        <button type="submit" disabled={!stripe || processing} className="bg-blue-500 text-white px-4 py-2 rounded-md disabled:bg-gray-400 disabled:cursor-not-allowed w-full">
                            {processing ? 'Processing...' : `Pay ${price}.00€`}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default PaymentForm;
