import {createSlice} from "@reduxjs/toolkit";
import Thumbsup from "../images/thumbsup.jpeg";
import Fight from "../images/fight.jpeg";
import Miguel from "../images/miguel.jpeg";
import Jogo from "../images/Jogoat.jpeg";
import Toji from "../images/Toji.jpeg";
import Sukuna from "../images/Sukuna.jpeg";

const initialState = {
    levels: [
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
        },
    ],
    active: ""
};

export const levels = createSlice({
    name: "levels",
    initialState,
    reducers: {

    }
})

export const { setActiveLevel } = levels.actions

export default levels.reducer