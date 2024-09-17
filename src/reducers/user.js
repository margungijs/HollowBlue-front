import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {noSymbol, empty, emailCheck, passwords, touched, errorCheck, lengthCheck} from "../validations";
import {useDispatch} from "react-redux";

const initialState = {
    user: {
        name: "",
        email: "",
        password: "",
        passwordc: "",
    },
    error: {
        name: "",
        email: "",
        password: "",
        passwordc: "",
    },
    success: {
        test: ""
    }
}

// export const sendData = createAsyncThunk(
//     'user/sendData',
//     async (_, { getState }) => {
//         const { user } = getState();
//         try {
//             const response = await fetch('http://localhost/api/v1/User/', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(user.user),
//             });
//
//             const data = await response.json();
//             // Handle the response data as needed
//             console.log('Response data:', data);
//             return data; // Return data to handle in a success case
//         } catch (error) {
//             console.error('Error during POST request:', error.message);
//             throw error; // Throw the error to handle in a failure case
//         }
//     }
// );


export const user = createSlice({
    name: "user",
    initialState,
    reducers: {
        addUser: (state, action) => {
            state.user.name = action.payload
            if(empty(action.payload)){
                state.error.name = "User field cannot be empty"
            }else if(lengthCheck(action.payload)){
                state.error.name = "Username too short"
            }else if(noSymbol(action.payload)){
                state.error.name = "User field cannot have symbols"
            }else{
                state.error.name = ""
            }
        },
        addEmail: (state, action) => {
            state.user.email = action.payload
            if(empty(action.payload)){
                state.error.email = "Email field cannot be empty"
            }else if(emailCheck(action.payload)){
                state.error.email = "Email field is invalid"
            }else{
                console.log('here');
                state.error.email = ""
            }
        },
        addPassword: (state, action) => {
            state.user.password = action.payload
            if(empty(action.payload)){
                state.error.password = "Password field cannot be empty"
            }else{
                state.error.password = ""
            }
        },
        addPasswordc: (state, action) => {
            state.user.passwordc = action.payload
            if(empty(action.payload)) {
                state.error.passwordc = "Password confirmation field cannot be empty"
            }else if(!passwords(state.user.password, action.payload)){
                state.error.passwordc = "Passwords dont match"
            }else{
                state.error.passwordc = ""
            }
        },
        testValues: (state) => {
            touched(state.user, state.error);
            errorCheck(state.error) ?
                console.log("bad") :
                fetch('http://localhost/api/v1/User/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(state.user),
                })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        return response.json();
                    })
                    .then(data => {
                        console.log('Success:', data);
                        // Dispatch other actions or update state as needed
                    })
                    .catch(error => {
                        console.error('Error during POST request:', error);
                        // Dispatch error actions or update state as needed
                    });
        },
    },
})

export const { addUser, addEmail, addPassword, addPasswordc, testValues } = user.actions;

export default user.reducer;