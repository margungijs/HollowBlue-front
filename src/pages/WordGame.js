import React, { useState, useEffect } from 'react';
import { generate as randomWords } from 'random-words';
import { FaHeart } from "react-icons/fa";
import {useNavigate, useParams} from "react-router-dom";
import VictoryScreen from "../components/VictoryScreen";
import {Observer1, reverseObserver} from "../reuse/Observer";

function WordGame() {
    const { level } = useParams();

    const GameLevel = (level) => {
        const levelNumber = parseInt(level);
        switch(levelNumber){
            case 2:
                return 6;
            case 5:
                return 5;
            case 6:
                return 4;
            case 12:
                return 3;
            case 15:
                return 2;
            case 18:
                return 1;
            default:
                return 0;
        }
    };

    const [currentWord, setCurrentWord] = useState(randomWords());
    const [previousWords, setPreviousWords] = useState([]);
    const [score, setScore] = useState(45);
    const [mistakes, setMistakes] = useState(0); // New state for tracking mistakes
    const [timer, setTimer] = useState(10 * GameLevel(level));
    const [gameCompleted, setGameCompleted] = useState(false); // New state for tracking game completion
    const [win, setWin] = useState(false);

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

    const nextWord = () => {
        setPreviousWords([...previousWords, currentWord]);
        const newWord = Math.random() < 0.5 ? previousWords[Math.floor(Math.random() * previousWords.length)] : randomWords();
        setCurrentWord(newWord);
        if(mistakes < GameLevel(level)-1 && GameLevel(level) < 4){
            startTimer()
        }
    };

    useEffect(() => {
        if(GameLevel(level) < 4){
            startTimer();
        }
    }, []);

    useEffect(() => {
        if (timer === 0) {
            setMistakes(mistakes + 1);
            nextWord();
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

    const handleNew = () => {
        if (!previousWords.includes(currentWord)) {
            setScore(score + 1);
            if(score === ((110 - (GameLevel(level) * 10))-1)){
                setWin(true)
                console.log("win")
                setGameCompleted(true); // Set game completion state to true if score reaches maximum
            }
        } else {
            setMistakes(mistakes + 1); // Increment mistakes if word is duplicated
        }
        nextWord();
    };

    const handleDuplicate = () => {
        if (previousWords.includes(currentWord)) {
            setScore(score + 1);
            if(score === ((110 - (GameLevel(level) * 10))-1)){
                setWin(true)
                console.log("win", score)
                setGameCompleted(true); // Set game completion state to true if score reaches maximum
            }
        } else {
            setMistakes(mistakes + 1); // Increment mistakes if word is not duplicated
        }
        nextWord();
    };

    const renderStars = () => {
        const remainingLives = GameLevel(level) - mistakes; // Calculate remaining lives
        const filledStars = remainingLives > 0 ? remainingLives : 0; // Get the number of filled stars based on remaining lives
        const starColor = remainingLives >= 3 ? "text-sky-300" : "text-red-500"; // Color for filled stars

        return Array.from({ length: GameLevel(level) }, (_, index) => (
            <FaHeart key={index} className={`text-3xl mx-2 ${index < filledStars ? starColor : "text-gray-400"}`} />
        ));
    };

    useEffect(() => {
        if (mistakes >= GameLevel(level)) {
            setGameCompleted(true)
        }
    }, [mistakes, level, GameLevel]);

    const data = {
        user: localStorage.getItem("id"),
        level: level,
        score: score,
        max_score: (110 - GameLevel(level)*10),
        type: 2
    }

    return (
        <div className="bg-neutral-100 h-screen p-10 flex flex-col items-center">
            <div className="fixed lg:top-6 bottom-6 left-10 text-4xl flex flex-col">
                <h1>Points: {score}{win ? "" : `/${(110 - GameLevel(level)*10)}`}</h1>
                <h1>{GameLevel(level) < 4 && `Time: ${timer}`}</h1>
            </div>
            <h1 className="text-5xl">Word memory Game</h1>
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
            <div className="fixed top-1/2 left-1/2 show-animate-bot transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg p-10 lg:w-2/5 w-11/12">
                <h1 className="text-3xl mb-6 text-center">Current word: {currentWord}</h1>
                <div className="flex flex-row justify-between">
                    <button onClick={handleDuplicate} className="text-2xl bg-red-200 hover:bg-red-400 transform duration-300 rounded-lg p-2">Duplicate</button>
                    <button onClick={handleNew} className="text-2xl bg-sky-200 hover:bg-sky-400 transform duration-300 rounded-lg p-2">New</button>
                </div>
                <div className="flex justify-center mt-4">
                    {renderStars()}
                </div>
            </div>
        </div>
    );
}

export default WordGame;
