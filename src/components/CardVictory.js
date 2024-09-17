import React, {useEffect} from 'react';
import HandleEnd from "../reuse/HandleEnd";
import {useNavigate} from "react-router-dom";
import {observer} from "../reuse/Observer";
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'

const CardVictory = ( { win, data, setGameCompleted, setWin, setScore, setMistakes, setTimer} ) => {
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
            <img src={win ? Gojo : Gojo1} alt="" className = "absolute bottom-0 left-0"/>
            <div className="bg-white rounded-lg p-8 max-w-md text-center hidden-animate-top">
                {win ? (
                    <div>
                        <h2 className="text-3xl font-bold mb-4">Congratulations!</h2>
                        <p className="text-xl mb-4">You've completed the game. Would you like to play again?</p>
                        <div className = "flex flex-row justify-between grid grid-cols-2 gap-16">
                            <button className = "bg-sky-300 transform p-2 duration-300 hover:bg-sky-500 rounded-lg shadow-lg" onClick = {() => HandleEnd("exit", data, setGameCompleted, setWin, setScore, setMistakes, navigate('/Dashboard')) }>Exit</button>
                            <button className = "bg-green-300 p-2 transform duration-300 hover:bg-green-500 rounded-lg shadow-lg" onClick = { () => {HandleEnd("restart", data, setGameCompleted, setWin, setScore, setMistakes); setTimer() }}>Retry</button>
                        </div>
                    </div>
                ) : (
                    <div>
                        <h2 className="text-3xl font-bold mb-4">Better luck next time.</h2>
                        <p className="text-xl mb-4">You didn't get enough points. Would you like to retry?</p>
                        <div className = "flex flex-row justify-between grid grid-cols-2 gap-16">
                            <button className = "bg-sky-300 transform p-2 duration-300 hover:bg-sky-500 rounded-lg shadow-lg" onClick = {() => HandleEnd("exit", data, setGameCompleted, setWin, setScore, setMistakes, navigate('/Dashboard')) }>Exit</button>
                            <button className = "bg-green-300 p-2 transform duration-300 hover:bg-green-500 rounded-lg shadow-lg" onClick = { () => {HandleEnd("restart", data, setGameCompleted, setWin, setScore, setMistakes); setTimer() }}>Retry</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CardVictory;