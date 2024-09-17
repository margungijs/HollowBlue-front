import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from "swiper/modules";
import 'swiper/swiper-bundle.css'; // Import Swiper bundle CSS
import {observer} from "../reuse/Observer";
import Gojo from "../images/gojo.jpeg";
import Minato from "../images/Minato.jpeg";
import Tanjiro from "../images/tanjiro.jpeg";
import Purple from "../images/hollow-purple.jpeg";
import Purple1 from "../images/Purple1.png";
import Void from "../images/InfiniteVoid.jpeg";
import Riko from "../images/Riko.jpeg";
import Sharingan from "../images/sharingan.jpeg";
import Katana from "../images/Katana.jpeg";
import Path from "../components/Path.js";
import Honored from "../images/Honored-one.jpeg";
import Itachi from "../images/Itachi.jpeg";
import Tanjiro1 from "../images/Tanjiro-path.jpeg";
import SixEyes from "../images/sixeyes.jpeg";
import LandingGuide from "../components/Landing-Guide";
import YoungItachi from "../images/YoungItachi.jpeg";
import Amaterasu from "../images/Amaterasu.jpeg";
import Susanoo from "../images/Susanoo.jpeg";
import Death from "../images/Death.png";
import Nirichin from "../images/Nirichin.jpeg";
import Nezuko from "../images/Nezuko.jpeg";
import Sun from "../images/SunBreathing.jpeg";

import { TbArrowNarrowDown, TbArrowNarrowUp } from "react-icons/tb";
import {useNavigate} from "react-router-dom";

