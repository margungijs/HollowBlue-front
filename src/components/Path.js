import React from 'react';
import {useNavigate} from "react-router-dom";

const Path = ({ title, image, description, color }) => {
    const navigate = useNavigate();

    return (
        <div className="border-2 rounded-lg flex flex-col h-fit lg:p-10 p-2 shadow-lg bg-white md:m-3 md:w-3/6 w-10/12 path hidden-animate relative cursor-pointer" onClick = {() => navigate("/Auth")}>
            <h1 className="text-3xl text-center mb-4">{title}</h1>
            <img src={image} alt="" className="rounded-lg mb-4 object-cover h-3/5" />
            <p className="text-xl text-center">{description}</p>
            <div className="absolute inset-0 bg-black p-4 opacity-0 hover:opacity-70 transition-opacity duration-300 flex items-center justify-center rounded-lg">
                <span className="text-white text-3xl text-center">Become {title}</span>
            </div>
        </div>
    );
};

export default Path;
