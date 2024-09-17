import React, {useState, useEffect} from 'react';
import Input from "../reuse/Input";
import {useDispatch, useSelector} from "react-redux";
import {changeForm, addUser, addPassword, setTouched} from "../reducers/login";
import {errorCheck, touched} from "../validations";
import {HandleInputChange} from "../reuse/HandleInputChange";
import SendData from "../reuse/SendData";
import {useNavigate} from "react-router-dom";
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';

const Login = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [login, setLogin] = useState({
        name: "",
        password: ""
    })

    const [error, setError] = useState({
        name: "",
        password: ""
    })

    const [forceUpdate, setForceUpdate] = useState(false);

    const send = async () => {
        touched(login, error)
        setForceUpdate(prevState => !prevState)
        if(!errorCheck(error)){
            SendData(login, "http://localhost/api/v1/Auth/")
                .then(response => {
                    console.log('Data sent successfully:', response);
                    if(response.token){
                        localStorage.setItem('token', response.token);
                        localStorage.setItem('id', response.id);
                        navigate('/Dashboard');
                    }else if(response.error){
                        setError({
                            name: "Username not found.",
                        });
                    }else{
                        setError({
                            password: "Incorrect password.",
                        });
                    }
                })
                .catch(error => {
                    console.error('Error sending data:', error.message);

                });
        }
    }

    function parseJwt(token) {
        try {
            return JSON.parse(atob(token.split('.')[1]));
        } catch (e) {
            return null;
        }
    }

    const HandleGoogle = async (response) => {
        console.log('Google login successful! Access Token:', response);

        try {
            // Decode the JWT token to extract user information
            const jwtPayload = parseJwt(response.credential);

            // Check if the payload contains the necessary user information
            if (jwtPayload && jwtPayload.name && jwtPayload.email) {
                const name = jwtPayload.name.replace(/\s/g, '');
                const email = jwtPayload.email;

                console.log('User Name:', name);
                console.log('User Email:', email);

                fetch("http://localhost/api/v1/GoogleAuth/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name,
                        email,
                    }),
                })
                    .then((response) => response.json())
                    .then((data) => {
                        console.log(data);
                        if(data.token){
                            localStorage.setItem('token', data.token);
                            navigate("/Dashboard");
                        }
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            } else {
                throw new Error('Failed to extract user information from JWT payload');
            }
        } catch (error) {
            console.error('Error extracting user information', error.message);
        }
    };

    const handleError = (error) => {
        console.error('Google login error:', error);
    };


    return (
        <GoogleOAuthProvider clientId = "595584622035-tij0prbjuero5q1s7mfne319mj1arv52.apps.googleusercontent.com">
            <div className = "flex flex-col items-center w-full">
                <h1 className = "text-5xl mb-10 text-black">Login</h1>
                <Input
                    label = "Username"
                    type = "0"
                    value = {login.name}
                    onChange = {(e) => HandleInputChange(e, setLogin, setError)}
                    error = {error.name}
                    name = "name"
                />
                <Input
                    label = "Password"
                    type = "0"
                    value = {login.password}
                    onChange = {(e) => HandleInputChange(e, setLogin, setError)}
                    error = {error.password}
                    name = "password"
                />
                <button className = "bg-white text-lg text-black w-4/5 rounded-xl py-[8px] hover:bg-sky-300 transition duration-300 mb-4" onClick={() => send()}>Log in</button>
                <p className = "font-normal ">Don't have an account? <strong className = "font-medium cursor-pointer hover:text-blue-100 transition duration-300" onClick = {() => dispatch(changeForm(1))}>Register</strong></p>
                <div className = "flex justify-center mt-6">
                    <GoogleLogin onSuccess={HandleGoogle} onError={handleError} />
                </div>
            </div>
        </GoogleOAuthProvider>
    );
};

export default Login;
