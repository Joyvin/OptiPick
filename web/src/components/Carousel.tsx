"use client";
import React from "react";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import "swiper/css";
import sliderDetails from "../data/sliderDetails";
import { sliderSettings } from "../data/sliderSettings";
import { Link } from "react-router-dom";

export default function Carousel() {
	return (
		<div className="relative z-[20] mt-10">
			<div className="text-5xl font-bold xl:ml-32 md:ml-16 ml-4 mb-10 text-white">
				Explore The Best Oral Care Products ...
			</div>
			<Swiper {...sliderSettings}>
				<SliderButtons />
				{sliderDetails.map((card, i) => (
					<SwiperSlide key={i}>
						<div className="w-[25rem] opp-card hover:scale-[1.025] hover:cursor-pointer flex flex-col px-[1rem] pb-[1rem] pt-[1.3rem] m-auto">
							<img
								className="w-[25rem] h-[20rem] rounded-tr-[15px] rounded-tl-[15px]"
								src={card.imgUrl}
								alt="cardImg"
							/>
							<div className="flex flex-col rounded-br-[15px] rounded-bl-[15px] bg-white shadow-md px-5 pb-5 pt-3">
								<p className="text-[1.5rem] w-full font-bold">
									{card.title}
								</p>
								<p className="text-gray-500">{card.place}</p>
								<p>
									{card.rating}/10 ({card.review} reviews)
								</p>
								<p className="text-xl mt-4 font-bold">
									${card.price}/night
								</p>
							</div>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
}

const SliderButtons = () => {
	const swiper = useSwiper();
	return (
		<div className="flex justify-center gap-[1rem] pt-4">
			<button
				className="text-[1.2rem] py-[0.2rem] px-[0.8rem] text-blue-600 border-none rounded-[5px] bg-gray-100 cursor-pointer"
				onClick={() => swiper.slidePrev()}
			>
				❰
			</button>
			<button
				className="text-[1.2rem] py-[0.2rem] px-[0.8rem] text-blue-600 border-none rounded-[5px] bg-gray-100 cursor-pointer"
				onClick={() => swiper.slideNext()}
			>
				❱
			</button>
		</div>
	);
};
