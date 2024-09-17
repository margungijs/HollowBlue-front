import {configureStore} from "@reduxjs/toolkit";
import userReducer from "./reducers/user.js";
import loginReducer from "./reducers/login.js";
import authorisedReducer from "./reducers/authorised";
import scoreReducer from "./reducers/score";
import levelsReducer from "./reducers/levels";

export const store = configureStore({
    reducer: {
        user: userReducer,
        login: loginReducer,
        authorised: authorisedReducer,
        score: scoreReducer,
        levels: levelsReducer
    },
});

