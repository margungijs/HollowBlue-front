import React, { useState, useEffect } from 'react';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import {useNavigate, useParams} from "react-router-dom";
import SendData from "../reuse/SendData";
import CardVictory from "../components/CardVictory";
import {Observer2, reverseObserver1} from "../reuse/Observer";

function Game() {
    const navigate = useNavigate();
    const { level } = useParams();

    const GameLevel = (level) => {
        const levelNumber = parseInt(level);
        switch(levelNumber){
            case 3:
                return 3;
            case 7:
                return 4;
            case 10:
                return 4.5;
            case 13:
                return 5;
            case 16:
                return 5;
            case 19:
                return 5;
            case 20:
                return 5;
            default:
                return 0;
        }
    };

    const numCards = GameLevel(level) === 4.5 ? 5 * 3 : GameLevel(level) * 3;

    const [cards, setCards] = useState(shuffle([...Array(numCards).keys()].map(n => n % (numCards / 3) + 1)));
    const [open, setOpen] = useState(Array(numCards).fill(true));
    const [locked, setLocked] = useState(Array(numCards).fill(false));
    const [incorrectGuesses, setIncorrectGuesses] = useState(Array(numCards / 3).fill(0));
    const [lastIndexes, setLastIndexes] = useState([]);
    const [selectedCount, setSelectedCount] = useState(0);
    const [start, setStart] = useState(Array(numCards).fill(true));
    const [delayActive, setDelayActive] = useState(true);
    const [gameCompleted, setGameCompleted] = useState(false); // New state for tracking game completion
    const [win, setWin] = useState(false);
    const [score, setScore] = useState(0);
    const [timer, setTimer] = useState(100 * GameLevel(level) - (level * 20));
    const [cardTimer, setCardTimer] = useState(100000);

    const data = {
        user: localStorage.getItem("id"),
        level: level,
        score: score,
        max_score: GameLevel(level) * 150,
        type: 3
    }

    const startTimer1 = () => {
        setTimer(100 * GameLevel(level) - (level * 20))
        const intervalId = setInterval(() => {
            setTimer(prevTimer => {
                const nextTimer = prevTimer - 1;
                if (nextTimer === 0 || gameCompleted) {
                    clearInterval(intervalId); // Stop the timer when it reaches 0
                }
                return Math.max(0, nextTimer); // Ensure timer never goes below 0
            });
        }, 1000);

        return () => clearInterval(intervalId);
    };

    const startCardTimer = () => {
        setCardTimer(30 - level);
        const intervalId = setInterval(() => {
            setCardTimer(prevTimer => {
                const nextTimer = prevTimer - 1;
                if (nextTimer === 0 || gameCompleted) {
                    clearInterval(intervalId); // Stop the timer when it reaches 0
                }
                return Math.max(0, nextTimer); // Ensure timer never goes below 0
            });
        }, 1000);

        return () => clearInterval(intervalId);
    };

    useEffect(() => {
        if (timer === 0) {
            setGameCompleted(true)
            setLocked(Array(numCards).fill(false))
            setCards(shuffle([...Array(numCards).keys()].map(n => n % (numCards / 3) + 1)))
            setOpen(Array(numCards).fill(true))
            setCardTimer(100000)
            setLastIndexes([])
            setSelectedCount(0)
            setDelayActive(true)
            setStart(Array(numCards).fill(true))
        }

        if(cardTimer === 0){
            setTimer(0)
            setGameCompleted(true)
            setLocked(Array(numCards).fill(false))
            setCards(shuffle([...Array(numCards).keys()].map(n => n % (numCards / 3) + 1)))
            setOpen(Array(numCards).fill(true))
            setCardTimer(100000)
            setLastIndexes([])
            setSelectedCount(0)
            setDelayActive(true)
            setStart(Array(numCards).fill(true))
        }
    }, [timer, cardTimer]);

    useEffect(() => {
        const flash = 7000 - (GameLevel(level) * 1000)

        if(gameCompleted === false){
            const startTimer = setTimeout(() => {
                setStart(Array(numCards).fill(false));
            }, flash-250);

            const openTimer = setTimeout(() => {
                setDelayActive(false);
                setOpen(Array(numCards).fill(false));
                if(GameLevel(level) >= 5){
                    startTimer1();
                }
            }, flash);

            return () => {
                clearTimeout(startTimer);
                clearTimeout(openTimer);
            };
        }
    }, [numCards, gameCompleted]);

    useEffect(() => {
        if (locked.every(card => card)) {
            console.log("All cards have been correctly guessed!");
            const requiredScore = level * 150 * 0.6; // 60% of GameLevel(level) * 150
            setLocked(Array(numCards).fill(false))
            setCards(shuffle([...Array(numCards).keys()].map(n => n % (numCards / 3) + 1)))
            setOpen(Array(numCards).fill(true))
            setTimer(100 * GameLevel(level) - (level * 20))
            setCardTimer(100000)
            setLastIndexes([])
            setSelectedCount(0)
            setGameCompleted(true);
            setWin(score >= requiredScore);
            setStart(Array(numCards).fill(true))

            console.log(open)
            // const data = {
            //     user: localStorage.getItem('id'),
            //     level: level,
            //     score: currentLevel.score
            // };
            // SendData(data, 'http://localhost/api/v1/Score/')
            //     .then(response => {
            //         console.log('Data sent successfully:', response);
            //     })
            //     .catch(error => {
            //         console.error('Error sending data:', error.message);
            //     });
        }
    }, [locked]);


    function handleCoordinates() {
        const cardsWithinRadius = [];

        // Calculate the coordinates of the click
        const clickX = clickCoordinates.x;
        const clickY = clickCoordinates.y;

        // Iterate over all cards
        for (let i = 0; i < cards.length; i++) {
            // Calculate the coordinates of the center of the current card
            const cardRect = document.getElementById(`card-${i}`).getBoundingClientRect();
            const cardX = cardRect.left + cardRect.width / 2;
            const cardY = cardRect.top + cardRect.height / 2;

            // Calculate the distance between the click coordinates and the center of the current card
            const distance = Math.sqrt(Math.pow(clickX - cardX, 2) + Math.pow(clickY - cardY, 2));

            // If the distance is less than or equal to 500px, add the value of the card to the array
            if (distance <= 250) {
                cardsWithinRadius.push(cards[i]);
            }
        }

        // Now cardsWithinRadius contains values of all cards within the 500px radius of the click
        console.log("Cards within 500px radius:", cardsWithinRadius);
    }

    function handleClick(i) {
        if (locked[i] || selectedCount >= 3 || delayActive) return;

        if(level > 15 && cardTimer > 100){
            startCardTimer()
        }

        setStart(open => {
            const newStart = [...open];
            newStart[i] = !newStart[i];
            return newStart;
        });

        setTimeout(() => {
            setOpen(start => {
                const newOpen = [...start];
                newOpen[i] = !newOpen[i];
                return newOpen;
            });
        }, 250);

        setSelectedCount(count => count + 1); // Increment the count of selected cards

        if (lastIndexes.length === 2) {
            if (cards[i] === cards[lastIndexes[0]] && cards[i] === cards[lastIndexes[1]]) {
                setTimeout(() => {
                    setLocked(l => {
                        const newLocked = [...l];
                        newLocked[i] = true;
                        newLocked[lastIndexes[0]] = true;
                        newLocked[lastIndexes[1]] = true;
                        return newLocked;
                    });
                    setLastIndexes([]);
                    setScore(calculateScoreIncrement(incorrectGuesses[cards[i] - 1]) + score);
                    setIncorrectGuesses(prevIncorrectGuesses => {
                        const newIncorrectGuesses = [...prevIncorrectGuesses];
                        newIncorrectGuesses[cards[i] - 1] = 0;
                        return newIncorrectGuesses;
                    });
                    setCardTimer(100000)
                    setSelectedCount(0);
                }, 250);
            } else {
                setIncorrectGuesses(prevIncorrectGuesses => {
                    const currentNumber = cards[lastIndexes[0]];
                    const newIncorrectGuesses = [...prevIncorrectGuesses];
                    newIncorrectGuesses[currentNumber - 1]++;
                    return newIncorrectGuesses;
                });
                setTimeout(() => {
                    setStart(start => {
                        const newStart = [...start];
                        newStart[i] = false;
                        newStart[lastIndexes[0]] = false;
                        newStart[lastIndexes[1]] = false;
                        return newStart;
                    });
                    setTimeout(() => {
                        setOpen(open => {
                            const newOpen = [...open];
                            newOpen[i] = false;
                            newOpen[lastIndexes[0]] = false;
                            newOpen[lastIndexes[1]] = false;
                            return newOpen;
                        });
                    }, 250);
                    setLastIndexes([]);
                    setSelectedCount(0);
                }, 1000);
            }
        } else {
            setLastIndexes(l => [...l, i]);
            console.log("balls");
        }
    }

    const [clickCoordinates, setClickCoordinates] = useState({ x: 0, y: 0 });

    useEffect(() => {
        if(gameCompleted){
            const hiddenElements = document.querySelectorAll('.show-animate-bot');
            hiddenElements.forEach((el) => reverseObserver1.observe(el));

            return () => {
                hiddenElements.forEach((el) => reverseObserver1.unobserve(el));
            };
        }

        if(!gameCompleted){
            const hiddenElements = document.querySelectorAll('.hidden-animate-bot');
            hiddenElements.forEach((el) => Observer2.observe(el));

            return () => {
                hiddenElements.forEach((el) => Observer2.unobserve(el));
            };
        }
    }, [gameCompleted])

    function handleCoordinate(event) {
        const x = event.pageX;
        const y = event.pageY;

        setClickCoordinates({ x, y });

        handleCoordinates();
    }

    function calculateScoreIncrement(incorrectGuessCount) {
        let score = 150 - (30 * incorrectGuessCount);
        if(score < 30){
            return 30;
        }else{
            return score;
        }
    }

    document.body.style.overflowX = 'hidden';

    return (
        <div className="flex justify-center items-center h-screen bg-neutral-100" onClick = {handleCoordinate}>
            {gameCompleted &&
                <CardVictory
                    win = {win}
                    data = {data}
                    setGameCompleted = {() => setGameCompleted(false)}
                    setWin = {() => setWin(false)}
                    setScore = {() => setScore(0)}
                    setMistakes = {() => setIncorrectGuesses(Array(numCards / 3).fill(0))}
                    setTimer = {() => setTimer(100 * GameLevel(level) - (level * 20))}
                />
            }
            <div
                className = "fixed top-5 right-5 flex flex-col items-center cursor-pointer"
                onClick={() => navigate("/Levels")}
            >
                <h1 className = "text-xl">Go back</h1>
                <FaArrowLeft className = "text-3xl"/>
            </div>
            <div className="fixed top-6 left-10 text-4xl flex flex-col">
                <h1>Points: {score}</h1>
                {GameLevel(level) >= 5 && <h1>Time: {timer}</h1>}
                {cardTimer > 0 && cardTimer < 100 && <h1>Card timer: {cardTimer}</h1>}
            </div>
            {/*<div className = {`absolute right-5 flex flex-row items-center h-4/5 transform duration-300 translate-x-[${abilities ? "0%" : "90%"}]`}>*/}
            {/*    <div className = "flex flex-col items-center cursor-pointer" onClick={() => setAbilities(!abilities)}>*/}
            {/*        {abilities ? <FaArrowRight className = "text-4xl"/> : <FaArrowLeft className = "text-4xl"/>}*/}
            {/*        <h1 className = "text-center">Abilities</h1>*/}
            {/*    </div>*/}
            {/*    <div className = {`bg-white rounded-lg shadow-lg w-60 duration-300 ${abilities ? "ml-4" : "ml-60"} p-4`}>*/}
            {/*        <div className = "flex flex-col items-center mb-4 relative cursor-pointer">*/}
            {/*            <h1 className = "text-2xl">Hollow Purple</h1>*/}
            {/*            <img src={Test} alt="" className = ""/>*/}
            {/*            <div className="absolute inset-0 bg-black p-4 opacity-0 hover:opacity-70 transition-opacity duration-300 flex items-center justify-center rounded-lg">*/}
            {/*                <span className="text-white text-2xl text-center">Use Hollow Purple</span>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*        <div className = "flex flex-col items-center mb-4 relative cursor-pointer">*/}
            {/*            <h1 className = "text-2xl">Infinite Void</h1>*/}
            {/*            <img src={Infinite} alt="" className = "rounded-lg"/>*/}
            {/*            <div className="absolute inset-0 bg-black p-4 opacity-0 hover:opacity-70 transition-opacity duration-300 flex items-center justify-center rounded-lg">*/}
            {/*                <span className="text-white text-2xl text-center">Use Infinite Void </span>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*        <div className = "flex flex-col items-center relative cursor-pointer">*/}
            {/*            <h1 className = "text-2xl">Six-Eyes</h1>*/}
            {/*            <img src={SixEyes} alt="" className = "rounded-lg"/>*/}
            {/*            <div className="absolute inset-0 bg-black p-4 opacity-0 hover:opacity-70 transition-opacity duration-300 flex items-center justify-center rounded-lg">*/}
            {/*                <span className="text-white text-2xl text-center">Use Six-Eyes </span>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}
            <div className={`grid grid-cols-3 gap-4 show-animate-bot`}>
                {cards.map((card, i) => (
                    <div
                        key={i}
                        className={`relative w-20 h-28 cursor-pointer rounded-lg`}
                        onClick={() => handleClick(i)}
                        id = {`card-${i}`}
                    >
                        <div className={`absolute w-full h-full card ${start[i] ? (locked[i] ? "bg-black text-white" : "bg-white text-black")  : "bg-white"} shadow-lg rounded-lg transition-transform transform`}
                             style={{ transformStyle: 'preserve-3d', transform: start[i] ? 'rotateY(180deg)' : 'rotateY(0deg)'}}
                        >
                            <div className="flex items-center justify-center h-full" style={{ transform: start[i] ? 'rotateY(180deg)' : 'rotateY(0deg)', textAlign: 'center', lineHeight: '16px' }}>
                                {open[i] ? (start[i] ? card : "") : (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <div className="w-12 h-12 border-[8px] border-neutral-700 rounded-full"></div> {/* Circular shape with white border */}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

export default Game;
