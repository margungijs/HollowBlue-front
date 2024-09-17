import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    score: 0,
    level: 0,
    maxScore: 0
}

export const score = createSlice({
    name: "score",
    initialState,
    reducers: {
        setMaxScore: (state, action) => {
            state.maxScore = action.payload
        },
        setScore1: (state, action) => {
            state.score = state.score + action.payload
        },
        setLevel: (state, action) => {
            state.level = action.payload
        }
    }
})

export const { setMaxScore, setScore1, setLevel } = score.actions;

export default score.reducer;