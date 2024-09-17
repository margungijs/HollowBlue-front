import React, { useState } from 'react';

function ClickDetector() {
    const [box1Clicked, setBox1Clicked] = useState(false);
    const [box2Clicked, setBox2Clicked] = useState(false);
    const [box3Clicked, setBox3Clicked] = useState(false);

    const handleClick = (event) => {
        const { clientX, clientY } = event;

        // Define the expanded radius you want for the click
        const expandedRadius = 50; // Adjust this value according to your needs

        // Get the center coordinates of each box
        const box1Rect = document.getElementById('box1').getBoundingClientRect();
        const box1CenterX = box1Rect.left + box1Rect.width / 2;
        const box1CenterY = box1Rect.top + box1Rect.height / 2;

        const box2Rect = document.getElementById('box2').getBoundingClientRect();
        const box2CenterX = box2Rect.left + box2Rect.width / 2;
        const box2CenterY = box2Rect.top + box2Rect.height / 2;

        const box3Rect = document.getElementById('box3').getBoundingClientRect();
        const box3CenterX = box3Rect.left + box3Rect.width / 2;
        const box3CenterY = box3Rect.top + box3Rect.height / 2;

        // Calculate the distance between click coordinates and center of each box
        const distanceToBox1 = Math.sqrt((clientX - box1CenterX) ** 2 + (clientY - box1CenterY) ** 2);
        const distanceToBox2 = Math.sqrt((clientX - box2CenterX) ** 2 + (clientY - box2CenterY) ** 2);
        const distanceToBox3 = Math.sqrt((clientX - box3CenterX) ** 2 + (clientY - box3CenterY) ** 2);

        // Check if the click falls within the expanded radius of any box
        if (distanceToBox1 <= expandedRadius) {
            setBox1Clicked(true);
        }
        if (distanceToBox2 <= expandedRadius) {
            setBox2Clicked(true);
        }
        if (distanceToBox3 <= expandedRadius) {
            setBox3Clicked(true);
        }
    };

    return (
        <div>

        </div>
    );
}

export default ClickDetector;
