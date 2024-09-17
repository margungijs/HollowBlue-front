import React, { useState } from 'react';
import PaymentForm from './PaymentForm';
import Credits from "../images/Credits.jpeg";

const Credit = ({ box, credits, price, click }) => {
    return (
        <div className={`flex flex-col bg-white rounded-lg shadow-lg items-center p-6 hidden-animate ${box}`}>
            <h1 className="text-4xl mb-4">{credits} Credits</h1>
            <img src={Credits} alt="" className="rounded-lg mb-4" />
            <button
                className="text-2xl rounded-lg bg-sky-200 hover:bg-sky-400 transform duration-300 p-2 w-full "
                onClick = {() => click({credits: {credits}, price: {price}})}
            >
                Pay {price}.00€
            </button>
        </div>
    );
};

export default Credit;
