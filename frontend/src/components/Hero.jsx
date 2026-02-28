import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { assets } from "../assets/assets";

const Hero = () => {
  const setting = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="w-full overflow-x-hidden overflow-y-hidden">
      <Slider {...setting}>
        <div className="w-full h-full">
          <img
            src={assets.hero1}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>

        <div className="w-full h-full">
          <img
            src={assets.hero2}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
      </Slider>
    </div>
  );
};

export default Hero;