const Landing = () => {
    const colors = ["text-blue-400", "text-red-400", "text-orange-400"]; // Define an array of colors
    const [currentColorIndex, setCurrentColorIndex] = useState(0); // Initial color index
    const [scrollToTop, setScrollToTop] = useState(false);
    const [scrollToDown, setScrollToDown] = useState(false);

    const updateColor = () => {
        setCurrentColorIndex((prevIndex) => (prevIndex + 1) % colors.length); // Cycle through the colors array using modulo operator
    };

    const navigate = useNavigate()

    useEffect(() => {

        window.addEventListener("scroll", () => {
            if(window.scrollY > window.innerHeight - 5){
                setScrollToTop(true);
            }else{
                setScrollToTop(false);
            }

            if(window.scrollY + window.innerHeight < document.documentElement.scrollHeight){
                setScrollToDown(true);
            }else{
                setScrollToDown(false);
            }
        })

        const intervalId = setInterval(updateColor, 5100);

        // Clear the interval on component unmount

        const hiddenElements = document.querySelectorAll('.hidden-animate');
        hiddenElements.forEach((el) => observer.observe(el));

        return () => {
            hiddenElements.forEach((el) => observer.unobserve(el));
            clearInterval(intervalId);
        };
    }, []);

    const scrollUp = () => {
        window.scrollTo({
            top: (window.scrollY - window.innerHeight),
            behavior: "smooth"
        });
    }

    const scrollDown = () => {
        window.scrollTo({
            top: (window.scrollY + window.innerHeight),
            behavior: "smooth"
        });
    }

    const data = [
        [
            {
                name: "Six-eyes",
                description: "The pinnacle of perception. You have the power to see the flow of the battle, even the tiniest bits that go unnoticed by others.",
                image: SixEyes
            },
            {
                name: "Limitless",
                description: "An inherited technique that lets you bring Infinity to reality, letting you manipulate and distort space at will.",
                image: Purple1
            },
            {
                name: "Infinite Void",
                description: "Your innate technique brought fully into reality. You bombard your opponent with an infinite amount of information, turning the scales of battle in your favor.",
                image: Void
            },
            {
                name: "The Curse of Being The Strongest",
                description: "With immense strength comes immense responsibility. You shoulder the burdens of the World, but a human can only do so much...",
                image: Riko
            }
        ],
        [
            {
                name: "Talent",
                description: 'With your talent alone you are a force to be reckoned with. You blow the saying "Talent only takes you so far" out the water.',
                image: YoungItachi
            },
            {
                name: "Amaterasu",
                description: "The black flame that doesn't stop burning till it kills your opponent. You'll catch your opponent by surprise, but be wary of it's down-sides...",
                image: Amaterasu
            },
            {
                name: "Susanoo",
                description: "The perfect defense. You channel your chakra around you and the Susanoo fights on your behalf, making you unstoppable.",
                image: Susanoo
            },
            {
                name: "The Other Side of The Coin",
                description: "You are among the strongest, but your past haunts you and your body is starting to give up on yourself. The longer you live the harder it gets...",
                image: Death
            }
        ],
        [
            {
                name: "Nirichin blade",
                description: "Nirchin blades are powerful blades, made specifically for the purpose to slay demons.",
                image: Nirichin
            },
            {
                name: "Nezuko",
                description: "Your sister that became a demon still has a human side to her. Nezuko will come and aid you in battle whenever you need it most with her powerful demon abilities.",
                image: Nezuko
            },
            {
                name: "Sun breathing",
                description: "A legendary breathing style. You mimic the sun and replicate it with your movements, techniques and abilities to destroy your opponent, and manipulate solar flames.",
                image: Sun
            }
        ]
    ]

    return (
        <div className="flex flex-col justify-center items-center p-2 md:px-20 w-screen bg-neutral-50">
            {scrollToTop &&
                <div
                    className = "bg-white rounded-full fixed top-[20px] z-40 text-4xl left-1/2 transform -translate-x-1/2 cursor-pointer shadow-lg hover:bg-purple-200 duration-300 transition-all"
                    onClick = {scrollUp}
                >
                    <TbArrowNarrowUp />
                </div>
            }
            {scrollToDown &&
                <div
                    className = "animate-bounce bg-white rounded-full fixed bottom-[20px] z-40 text-4xl left-1/2 transform -translate-x-1/2 cursor-pointer shadow-lg hover:bg-purple-200 duration-300 transition-all"
                    onClick = {scrollDown}
                >
                    <TbArrowNarrowDown />
                </div>
            }
            <div className = "flex w-full h-screen justify-center">
                <div className="flex lg:flex-row flex-col w-full h-fit self-center" id="section-1">
                    <div className="lg:w-8/12 w-full order-2 lg:order-1">
                        <Swiper
                            className="hidden-animate shadow-lg"
                            modules={[Autoplay]}
                            spaceBetween={50}
                            slidesPerView={1}
                            autoplay={{
                                "delay": 5000,
                            }}
                            style={{
                                width: "100%",
                                height: "100%",
                            }}
                        >
                            <SwiperSlide>
                                <img src={Gojo} alt="" className="object-cover h-full rounded-lg" />
                            </SwiperSlide>
                            <SwiperSlide>
                                <img src={Tanjiro} alt="" className="object-cover h-full rounded-lg" />
                            </SwiperSlide>
                            <SwiperSlide>
                                <img src={Minato} alt="" className="object-cover h-full rounded-lg" />
                            </SwiperSlide>
                        </Swiper>
                    </div>
                    <div className="order-1 lg:order-2 lg:mb-0 mb-6">
                        <h1 className="hidden-animate text-5xl mb-10 lg:text-right text-center">Hollow <span className={`${colors[currentColorIndex]} transition duration-300`}>Blue</span>.</h1>
                        <p className="hidden-animate text-2xl text-center lg:text-right w-full">An anime based online arcade game with a wide range of surprises waiting for you.</p>
                    </div>
                </div>
            </div>
            <div className = "flex w-full h-screen justify-center">
                <div className = "flex lg:flex-row flex-col w-full h-fit self-center" id = "section-2">
                    <div className = "lg:mb-0 mb-6">
                        <p className = "text-2xl lg:text-left text-center hidden-animate delay-1000">With a wide range of challenges to conquer and new abilities to unleash, this truly is the start of your own anime character journey in your most beloved anime universes.</p>
                    </div>
                    <div className = "lg:w-8/12 w-full lg:ml-20">
                        <Swiper
                            className = "hidden-animate shadow-lg"
                            modules={[Autoplay]}
                            spaceBetween={50}
                            slidesPerView={1}
                            autoplay={{
                                "delay": 5000,
                            }}
                            style={{
                                width: "100%",
                                height: "100%",
                            }}
                        >
                            <SwiperSlide>
                                <img src={Purple} alt="" className = "object-cover w-full rounded-lg"/>
                            </SwiperSlide>
                            <SwiperSlide>
                                <img src={Sharingan} alt="" className = "object-cover w-full rounded-lg"/>
                            </SwiperSlide>
                            <SwiperSlide>
                                <img src={Katana} alt="" className = "object-cover w-full rounded-lg"/>
                            </SwiperSlide>
                        </Swiper>
                    </div>
                </div>
            </div>
            <div className = "flex flex-col w-full h-screen items-center md:py-20">
                <h1 className = "lg:text-7xl text-5xl hidden-animate lg:text-left text-center mb-6 ">Choose your path.</h1>
                <div className = "flex flex-row md:p-10 ">
                    <div className="flex flex-col justify-center items-center " style={{ alignContent: "stretch" }}>
                        <Path
                            title="The Honored One."
                            image={Honored}
                            description="Born with the six-eyes and limitless technique, you alone are the strongest, but that might be a curse in disguise."
                        />
                        {/*<Path*/}
                        {/*    title="The Clan Killer."*/}
                        {/*    image={Itachi}*/}
                        {/*    description="You killed your clan for a reason you thought was honorable, but your past is coming back to haunt you."*/}
                        {/*/>*/}
                        {/*<Path*/}
                        {/*    title="Tanjiro."*/}
                        {/*    image={Tanjiro1}*/}
                        {/*    description="You are as useless as they come, but the will of the Sun is within you."*/}
                        {/*/>*/}
                    </div>
                </div>
            </div>
            <div className = "flex flex-col w-full h-fit items-center py-20">
                <h1 className = "text-6xl lg:text-left text-center hidden-animate mb-10">Your Guide.</h1>
                <div className = "flex lg:flex-row flex-col w-full lg:mb-20">
                    <div className = "flex flex-col lg:w-5/12 lg:text-left mb-6 text-center hidden-animate">
                        <h1 className = "text-4xl text-sky-400 mb-6">The Honored One.</h1>
                        <p className = "text-2xl">You will be playing as Gojo Satoru. Born with the six-eyes and limitless innate technique, you are truly the force that drives the current world.</p>
                    </div>
                    <div className = "lg:w-7/12 w-full lg:ml-10">
                        <LandingGuide data = { data[0] }/>
                    </div>
                </div>
                {/*<div className = "flex flex-row w-full mb-20">*/}
                {/*    <div className = "w-7/12 mr-10">*/}
                {/*        <LandingGuide data = { data[1] }/>*/}
                {/*    </div>*/}
                {/*    <div className = "flex flex-col w-5/12 hidden-animate">*/}
                {/*        <h1 className = "text-4xl text-red-700 mb-6 text-right">The Clan Killer.</h1>*/}
                {/*        <p className = "text-2xl text-right">You will be playing as Itachi Uchiha. Born with unbeaten talent and, of course, the Sharingan. You rise through the ranks just to kill your clan. But your power and decision come back to bite you in the ass... </p>*/}
                {/*    </div>*/}
                {/*</div>*/}
                {/*<div className = "flex flex-row w-full mb-20">*/}
                {/*    <div className = "flex flex-col w-5/12 hidden-animate">*/}
                {/*        <h1 className = "text-4xl text-orange-400 mb-6 text-left">Tanjiro.</h1>*/}
                {/*        <p className = "text-2xl text-left">You will be playing as Tanjiro Kamado. Whilst living your life as a regular coal miner, on one destined day, the demons set a target on you and your family. This is where your journey begins. </p>*/}
                {/*    </div>*/}
                {/*    <div className = "w-7/12 mr-10">*/}
                {/*        <LandingGuide data = { data[2] }/>*/}
                {/*    </div>*/}
                {/*</div>*/}
            </div>
        </div>
    );
};

export default Landing;
