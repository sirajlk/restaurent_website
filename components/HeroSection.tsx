import { auth } from "@clerk/nextjs/server";
import Header from "./Header";

export default function HeroSection() {
  const {userId} = auth()

    return (
      <div className="relative w-full h-screen overflow-hidden">
        <Header userId={userId}/>
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/50 z-10"></div>
  
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/img/background.jpg')",
          }}
        ></div>
  
        {/* Content */}
        <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-4">
          <h1 className="font-bold text-6xl md:text-7xl lg:text-8xl text-amber-500 font-serif tracking-wide">Quibeez</h1>
          <h2 className="text-white text-2xl md:text-3xl font-sans tracking-widest mt-2 mb-6">RESTAURANT</h2>
          <div className="flex items-center gap-4 text-white">
            <span className="hidden md:block w-16 h-px bg-white/70"></span>
            <p className="text-sm md:text-base font-light">Free Home Delivery</p>
            <span className="hidden md:block w-16 h-px bg-white/70"></span>
          </div>
        </div>
      </div>
    )
  }
  