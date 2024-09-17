import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import { setActiveLevel } from "../reducers/levels";
import Level from "../components/Level";
import { MdOutlineArrowForwardIos, MdOutlineArrowBackIos } from "react-icons/md";
import { FaArrowLeft } from "react-icons/fa";
import {useNavigate} from "react-router-dom";
import Game from "./Game";
import GameHard from "./Game-hard";
import GetRequest from "../reuse/GetRequest";
import Thumbsup from "../images/thumbsup.jpeg";
import Fight from "../images/fight.jpeg";
import Miguel from "../images/miguel.jpeg";
import Jogo from "../images/Jogoat.jpeg";
import Toji from "../images/Toji.jpeg";
import Sukuna from "../images/Sukuna.jpeg";

const Levels = () => {
    const [levels, setLevels] = useState([
        {
            name: "Tutorial",
            image: {Thumbsup},
            level: 1,
            description: "Get an introduction into how Hollow Blue works.",
            locked: false,
            score: ""
        },
        {
            name: "Level 2",
            image: {Fight},
            level: 2,
            description: "Defeat the base level on your own.",
            locked: true,
            score: ""
        },
        {
            name: "Miguel",
            image: {Miguel},
            level: 3,
            description: "A much more formidable foe has introduced himself...",
            locked: true,
            score: ""
        },
        {
            name: "Level 4",
            image: {Fight},
            level: 4,
            description: "Defeat the base level on your own.",
            locked: true,
            score: ""
        },
        {
            name: "Level 5",
            image: {Fight},
            level: 5,
            description: "Defeat the base level on your own.",
            locked: true,
            score: ""
        },
        {
            name: "Level 6",
            image: {Fight},
            level: 6,
            description: "Defeat the base level on your own.",
            locked: true,
            score: ""
        },
        {
            name: "Level 7",
            image: {Fight},
            level: 7,
            description: "Defeat the base level on your own.",
            locked: true,
            score: ""
        },
        {
            name: "Level 8",
            image: {Fight},
            level: 8,
            description: "Defeat the base level on your own.",
            locked: true,
            score: ""
        },
        {
            name: "Level 9",
            image: {Fight},
            level: 9,
            description: "Defeat the base level on your own.",
            locked: true,
            score: ""
        },
        {
            name: "Jogo",
            image: {Jogo},
            level: 10,
            description: "A disaster curse comes to torment your student.",
            locked: true,
            score: ""
        },
        {
            name: "Level 11",
            image: {Fight},
            level: 11,
            description: "Defeat the base level on your own.",
            locked: true,
            score: ""
        },
        {
            name: "Level 12",
            image: {Fight},
            level: 12,
            description: "Defeat the base level on your own.",
            locked: true,
            score: ""
        },
        {
            name: "Level 13",
            image: {Fight},
            level: 13,
            description: "Defeat the base level on your own.",
            locked: true,
            score: ""
        },
        {
            name: "Level 14",
            image: {Fight},
            level: 14,
            description: "Defeat the base level on your own.",
            locked: true,
            score: ""
        },
        {
            name: "Toji",
            image: {Toji},
            level: 15,
            description: "The one who left it all behind comes to challenge you.",
            locked: true,
            score: ""
        },
        {
            name: "Level 16",
            image: {Fight},
            level: 16,
            description: "Defeat the base level on your own.",
            locked: true,
            score: ""
        },
        {
            name: "Level 17",
            image: {Fight},
            level: 17,
            description: "Defeat the base level on your own.",
            locked: true,
            score: ""
        },
        {
            name: "Level 18",
            image: {Fight},
            level: 18,
            description: "Defeat the base level on your own.",
            locked: true,
            score: ""
        },
        {
            name: "Level 19",
            image: {Fight},
            level: 19,
            description: "Defeat the base level on your own.",
            locked: true,
            score: ""
        },
        {
            name: "Sukuna",
            image: {Sukuna},
            level: 20,
            description: "The strongest sorcerer in history vs The strongest sorcerer.",
            locked: true,
            score: ""
        }
    ])

    const navigate = useNavigate();

    const [scrollToRight, setScrollToRight] = useState(false);
    const [scrollToLeft, setScrollToLeft] = useState(false);
    const [rows, setRows] = useState(4);
    const [cardsPerRow, setCardsPerRow] = useState(1); // State to hold the number of cards per row
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    const dispatcher = useDispatch();

    useEffect(() => {
        const handleResize = () => {
            const screenWidth = window.innerWidth;

            if (screenWidth >= 1284) {
                setCardsPerRow(4);
            } else if (screenWidth >= 768) {
                setCardsPerRow(2);
            } else {
                setCardsPerRow(1);
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize); // Remove event listener on component unmount
        };
    }, [screenWidth]);

    // const rows = Math.ceil(levels.length / cardsPerRow);

    useEffect(() => {
        setRows(Math.ceil(levels.length / cardsPerRow));
    }, [levels, cardsPerRow]);

    console.log(rows)

    const scrollRight = () => {
        window.scrollTo({
            left: window.pageXOffset + window.innerWidth,
            behavior: 'smooth'
        });
    }

    const scrollLeft = () => {
        window.scrollTo({
            left: window.pageXOffset - window.innerWidth,
            behavior: 'smooth'
        });
    }

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollX >= (rows) * window.innerWidth) {
                setScrollToRight(false);
            } else {
                setScrollToRight(true);
            }

            if (window.scrollX < window.innerWidth) {
                setScrollToLeft(false);
            } else {
                setScrollToLeft(true);
            }
        });

        const userId = localStorage.getItem('id');
        const url = `http://localhost/api/v1/Score/${userId}`;

        GetRequest(url)
            .then(data => {
                console.log(data);
                const maxLevel = data.max_level;
                const scores = data.scores;

                const updatedLevels = levels.map(level => {
                    if (level.level <= maxLevel) {
                        level.locked = false;
                    }

                    const score = scores[level.level-1];
                    if (score) {
                        level.score = score.stars;
                    }

                    return level;
                });

                setLevels(updatedLevels);
            })
            .catch(error => {
                // Handle errors here
                console.error(error);
            });

        console.log(scrollToLeft, scrollToRight)
    }, []);



    // document.body.style.overflowX = 'hidden';

    return (
        <div className="relative flex flex-row justify-center items-center h-screen p-10">
            <div
                className = "fixed top-5 left-5 cursor-pointer"
                onClick = {() => navigate("/Dashboard")}
            >
                <FaArrowLeft className = "text-3xl"/>
            </div>
            {scrollToRight &&
                <div
                    className = "fixed right-5 top-1/2 rounded-full bg-white p-[4px] hover:bg-sky-300 transition duration-300 cursor-pointer shadow-lg z-50"
                    onClick={scrollRight}
                >
                    <MdOutlineArrowForwardIos className = "text-3xl"/>
                </div>
            }
            {scrollToLeft &&
                <div
                    className = "fixed left-5 top-1/2 rounded-full bg-white p-[4px] hover:bg-sky-300 transition duration-300 cursor-pointer shadow-lg z-50"
                    onClick={scrollLeft}
                >
                    <MdOutlineArrowBackIos className = "text-3xl"/>
                </div>
            }
            {[...Array(rows)].map((_, i) => {
                const startIndex = i * cardsPerRow;
                const endIndex = Math.min(startIndex + cardsPerRow, levels.length);
                const rowLevels = levels.slice(startIndex, endIndex);

                console.log(rowLevels)

                return (
                    <div className={`grid grid-cols-${cardsPerRow} w-screen  absolute transform gap-4 p-10 translate-x-[${i * 100}%]`} key={i}>
                        {rowLevels.map((level, index) => (
                            <div className={level.locked ? "pointer-events-none" : ""} key={index}>
                                <Level
                                    name={level.name}
                                    image={Object.values(level.image)[0]}
                                    level={level.level}
                                    description={level.description}
                                    locked={level.locked}
                                    score={level.score}
                                    disabled={level.locked}
                                />
                            </div>
                        ))}
                    </div>
                );
            })}
        </div>
    );
};

export default Levels;