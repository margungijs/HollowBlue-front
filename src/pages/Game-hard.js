import React, { useState, useEffect } from 'react';

function GameHard({ level }) {
    const numCards = level * 3; // Adjust the number of cards based on the level

    const [cards, setCards] = useState([]);

    useEffect(() => {
        const shuffledCards = shuffle([...Array(numCards).keys()].map(n => n % (numCards / 3) + 1));
        const newCards = shuffledCards.map(value => ({ value, position: { x: 0, y: 0 } })); // Initialize with dummy positions
        setCards(newCards);

        const timer = setTimeout(() => {
            setOpen(Array(numCards).fill(false));
        }, 1000);

        // Generate positions for each card
        newCards.forEach((card, index) => {
            let newPosition;
            const yMin = window.innerHeight * 0.2; // Adjust the percentage as needed
            do {
                newPosition = { x: Math.random() * (window.innerWidth - 100), y: yMin + Math.random() * (window.innerHeight - yMin - 100) };
            } while (newCards.some((otherCard, i) => i !== index && Math.abs(otherCard.position.x - newPosition.x) < 100 && Math.abs(otherCard.position.y - newPosition.y) < 100));
            newCards[index].position = newPosition;
        });

        return () => clearTimeout(timer);
    }, [numCards]);

    const [open, setOpen] = useState(Array(numCards).fill(true));
    const [locked, setLocked] = useState(Array(numCards).fill(false));
    const [lastIndexes, setLastIndexes] = useState([]);

    function handleClick(i) {
        if (locked[i]) return;
        setOpen(o => {
            const newOpen = [...o];
            newOpen[i] = true;
            return newOpen;
        });

        if (lastIndexes.length === 2) {
            if (cards[i].value === cards[lastIndexes[0]].value && cards[i].value === cards[lastIndexes[1]].value) {
                setLocked(l => {
                    const newLocked = [...l];
                    newLocked[i] = true;
                    newLocked[lastIndexes[0]] = true;
                    newLocked[lastIndexes[1]] = true;
                    return newLocked;
                });
                setLastIndexes([]);
            } else {
                setTimeout(() => {
                    setOpen(o => {
                        const newOpen = [...o];
                        newOpen[i] = false;
                        newOpen[lastIndexes[0]] = false;
                        newOpen[lastIndexes[1]] = false;
                        return newOpen;
                    });
                    setLastIndexes([]);
                }, 1000);
            }
        } else {
            setLastIndexes(l => [...l, i]);
        }
    }

    return (
        <div className="relative w-screen h-screen">
            <h1 className = "fixed top-6 left-10 text-4xl">Points: </h1>
            {cards.map((card, i) => (
                <div
                    key={i}
                    className={`absolute w-16 h-16 flex items-center justify-center ${open[i] ? 'bg-blue-500' : 'bg-blue-900'} ${locked[i] ? 'bg-green-500' : ''}`}
                    style={{ top: card.position.y, left: card.position.x }}
                    onClick={() => handleClick(i)}
                >
                    {open[i] && card.value}
                </div>
            ))}
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


export default GameHard;
