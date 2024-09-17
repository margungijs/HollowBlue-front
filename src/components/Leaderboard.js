import React, {useEffect, useState} from 'react';
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import Entry from "./Entry"
import GetRequest from "../reuse/GetRequest";

const Leaderboard = () => {
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState([]);
    const [currentLevel, setCurrentLevel] = useState(4);
    const displayOptions = ['Over-all', 'Number', 'Word', 'Card', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

    const incrementLevel = () => {
        setCurrentLevel(currentLevel > 23 ? 24 : currentLevel + 1)
    };

    const decrementLevel = () => {
        setCurrentLevel(currentLevel < 1 ? 0 : currentLevel - 1);
    };

    const filterByLevel = () => {
        if (currentLevel === 0) {
            const groupedScores = data.reduce((acc, score) => {
                const userId = score.user[0].id;
                const userName = score.user[0].name;
                if (!acc[userId]) {
                    acc[userId] = {
                        username: userName,
                        totalScore: 0,
                    };
                }
                acc[userId].totalScore += score.score; // Accumulate score
                return acc;
            }, {});

            const sortedScoresArray = Object.entries(groupedScores)
                .filter(([, userData]) => userData.totalScore > 0) // Filter out users with total score of 0
                .sort(([, a], [, b]) => b.totalScore - a.totalScore);

            const sortedGroupedScores = [];
            sortedScoresArray.forEach(([, userData]) => {
                sortedGroupedScores.push(userData);
            });

            sortedGroupedScores.sort((a, b) => b.totalScore - a.totalScore);

            setFilter(sortedGroupedScores);
        } else if (currentLevel >= 1 && currentLevel <= 3) {
            const groupedScoresByType = data.reduce((acc, score) => {
                const userId = score.user[0].id;
                const userName = score.user[0].name;
                if (!acc[userId]) {
                    acc[userId] = {
                        username: userName,
                        totalScore: 0,
                    };
                }
                if (score.type === currentLevel) {
                    acc[userId].totalScore += score.score; // Accumulate score only if type matches currentLevel
                }
                return acc;
            }, {});

            const sortedScoresArray = Object.entries(groupedScoresByType)
                .filter(([, userData]) => userData.totalScore > 0) // Filter out users with total score of 0
                .sort(([, a], [, b]) => b.totalScore - a.totalScore);

            const sortedGroupedScores = [];
            sortedScoresArray.forEach(([, userData]) => {
                sortedGroupedScores.push(userData);
            });

            sortedGroupedScores.sort((a, b) => b.totalScore - a.totalScore);

            setFilter(sortedGroupedScores);
        } else {
            setFilter(data.filter(item => item.level === currentLevel - 3));
        }

    }

    useEffect(() => {
        filterByLevel()
    }, [currentLevel])

    useEffect(() => {
        setFilter(data.filter(item => item.level === 1))
    }, [data])

    useEffect(() => {
        GetRequest("http://localhost/api/v1/Leaderboard/")
            .then(response => {
                console.log(response.scores);
                setData(response.scores)
                console.log(filter)
            })
            .catch(error => {
                console.error(error);
            });
    }, [])

    return (
        <div className="flex flex-col bg-white rounded-lg shadow-lg lg:w-3/5 w-full items-center h-full lg:p-10 p-2 overflow-hidden ">
            <h1 className="lg:text-5xl text-2xl mb-4">Leaderboard</h1>
            <div className="w-full flex justify-center relative items-center mb-6">
                {currentLevel > 0 && <FaArrowLeft className="text-2xl cursor-pointer" onClick={decrementLevel} />}
                <h1 className="text-3xl text-center lg:mx-10 mx-4">{currentLevel < 4 ? "" : "Level"} {displayOptions[currentLevel]}</h1>
                {currentLevel < 23 && <FaArrowRight className="text-2xl cursor-pointer" onClick={incrementLevel} />}
            </div>
            <div className={`w-full ${Object.entries(filter).length > 0 && "overflow-y-auto"}`}>
                {Object.entries(filter).length === 0 ? (
                    <div className = "flex-grow flex flex-col justify-center items-center">
                        <h1 className = "text-neutral-600 text-4xl text-center">No one has yet to beat this round</h1>
                    </div>
                ) : (
                    Object.entries(filter).map(([userId, userData]) => (
                        <React.Fragment key={userId}>
                            {currentLevel >= 4 ? (
                                <Entry username={userData.user[0].name} score={userData.score} stars={Math.floor(userData.score / userData.max_score) * 5} />
                            ) : (
                                <Entry username={userData.username} score={userData.totalScore} />
                            )}
                        </React.Fragment>
                    ))
                )}

            </div>
        </div>

    );
};

export default Leaderboard;
