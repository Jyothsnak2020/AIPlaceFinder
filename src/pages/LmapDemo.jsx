"use client";
import React from "react";
import { motion } from "framer-motion";
import { LampContainer } from "@/components/ui/lamp";
export function LampDemo() {
  return (
    <LampContainer>
      <motion.h1
        initial={{ opacity: 0.5, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className=" bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text h-[30%] "
      >
         <h1 className="mx-4 relative z-10 text-3xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 text-center font-sans font-bold">
         Welcome to White Travel Service
          </h1>
          <h2 className="text-neutral-500 max-w-sm mx-auto my-2 text-md text-center relative z-10">
          Explore our premium travel services and packages tailored just for you. Whether you are planning a relaxing getaway or an adventurous journey, we have got you covered.
          </h2>
      </motion.h1>
    </LampContainer>
  );
}
