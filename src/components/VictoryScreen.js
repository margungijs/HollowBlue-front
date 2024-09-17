import React, {useEffect} from 'react';
import Gojo from "../images/thumbsupnobg.png";
import Gojo1 from "../images/GojoSad.png";
import HandleEnd from "../reuse/HandleEnd";
import {useNavigate} from "react-router-dom";
import {observer} from "../reuse/Observer";
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'
import ReactRain from 'react-rain-animation';
import "react-rain-animation/lib/style.css";

const VictoryScreen = ( { win, mistakes, gameLevel, data, setGameCompleted, setWin, setScore, setMistakes} ) => {
    const navigate = useNavigate();

    useEffect(() => {
        const hiddenElements = document.querySelectorAll('.hidden-animate-top');
        hiddenElements.forEach((el) => observer.observe(el));

        return () => {
            hiddenElements.forEach((el) => observer.unobserve(el));
        };
    }, [])

    const { width, height } = useWindowSize()

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            {win &&
                <Confetti
                    width={width}
                    height={height}
                    gravity={0.5}
                    tweenDuration={5000}
                />
            }
            <img src={win ? Gojo : Gojo1} alt="" className = "absolute bottom-0 lg:show left-0"/>
            <div className="bg-white rounded-lg p-8 max-w-md text-center hidden-animate-top">
                {win ? (
                    mistakes === gameLevel ? (
                        <div>
                            <h2 className="text-3xl font-bold mb-4">You're all out of lives...</h2>
                            <p className="text-xl mb-4">Don't worry, your win still counts, but you've ran out of lives to continue</p>
                            <div className = "flex flex-row justify-between grid grid-cols-2 gap-16">
                                <button className = "bg-sky-300 transform p-2 duration-300 hover:bg-sky-500 rounded-lg shadow-lg" onClick = {() => HandleEnd("exit", data, setGameCompleted, setWin, setScore, setMistakes, navigate('/Dashboard')) }>Exit</button>
                                <button className = "bg-green-300 p-2 transform duration-300 hover:bg-green-500 rounded-lg shadow-lg" onClick = {() => HandleEnd("restart", data, setGameCompleted, setWin, setScore, setMistakes) }>Retry</button>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <h2 className="text-3xl font-bold mb-4">Congratulations!</h2>
                            <p className="text-xl mb-4">You've completed the game. Would you like to continue the game?</p>
                            <div className = "flex flex-row justify-between grid grid-cols-2 gap-16">
                                <button className = "bg-sky-300 transform p-2 duration-300 hover:bg-sky-500 rounded-lg shadow-lg" onClick = {() => HandleEnd("exit", data, setGameCompleted, setWin, setScore, setMistakes, navigate('/Dashboard')) }>Exit</button>
                                <button className = "bg-green-300 p-2 transform duration-300 hover:bg-green-500 rounded-lg shadow-lg" onClick = {setGameCompleted}>Continue</button>
                            </div>
                        </div>
                    )
                ) : (
                    <div>
                        <h2 className="text-3xl font-bold mb-4">Better luck next time.</h2>
                        <p className="text-xl mb-4">You didn't get enough points. Would you like to retry?</p>
                        <div className = "flex flex-row justify-between grid grid-cols-2 gap-16">
                            <button className = "bg-sky-300 transform p-2 duration-300 hover:bg-sky-500 rounded-lg shadow-lg" onClick = {() => HandleEnd("exit", data, setGameCompleted, setWin, setScore, setMistakes, navigate('/Dashboard')) }>Exit</button>
                            <button className = "bg-green-300 p-2 transform duration-300 hover:bg-green-500 rounded-lg shadow-lg" onClick = {() => HandleEnd("restart", data, setGameCompleted, setWin, setScore, setMistakes) }>Retry</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default VictoryScreen;