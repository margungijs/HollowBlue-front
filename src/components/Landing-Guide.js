import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from "swiper/modules";
import 'swiper/swiper-bundle.css';

const LandingGuide = ({ data }) => {
    return (
        <div>
            <Swiper
                className="hidden-animate shadow-lg bg-neutral-50"
                modules={[Autoplay]}
                spaceBetween={50}
                slidesPerView={1}
                autoplay={{
                    delay: 5000,
                }}
                style={{
                    width: "100%",
                    height: "100%",
                }}
            >
                {data.map((item, index) => (
                    <SwiperSlide key={index}>
                        <img src={item.image} alt="" className = "rounded-lg object-cover w-full"/>
                        <div className="absolute inset-0 bg-black p-4 opacity-0 hover:opacity-70 transition-opacity duration-300 flex items-center flex-col justify-center rounded-lg">
                            <span className="text-white text-3xl text-center mb-4">{item.name}</span>
                            <span className="text-white text-xl text-center">{item.description}</span>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default LandingGuide;
