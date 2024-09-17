import React from 'react';
import Login from "../components/Login.js";
import Register from "../components/Register.js";
import Background from "../images/jjk.jpeg";
import {useDispatch, useSelector} from "react-redux";

const LoginRegister = () => {

    const login = useSelector(state => state.login);

    return (
        <div>
            <img src={Background} alt="" className = "object-cover min-h-screen -z-10 fixed top-0"/>
            <div className = "flex items-center justify-center h-screen w-screen">
                <div className = "border-[1px] border-[rgba(255, 255, 255, .2)] lg:w-2/6 md:4/6 w-11/12 flex justify-center items-center h-fit overflow-hidden backdrop-blur-sm rounded-lg text-white py-10 shadow-lg">
                    <div className={`min-w-full transform ${login.form === 0 ? "translate-x-[50%]" : "-translate-x-[40%]"} duration-300 min-h-full`}>
                        <Login />
                    </div>
                    <div className={`min-w-full transform ${login.form === 1 ? "translate-x-[-50%]" : "translate-x-[60%]"} duration-300 min-h-full`}>
                        <Register />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginRegister;