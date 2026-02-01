import React from "react";
import imgHero from "../assets/hero.jpg";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="w-full min-h-screen bg-[#0a0a0a] text-white relative overflow-hidden flex flex-col justify-center">
      
      {/* 1. Subtle Background Grid Effect */}
      <div className="absolute inset-0 z-0 opacity-20" 
           style={{ backgroundImage: 'radial-gradient(#444 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
      </div>

      {/* 2. Ambient Glow Blurs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600/30 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2"></div>

      {/* Main Content Container */}
      <div className="container mx-auto px-6 relative z-10 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        
        {/* Left: Typography & CTA */}
        <div className="flex-1 text-center lg:text-left pt-10 lg:pt-0">
          <div className="inline-block px-4 py-1 mb-6 border border-white/20 rounded-full bg-white/5 backdrop-blur-sm text-sm tracking-widest uppercase text-gray-400">
            The Future of Design
          </div>
          
          <h1 className="font-black text-6xl md:text-8xl leading-[0.9] tracking-tighter mb-8">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500 block">
              CREATE
            </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
              NO LIMITS
            </span>
          </h1>

          <p className="text-gray-400 text-lg md:text-xl max-w-lg mx-auto lg:mx-0 leading-relaxed mb-10">
            Turn your wildest ideas into reality with our intuitive editor. 
            The canvas is yours—fill it with magic.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
            <Link
              to="/editor"
              className="group relative px-8 py-4 bg-white text-black font-bold text-lg rounded-none skew-x-[-10deg] hover:bg-purple-400 transition-colors duration-300"
            >
              <span className="block skew-x-[10deg]">Start Creating</span>
              {/* Button Decoration */}
              <div className="absolute top-1 right-1 w-2 h-2 bg-black"></div>
            </Link>
            
            {/* <Link 
              to="/showcase" 
              className="text-white underline decoration-gray-600 underline-offset-8 hover:text-purple-400 hover:decoration-purple-400 transition-all"
            >
              View Showcase
            </Link> */}
          </div>
        </div>

       
        <div className="flex-1 w-full relative group">
          {/* Decorative border frame */}
          <div className="absolute inset-0 border-2 border-white/10 translate-x-4 translate-y-4 rounded-xl"></div>
          
          {/* Main Image Container with Tilt */}
          <div className="relative rounded-xl overflow-hidden shadow-2xl transition-transform duration-500 transform hover:scale-[1.02] hover:-rotate-1 border border-white/10 bg-gray-800">
             {/* UI Header Mockup (Makes it look like software) */}
            <div className="h-8 bg-gray-900/80 backdrop-blur border-b border-white/10 flex items-center px-4 gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
            </div>
            
            <img
              src={imgHero}
              alt="Design Preview"
              className="w-full h-auto object-cover opacity-90 hover:opacity-100 transition-opacity"
            />
            
            {/* Floating Badge */}
            <div className="absolute bottom-6 right-6 bg-black/70 backdrop-blur-md text-white px-4 py-2 rounded-lg border border-white/10 shadow-lg">
                <span className="text-xs font-mono text-purple-300">Layer 1</span>
                <div className="text-sm font-bold">Hero_Section.jpg</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Home;