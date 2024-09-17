import React from 'react';
import Gojo from "../images/Gojo1.jpeg";

const Base = ( { data } ) => {

    return (
        <div className = {`flex flex-col bg-white  rounded-lg shadow-lg lg:p-10 py-4 p-2 hidden-animate-top mb-10`}>
            <div className = "flex flex-col lg:items-flex-start items-center">
                <div className = "flex flex-col">
                    <h1 className = "lg:text-5xl text-center text-2xl mb-10">Welcome, {data.name}!</h1>
                </div>
                <img src={Gojo} alt="" className = "rounded-full h-40 shadow-lg" />
            </div>
        </div>
    );
};

export default Base;