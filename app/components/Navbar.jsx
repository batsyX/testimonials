"use client";
import React from "react";
import {
  motion,
  AnimatePresence,
} from "framer-motion";
import Link from "next/link";
import { cn } from "../../lib/utils";
import { signIn, signOut, useSession } from "next-auth/react";
import { Riple } from "react-loading-indicators";

export const FloatingNav = ({navItems,className,}) => {
  const {data:session,status} =useSession();
  
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 1,
          y: -200,
        }}
        animate={{
          y:  0 ,
          opacity:  1 ,
        }}
        transition={{
          duration: 3,
        }}
        className={cn(
          // change rounded-full to rounded-lg
          // remove dark:border-white/[0.2] dark:bg-black bg-white border-transparent
          // change  pr-2 pl-8 py-2 to px-10 py-5
          "flex max-w-fit md:min-w-[70vw] lg:min-w-fit fixed z-[5000] top-10 inset-x-0 mx-auto px-10 py-5 rounded-lg border border-black/.1 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] items-center justify-center space-x-4",
          className
        )}
        style={{
          backdropFilter: "blur(16px) saturate(180%)",
          backgroundColor: "rgba(10,10,10, 0.75)",
          borderRadius: "12px",
          border: "1px solid rgba(255, 255, 255, 0.125)",
        }}
      >
        {navItems.map((navItem, idx) => (
          <Link
            key={`link=${idx}`}
            href={navItem.link}
            className={cn(
              "relative dark:text-neutral-50 items-center  flex space-x-1 text-white dark:hover:text-neutral-300 hover:text-neutral-500"
            )}
          >
            <span className="block sm:hidden">{navItem.icon}</span>
            {/* add !cursor-pointer */}
            {/* remove hidden sm:block for the mobile responsive */}
            <span className=" text-sm !cursor-pointer">{navItem.name}</span>
          </Link>
        ))}
        {
          session && <Link
            href={'/dashboard'}
            className={cn(
              "relative dark:text-neutral-50 items-center  flex space-x-1 text-white dark:hover:text-neutral-300 hover:text-neutral-500"
            )}
          >
            <span className=" text-sm !cursor-pointer">Dashboard</span>
          </Link>
        }
        {
          status =='loading'?<Riple color="#ffffff" size="small" text="" textColor="" />: (
            !session? <button onClick={()=>signIn('google',{callbackUrl:'/dashboard'})} className="border text-sm font-medium relative border-white/[0.2] text-white px-4 py-2 rounded-full">
          <span>Login</span>
          <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent  h-px" />
        </button>
        :
        <button onClick={()=>signOut()} className="border text-sm font-medium relative border-white/[0.2] text-white px-4 py-2 rounded-full">
          <span>Logout</span>
          <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent  h-px" />
        </button>
          )
        }
          
      </motion.div>
    </AnimatePresence>
  );
};