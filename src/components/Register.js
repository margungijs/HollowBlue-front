import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import Input from "../reuse/Input";
import { addUser, addEmail, addPassword, addPasswordc, testValues } from "../reducers/user";
import {changeForm} from "../reducers/login";
import {HandleInputChange} from "../reuse/HandleInputChange";
import {useNavigate} from "react-router-dom";
import {errorCheck, passwords, touched} from "../validations";
import SendData from "../reuse/SendData";
import {setQuaternionFromProperEuler} from "three/src/math/MathUtils";


const Register = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [forceUpdate, setForceUpdate] = useState(false);


    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        passwordc: ""
    })

    const [error, setError] = useState({
        name: "",
        email: "",
        password: "",
        passwordc: ""
    })

    const send = () => {
        touched(user, error);
        setForceUpdate(prevState => !prevState)
        if (!errorCheck(error)) {
            SendData(user, "http://localhost/api/v1/User/")
                .then(response => {
                    console.log('Data sent successfully:', response);
                    if (response.errors) {
                        const errorObject = Object.entries(response.errors).reduce((acc, [key, value]) => {
                            if (key === 'passwordc') {
                                acc[key] = 'Passwords don\'t match.';
                            } else {
                                acc[key] = value[0];
                            }
                            return acc;
                        }, {});
                        setError(errorObject)
                    } else {
                        setUser({
                            name: "",
                            email: "",
                            password: "",
                            passwordc: ""
                        });

                        setError({
                            name: "",
                            email: "",
                            password: "",
                            passwordc: ""
                        });
                    }
                })
                .catch(error => {
                    console.error('Error sending data:', error.message);
                });
        }

    }


    return (
        <div className = "flex flex-col items-center w-full">
            <h1 className = "text-5xl mb-10 text-black">Register</h1>
            <Input
                label = "Username"
                type = "1"
                value = {user.name}
                onChange = {(e) => HandleInputChange(e, setUser, setError)}
                error = {error.name}
                name = "name"
            />
            <Input
                label = "Email"
                type = "1"
                value = {user.email}
                onChange = {(e) => HandleInputChange(e, setUser, setError)}
                error = {error.email}
                name = "email"
            />
            <Input
                label = "Password"
                type = "1"
                value = {user.password}
                onChange = {(e) => HandleInputChange(e, setUser, setError)}
                error = {error.password}
                name = "password"
            />
            <Input
                label = "Confirm password"
                type = "1"
                value = {user.passwordc}
                onChange = {(e) => HandleInputChange(e, setUser, setError)}
                error = {error.passwordc}
                name = "passwordc"
            />
            <p className = "mb-4 font-normal text-lg text-right w-4/5 cursor-pointer hover:text-blue-100 transition duration-300">Forgot password?</p>
            <button className = "bg-white text-lg text-black w-4/5 rounded-xl py-[8px] hover:bg-sky-300 transition duration-300 mb-4" onClick={() => {send(); console.log(user); console.log(error)}} >Create account</button>
            <p className = "font-normal ">Already have an account? <strong className = "font-medium cursor-pointer hover:text-blue-100 transition duration-300" onClick = {() => dispatch(changeForm(0))}>Log in</strong></p>
        </div>
    );
};

export default Register;