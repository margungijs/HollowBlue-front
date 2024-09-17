import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    token: "",
    id: "",
    name: "",
}

export const authorised = createSlice({
    name: "authorised",
    initialState,
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload
        },
        setId: (state, action) => {
            state.id = action.payload
        },
        setUsername: (state, action) => {
            state.name = action.payload
        }
    }
})

export const { setToken, setId, setUsername } = authorised.actions;

export default authorised.reducer;