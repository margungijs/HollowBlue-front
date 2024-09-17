import React, { useEffect, useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Credit from "../components/Credit";
import PaymentForm from "../components/PaymentForm";

const PurchaseCredits = () => {

    const stripePromise = loadStripe('pk_test_51OZu5uLB6pfXLexACK47NOdpFl4d2ggDDldT273UcndVNN49bfh9S043Vjnhdri3kubpfDlDY7lhnXkAUP0sZuV100Podc5LKB');

    const data = [
        { credits: 500, price: 5 },
        { credits: 1000, price: 10 },
        { credits: 2500, price: 20 },
        { credits: 4500, price: 35 },
        { credits: 6500, price: 50 },
        { credits: 14000, price: 100 }
    ];

    const [selected, setSelected] = useState(false);

    console.log(selected)

    const HandleClose = () => {
        setSelected(false);
    }

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show-animate');
                } else {
                    entry.target.classList.remove('show-animate');
                }
            });
        });

        const hiddenElements = document.querySelectorAll('.hidden-animate');
        hiddenElements.forEach((el) => observer.observe(el));

        return () => {
            hiddenElements.forEach((el) => observer.unobserve(el));
        };
    }, []);

    // Split data into chunks of 3 to create two rows
    const rows = [];
    for (let i = 0; i < data.length; i += 3) {
        rows.push(data.slice(i, i + 3));
    }

    return (
        <div className="flex flex-col p-10 items-center bg-neutral-100 h-fit">
            <h1 className="text-5xl mb-10">Purchase credits!</h1>
            <Elements stripe = {stripePromise}>
                {rows.map((row, rowIndex) => (
                    <div key={rowIndex} className="grid grid-cols-3 w-4/5 gap-6 justify-center mb-6">
                        {row.map((item, index) => (
                            <Credit click = {setSelected} key={index} box={rowIndex === 0 ? "credit-box" : "credit-box1"} credits={item.credits} price={item.price} />
                        ))}
                    </div>
                ))}
                {selected && <PaymentForm price = {selected.price.price} onClose = {HandleClose} credits = {selected.credits.credits}/>}
            </Elements>
        </div>
    );
};

export default PurchaseCredits;
