import React from "react";
import imgHero from "../assets/hero.jpg";
import { Link } from "react-router-dom";

const Hero = () => {
 
  return (
    <div className="w-full min-h-screen relative  ">
      {/* Background Image */}
      <img
        src={imgHero}
        alt=""
        className="absolute inset-0 w-full h-full object-cover
"
      />

      {/* Overlay content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-7 rounded-[28px] px-20 py-10 bg-gradient-to-br from-sky-800  to-rose-600">
          <h1 className="font-extrabold text-[80px] text-center text-white leading-tight">
            YOUR CREATIVITY <br /> YOUR CANVAS
          </h1>

          <h5 className="font-medium text-[35px] text-center text-white">
            Design stunning visuals in minutes <br />— no experience needed.
          </h5>
          <Link
            to="/editor"
            className="p-5 text-center font-medium text-white text-2xl border-2 border-white rounded-full px-6 mb-8 hover:bg-orange-400 inline-block"
          >
            Design Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
