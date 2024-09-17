import React from 'react';
import Gojo from "../images/Gojo1.jpeg";
import {FaStar} from "react-icons/fa";

const Entry = ({ username, score, stars }) => {
    const starsArray = Array.from({ length: 5 }, (_, index) => index);

    const renderStars = () => {
        const filledStars = 5;
        const starColor = filledStars >= 3 ? "text-sky-300" : "text-gray-500";

        return starsArray.map((_, index) => (
            <FaStar key={index} className={`lg:text-5xl text-2xl ${index < filledStars ? starColor : "text-gray-400"}`} />
        ));
    };

    return (
        <div className = "bg-sky-100 p-5 rounded-lg shadow-lg w-full flex lg:flex-row flex-col items-center mb-4">
            <div className = "flex flex-col items-center justify-center lg:mr-10 w-1/2">
                <img src={Gojo} alt="" className = "rounded-full lg:h-28 h-20 mb-2"/>
                <h1 className = "lg:text-3xl text-xl w-full overflow-ellipsis text-center">{username}</h1>
            </div>
            <div className = "flex flex-col justify-between items-center lg:mr-10">
                <h1 className = "lg:text-4xl text-xl">Score: {score}</h1>
                {stars &&
                    <div className="flex flex-row bottom-2">
                        {renderStars()}
                    </div>
                }
            </div>
        </div>
    );
};

export default Entry;