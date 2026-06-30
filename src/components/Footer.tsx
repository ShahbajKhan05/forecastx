import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="relative w-full min-h-[70vh] flex flex-col justify-between overflow-hidden rounded-t-[2.5rem] mt-10">
      
      {/* 1. Cinematic Background & Grading */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/forecastx-cloud.png" 
          alt="ForecastX Cloud" 
          fill 
          className="object-cover object-center scale-105" 
          priority
        />
        {/* Dark Cinematic Vignette & Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black via-black/60 to-black/20"></div>
        <div className="absolute inset-0 shadow-[inset_0_0_120px_rgba(0,0,0,0.9)]"></div>
      </div>

      {/* 2. Glassmorphism Top Nav */}
      <div className="relative z-10 p-6 md:p-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="backdrop-blur-md bg-white/5 border border-white/10 px-6 py-3 rounded-full shadow-lg">
          <p className="text-white/80 text-xs font-semibold tracking-[0.2em] uppercase">
            Real-Time Weather, Designed for the Future
          </p>
        </div>
        
       </div>

      {/* 3. Bottom Section: Massive Typography & Credits */}
      <div className="relative z-10 flex flex-col items-center justify-end px-6 md:px-12 pb-8 mt-20">
        
        <h1 className="w-full text-center text-[16vw] font-black uppercase leading-[0.75] tracking-tighter text-white drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)] select-none">
          FORECAST<span className="text-transparent bg-clip-text bg-linear-to-b from-white to-white/20">X</span>
        </h1>
        
        {/* Footer Details (Interactive Policy Links) */}
        <div className="w-full flex flex-col md:flex-row justify-between items-center mt-12 border-t border-white/10 pt-8 text-[10px] font-semibold uppercase tracking-[0.2em]">
          <p className="text-white/40 text-center md:text-left mb-4 md:mb-0">
            © 2026 0.5 Production. All rights reserved.
          </p>
          
          <div className="flex flex-wrap justify-center gap-2 md:gap-4">
            <a 
              href="#" 
              className="px-4 py-3 md:py-2 rounded-xl text-white/50 hover:text-white hover:bg-white/10 active:scale-90 active:bg-white/20 transition-all duration-200"
            >
              Privacy Policy
            </a>
            <a 
              href="#" 
              className="px-4 py-3 md:py-2 rounded-xl text-white/50 hover:text-white hover:bg-white/10 active:scale-90 active:bg-white/20 transition-all duration-200"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
      
    </footer>
  );
}