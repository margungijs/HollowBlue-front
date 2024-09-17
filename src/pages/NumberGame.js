import React, { useState, useEffect } from 'react';
import {FaHeart} from "react-icons/fa";
import {useNavigate, useParams} from "react-router-dom";
import Tutorial from "../components/Tutorial";
import Gojo from "../images/thumbsupnobg.png";
import Gojo1 from "../images/GojoSad.png";
import SendData from "../reuse/SendData";
import {HandleEnd} from "../reuse/HandleEnd";
import VictoryScreen from "../components/VictoryScreen";
import {observer, reverseObserver, Observer1} from "../reuse/Observer";

const NumberGame = () => {
    const { level } = useParams();
    const navigate = useNavigate();

    const GameLevel = (level) => {
        const levelNumber = parseInt(level);
        switch(levelNumber){
            case 1:
                return 6;
            case 4:
                return 5;
            case 7:
                return 4;
            case 11:
                return 3;
            case 14:
                return 2;
            case 17:
                return 1;
            default:
                return 0;
        }
    };

    const [flash, setFlash] = useState(true);
    const [flashedNumber, setFlashedNumber] = useState();
    const [userInput, setUserInput] = useState('');
    const [score, setScore] = useState(0);
    const [timer, setTimer] = useState(10 * GameLevel(level));
    const [mistakes, setMistakes] = useState(0);
    // const [tutorial, setTutorial] = useState(level === '1');
    const [gameCompleted, setGameCompleted] = useState(false); // New state for tracking game completion
    const [win, setWin] = useState(false);

    const generateRandomNumber = (length) => {
        return Math.floor(Math.random() * (Math.pow(10, length) - Math.pow(10, length - 1))) + Math.pow(10, length - 1);
    };

    const startTimer = () => {
        setTimer(10);
        const intervalId = setInterval(() => {
            setTimer(prevTimer => {
                const nextTimer = prevTimer - 1;
                if (nextTimer === 0) {
                    clearInterval(intervalId); // Stop the timer when it reaches 0
                }
                return Math.max(0, nextTimer); // Ensure timer never goes below 0
            });
        }, 1000);

        return () => clearInterval(intervalId);
    };

    const flashNumber = () => {
        const length = score + 1;
        const number = generateRandomNumber(length);
        setFlashedNumber(number);
        setFlash(true);
        setTimeout(() => {
            setFlash(false);
            if(GameLevel(level) < 4){
                startTimer();
            }
        }, GameLevel(level) * 1000);
    };

    const handleChange = (event) => {
        setUserInput(event.target.value);
    };

    const handleSubmit = () => {
        if(parseInt(userInput) === flashedNumber){
            setScore(score + 1)
            setUserInput("")
            if (score === (12 - GameLevel(level)) - 1) {
                setGameCompleted(true)
                setWin(true)
                console.log("finished");
            }

            if(!gameCompleted){
                flashNumber();
            }
        } else {
            setUserInput("")
            setMistakes(mistakes + 1);
            setFlash(true);
            if (mistakes === GameLevel(level)-1){
                setGameCompleted(true)
                console.log("dead");
            }
            setTimeout(() => {
                setFlash(false);
            }, 2000);
        }
    };

    useEffect(() => {
        flashNumber();
    }, []);

    useEffect(() => {
        if (timer === 0) {
            setMistakes(mistakes + 1);
            flashNumber();
        }
    }, [timer]);

    useEffect(() => {
        if(gameCompleted){
            const hiddenElements = document.querySelectorAll('.show-animate-bot');
            hiddenElements.forEach((el) => reverseObserver.observe(el));

            return () => {
                hiddenElements.forEach((el) => reverseObserver.unobserve(el));
            };
        }

        if(!gameCompleted){
            const hiddenElements = document.querySelectorAll('.hidden-animate-bottom');
            hiddenElements.forEach((el) => Observer1.observe(el));

            return () => {
                hiddenElements.forEach((el) => Observer1.unobserve(el));
            };
        }
    }, [gameCompleted])



    const renderStars = () => {
        const remainingLives = GameLevel(level) - mistakes; // Calculate remaining lives
        const filledStars = remainingLives > 0 ? remainingLives : 0; // Get the number of filled stars based on remaining lives
        const starColor = remainingLives >= 3 ? "text-sky-300" : "text-red-500"; // Color for filled stars

        return Array.from({ length: GameLevel(level) }, (_, index) => (
            <FaHeart key={index} className={`text-3xl mx-2 ${index < filledStars ? starColor : "text-gray-400"}`} />
        ));
    };

    const data = {
        user: localStorage.getItem("id"),
        level: level,
        score: score,
        max_score: (12 - GameLevel(level)),
        type: 1
    }

    return (
        <div className = "bg-neutral-100 h-screen flex flex-col p-10 items-center">
            {/*{tutorial && <Tutorial finish = {() => setTutorial(false)}/>}*/}
            <div className="fixed lg:top-6 bottom-6 left-10 text-4xl">
                <h1>Points: {score}{win ? "" : `/${(12 - GameLevel(level))}`}</h1>
                <h1>{GameLevel(level) < 4 && `Time: ${timer}`}</h1>
            </div>
            <h1 className = "text-5xl text-center">Number Memory Game</h1>
            {gameCompleted &&
                <VictoryScreen
                    completed = {gameCompleted}
                    win = {win}
                    mistakes = {mistakes}
                    gameLevel = {GameLevel(level)}
                    data = {data}
                    setGameCompleted = {() => setGameCompleted(false)}
                    setWin = {() => setWin(false)}
                    setScore = {() => setScore(0)}
                    setMistakes = {() => setMistakes(0)}
                />
            }
            <div className = "fixed w-11/12 lg:w-3/5 top-1/2 left-1/2 transform show-animate-bot -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg p-10 flex flex-col items-center">
                <h1 className = "text-2xl text-center mb-4">Remember the number and rewrite it:</h1>
                {flash && <h3 className = "text-4xl mb-4" >{flashedNumber}</h3>}
                {!flash &&
                    <input
                        className = "text-4xl text-center mb-4 w-full"
                        value={userInput}
                        onChange={handleChange}
                    />
                }
                <button onClick={handleSubmit} className = "text-2xl bg-sky-200 hover:bg-sky-400 transform duration-300 rounded-lg shadow-lg w-full">Enter</button>
                <div className="flex justify-center mt-4">
                    {renderStars()}
                </div>
            </div>
        </div>
    );
};

export default NumberGame;
