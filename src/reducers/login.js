import { createSlice } from "@reduxjs/toolkit";
import { empty, errorCheck, touched } from "../validations";

const initialState = {
    login: {
        name: "",
        password: ""
    },
    error: {
        name: "",
        password: "",
    },
    form: 0,
    send: false
};



export const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        addUser: (state, action) => {
            state.login.name = action.payload;
            state.error.name = empty(action.payload) ? "User field cannot be empty" : "";
        },
        addPassword: (state, action) => {
            state.login.password = action.payload;
            state.error.password = empty(action.payload) ? "Password cannot be empty" : "";
        },
        setTouched: (state) => {
            touched(state.login, state.error);
        },
        changeForm: (state, action) => {
            state.form = action.payload;
        }
    }
});

export const { addUser, addPassword, changeForm, setTouched } = loginSlice.actions;

export default loginSlice.reducer;
