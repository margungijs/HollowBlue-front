import React from 'react';
import {FaStar} from "react-icons/fa";

const HighScore = () => {
    const stars = Array.from({ length: 5 }, (_, index) => index);

    return (
        <div className = "flex bg-sky-100 rounded-lg shadow-lg p-4 w-full flex-col items-center">
            <div className = "flex flex-row justify-between w-full mb-4">
                <h1 className = "text-2xl self-start">Level 9</h1>
                <h1 className = "text-xl ">Score: 450/450</h1>
            </div>
            <div className = "flex flex-row items-center w-full justify-center">
                {stars.map((_, index) => (
                    <FaStar key={index} className = "text-3xl text-sky-500"/>
                ))}
            </div>
        </div>
    );
};

export default HighScore;