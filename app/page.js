"use client"
import React from "react";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { FloatingNav } from "./components/Navbar";
import About from "./components/About";
import AutoplayTestimonial from "./components/Carousel";

const navItems= [
  {
    name: "Home",
    link: "#home",
  },
  {
    name: "About",
    link: "#about",
  }
]

export default function Home() {
  
  return(
    <div>
      <FloatingNav navItems={navItems}/>
      <div className="w-full min-h-screen  bg-[rgb(21,23,25)] flex flex-col items-center ">
        <div className="w-3/4 max-sm:w-full pt-44 flex flex-col items-center h-screen " id="home">
          <h1 className="text-6xl max-sm:text-4xl font-bold text-white text-center">Get testimonials from your customers <br /> with ease</h1>
          <div className="mt-10">
            <h3 className="text-gray-400 text-2xl max-sm:text-lg text-center">Collecting testimonials is hard, we get it! So we built Testimonial. In minutes, you can collect text and video testimonials from your customers with no need for a developer or website hosting.</h3>
          </div>
        </div>
         <BackgroundBeamsWithCollision>
            <h2 className="text-2xl relative z-20 md:text-4xl lg:text-7xl font-bold text-center  text-white font-sans tracking-tight">
              What&apos;s better <br /> than looking at testimonials?{" "}
              <div className="relative mx-auto inline-block w-max max-sm:w-full  [filter:drop-shadow(0px_1px_3px_rgba(27,_37,_80,_0.14))]">
                <div className="absolute left-0 top-[1px] bg-clip-text bg-no-repeat text-transparent bg-gradient-to-r py-4 from-purple-500 via-violet-500 to-pink-500 [text-shadow:0_0_rgba(0,0,0,0.1)] max-sm:hidden ">
                  <span >&apos;Having them all in a single place!&apos;</span>
                </div>
                <div className="relative bg-clip-text text-transparent bg-no-repeat bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 py-4">
                  <span >&apos;Having them all in a single place!&apos;</span>
                </div>
              </div>
              
              <div className="mt-20">
              <AutoplayTestimonial/>
              </div>
            </h2>
        </BackgroundBeamsWithCollision>
        
        <div className="w-full min-h-screen " id="about">
            <About/>
        </div>

      </div>
    </div>
  )
}
