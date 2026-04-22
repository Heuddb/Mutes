import React from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const HeroSec = () => {
  return (
    <>
      {/* SECTION TITLE */}
      <div className="text-center my-8 playfair-display">
        <h2 className="text-[clamp(1.25rem,3vw,1.875rem)] inline-block relative pb-1.5
          after:content-[''] after:absolute after:left-1/2 after:-bottom-1
          after:-translate-x-1/2 after:w-16 after:h-[2px] after:bg-black">
          Fashion
        </h2>
      </div>

      {/* IMAGES */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-2.5 px-1.5">
        {[assets.sec1, assets.sec2, assets.sec3].map((img, index) => (
          <div key={index} className="relative w-full">
            <img
              src={img}
              alt=""
              className="w-full h-auto object-cover"
            />

            {/* TEXT OVERLAY - positioned to match second image style */}
            <div className="absolute inset-x-0 bottom-0 p-3 sm:p-6 ">
              <div className="text-black">
                <div className="font-semibold mb-1
                  text-[clamp(0.9rem,2.5vw,1.5rem)]">
                  Fashion Forward
                </div>

                <Link
                  to="/collection"
                  className="flex items-center gap-1.5 group"
                >
                  <span className="text-[clamp(0.65rem,2vw,1rem)] text-black">
                    Shop Now
                  </span>
                  <ArrowRight
                    className="transition-transform group-hover:translate-x-1 text-black
                      w-[clamp(0.75rem,2vw,1rem)]"
                  />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default HeroSec;