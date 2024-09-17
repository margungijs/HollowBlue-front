import React from 'react';
import { FaStar, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Level = ({ name, image, level, description, locked, score }) => {
    const stars = Array.from({ length: 5 }, (_, index) => index);
    const navigate = useNavigate();

    const renderStars = () => {
        const filledStars = score ? Math.floor(score) : 0;
        const starColor = score >= 3 ? "text-sky-300" : "text-gray-500"; // Color for filled stars

        return stars.map((_, index) => (
            <FaStar key={index} className={`text-3xl ${index < filledStars ? starColor : "text-gray-400"}`} />
        ));
    };

    return (
        <div
            className="flex flex-col bg-white shadow-lg rounded-lg justify-center items-center py-4 px-6 relative"
            onClick={() => {
                const getGamePath = (level, type) => {
                    switch (type) {
                        case 'NumberGame':
                            return `/NumberGame/${level}`;
                        case 'WordGame':
                            return `/WordGame/${level}`;
                        case 'Game':
                            return `/Game/${level}`;
                        default:
                            return `/WordGame/${level}`;
                    }
                };

                const types = ['NumberGame', 'WordGame', 'Game'];
                const typeIndex = (level - 1) % types.length; // Subtract 1 to ensure level 1 corresponds to the first type
                const path = getGamePath(level, types[typeIndex]);
                navigate(path);
            }}
        >
            <h1 className="text-3xl mb-4">{name}</h1>
            <img src={image} alt="" className="mb-4 rounded-lg" />
            <p className="text-center text-lg mb-4">{description}</p>
            {locked ?
                (<div className="absolute shadow-lg inset-0 bg-black p-4 opacity-70 transition-opacity duration-300 flex items-center justify-center rounded-lg">
                    <span className="text-white text-3xl text-center"> Locked </span>
                </div>) :
                (<div className="absolute shadow-lg inset-0 bg-black p-4 opacity-0 hover:opacity-70 cursor-pointer transition-opacity duration-300 flex items-center justify-center rounded-lg">
                    <span className="text-white text-3xl text-center">{name.includes("Level") || name.includes("Tutorial") ? "Play" : "Fight"} {name}</span>
                </div>)
            }
            <div className="flex flex-row bottom-2">
                {renderStars()}
            </div>
        </div>
    );
};

export default Level;
