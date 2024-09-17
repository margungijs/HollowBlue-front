import React, { useState } from 'react';
import TutorialImg from "../images/Tutorial.png";
import TutorialImg1 from "../images/Tutorial1.png";
import TutorialImg3 from "../images/Tutorial3.png";
import TutorialImg4 from "../images/Tutorial4.png";
import TutorialImg5 from "../images/Tutorial5.png";
import Gojo from "../images/thumbsup.jpeg";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const Tutorial = ({ finish }) => {
    const [scrollPosition, setScrollPosition] = useState(0);

    const scrollLeft = () => {
        setScrollPosition(scrollPosition + 100);
    };

    const scrollRight = () => {
        setScrollPosition(scrollPosition - 100);
    };

    console.log(scrollPosition)

    return (
        <div className="fixed w-screen h-screen top-0 bg-white z-50 p-20 flex flex-col items-center">
            {scrollPosition > -600 && (
                <div className="fixed top-1/2 right-5 cursor-pointer" onClick={scrollRight}>
                    <FaArrowRight className="text-4xl"/>
                    <p>Next</p>
                </div>
            )}
            {scrollPosition === -600 && (
                <div className="fixed flex flex-col items-center top-1/2 right-5 cursor-pointer" onClick={finish}>
                    <FaArrowRight className="text-4xl"/>
                    <p>Finish</p>
                </div>
            )}
            <h1 className="text-5xl">Welcome to Hollow Blue</h1>
            <div className="flex flex-row relative transition duration-300 h-screen w-full overflow-hidden">
                <div className="flex flex-row absolute h-full p-10 w-full transform duration-300" style={{ transform: `translateX(${scrollPosition}%)` }}>
                    <div className="flex flex-col w-2/5 mr-4">
                        <p className="text-2xl indent-10">At the start of the game all cards will flash to show you where each card is. Respectfully for some paths the cards will flash longer and for some - shorter, but the idea remains the same.</p>
                        <img src={Gojo} alt="" className="self-end"/>
                    </div>
                    <div className="w-3/5">
                        <img src={TutorialImg} alt="" className="rounded-lg"/>
                    </div>
                </div>
                <div className="flex flex-row absolute h-full p-10 w-full transform duration-300" style={{ transform: `translateX(${scrollPosition + 100}%)` }}>
                    <div className="flex flex-col w-2/5 mr-4">
                        <p className="text-2xl indent-10">Once the cards have flashed at the start of the round, the cards will flip and make the numbers not visible. This is where the game begins.</p>
                        <img src={Gojo} alt="" className="self-end"/>
                    </div>
                    <div className="w-3/5">
                        <img src={TutorialImg1} alt="" className="rounded-lg"/>
                    </div>
                </div>
                <div className="flex flex-row absolute h-full p-10 w-full transform duration-300" style={{ transform: `translateX(${scrollPosition + 200}%)` }}>
                    <div className="flex flex-col w-2/5 mr-4 justify-between">
                        <p className="text-2xl indent-10">Upon clicking a card, the card will flip and reveal the number on the card.</p>
                        <img src={Gojo} alt="" className="self-end mb-0"/>
                    </div>
                    <div className="w-3/5">
                        <img src={TutorialImg3} alt="" className="rounded-lg"/>
                    </div>
                </div>
                <div className="flex flex-row absolute h-full p-10 w-full transform duration-300" style={{ transform: `translateX(${scrollPosition + 300}%)` }}>
                    <div className="flex flex-col w-2/5 mr-4 justify-between">
                        <p className="text-2xl indent-10">Once 3 of the same cards have been picked, the cards will turn inverted and count the respective amount of points to your round.</p>
                        <img src={Gojo} alt="" className="self-end mb-0"/>
                    </div>
                    <div className="w-3/5">
                        <img src={TutorialImg4} alt="" className="rounded-lg"/>
                    </div>
                </div>
                <div className="flex flex-row absolute h-full p-10 w-full transform duration-300" style={{ transform: `translateX(${scrollPosition + 400}%)` }}>
                    <div className="flex flex-col w-2/5 mr-4 justify-between">
                        <p className="text-2xl indent-10">If the numbers have been guessed on the first try, you will gain the max amount of points of 150, but for everytime you miss a guess on the first number picked, that first numbers value will go down by 30 with a minimum value of 30.</p>
                        <img src={Gojo} alt="" className="self-end mb-0"/>
                    </div>
                    <div className="w-3/5">
                        <img src={TutorialImg5} alt="" className="rounded-lg"/>
                    </div>
                </div>
                <div className="flex flex-col absolute h-full p-10 w-full items-center transform duration-300" style={{ transform: `translateX(${scrollPosition + 500}%)` }}>
                    <h1 className = "text-4xl text-center">And just like that, you're ready to play! Good luck and be sure to come back whenever you feel the need!</h1>
                    <div className="flex-grow flex items-center justify-center bg-center bg-no-repeat bg-contain rounded-lg">
                        <img src={Gojo} alt=""/>
                    </div>
                </div>
            </div>
            {scrollPosition < 0 && (
                <div className="fixed flex flex-col items-center top-1/2 left-5 cursor-pointer" onClick={scrollLeft}>
                    <FaArrowLeft className="text-4xl"/>
                    <p>Previous</p>
                </div>
            )}
        </div>
    );
};

export default Tutorial;
