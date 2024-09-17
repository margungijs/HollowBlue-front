import React, {useEffect, useState} from 'react';
import { FaHome, FaUser } from "react-icons/fa";
import { PiSword } from "react-icons/pi";
import { MdLeaderboard } from "react-icons/md";
import { TbLogout2 } from "react-icons/tb";
import {useNavigate} from "react-router-dom";
import {observer} from "../reuse/Observer";
import Base from "../components/Base";
import Leaderboard from "../components/Leaderboard";
import Profile from "../components/Profile";
import Background1 from "../images/Background1.jpeg"
import Background4 from "../images/Background4.jpeg"
import Background5 from "../images/Background5.jpeg"
import GetRequest from "../reuse/GetRequest";

const Dashboard = () => {
    const [profile, setProfile] = useState([]);

    const navigate = useNavigate();

    const [screen, setScreen] = useState(1)

    useEffect(() => {

        const hiddenElements = document.querySelectorAll('.hidden-animate');
        hiddenElements.forEach((el) => observer.observe(el));

        const hiddenElementsTop = document.querySelectorAll('.hidden-animate-top');
        hiddenElementsTop.forEach((el) => observer.observe(el));

        return () => {
            hiddenElements.forEach((el) => observer.unobserve(el));
            hiddenElementsTop.forEach((el) => observer.observe(el));
        };
    }, [])

    useEffect(() => {
        const userId = localStorage.getItem('id');
        const url = `http://localhost/api/v1/Profile/${userId}`;

        GetRequest(url)
            .then(data => {
                console.log(data);
                setProfile(data.user);
            })
            .catch(error => {
                console.error(error);
            });
    }, [])

    document.body.style.overflowY = 'hidden';


    return (
        <div className="bg-neutral-100 h-screen lg:p-10 p-2 flex flex-row" style={{ backgroundImage: `url(${Background5})`, backgroundSize: 'cover' }}>
            <div className="grid grid-rows-5 mb-6 lg:mb-0 w-1/12 h-1/12 lg:gap-6 gap-2 lg:h-full mr-10">
                <div
                    className = "bg-white p-2 hover:bg-green-100 rounded-lg shadow-lg flex items-center justify-center hidden-animate dashboard-box cursor-pointer"
                    onClick = {() => setScreen(1)}
                >
                    <FaHome className = "lg:text-7xl text-4xl text-green-500"/>
                </div>
                <div
                    className = "bg-white p-2 hover:bg-red-100 rounded-lg shadow-lg flex items-center justify-center hidden-animate dashboard-box cursor-pointer"
                    onClick = {() => navigate('/Levels')}
                >
                    <PiSword className = "lg:text-7xl text-4xl text-red-500"/>
                </div>
                <div
                    className = "bg-white p-2 hover:bg-sky-100 rounded-lg shadow-lg flex items-center justify-center hidden-animate dashboard-box cursor-pointer"
                    onClick = {() => setScreen(2)}
                >
                    <MdLeaderboard className = "lg:text-7xl text-4xl text-sky-500"/>
                </div>
                <div
                    className = "bg-white p-2 hover:bg-orange-100 rounded-lg shadow-lg flex items-center justify-center hidden-animate dashboard-box cursor-pointer"
                    onClick = {() => setScreen(3)}
                >
                    <FaUser className = "lg:text-7xl text-4xl text-orange-500"/>
                </div>
                <div
                    className = "bg-white p-2 hover:bg-neutral-100 rounded-lg shadow-lg flex items-center justify-center hidden-animate dashboard-box cursor-pointer"
                    onClick = {() => {localStorage.clear(); navigate('/')}}
                >
                    <TbLogout2 className = "lg:text-7xl text-4xl text-black"/>
                </div>
            </div>
            <div className = "flex-grow h-full flex flex-col items-center hidden-animate-top overflow-hidden">
                <div className = {`h-full absolute duration-1000 transform translate-y-[${screen === 1 ? 0 : -100}%]`}>
                    <Base data = {profile} />
                </div>
                <div className = {`h-full flex absolute flex-col items-center w-full duration-1000 transform translate-y-[${screen === 2 ? 0 : 100}%]`}>
                    <Leaderboard />
                </div>
                <div className = {`h-full flex flex-col absolute items-center w-full duration-1000 transform translate-x-[${screen === 3 ? 0 : 100}%]`}>
                    <Profile data = {profile} />
                </div>
            </div>

        </div>
    );
};

export default Dashboard;