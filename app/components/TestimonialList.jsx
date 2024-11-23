'use client';

import React from 'react';
import { motion } from 'framer-motion';

const TestimonialList = ({ testimonials }) => {
  if (!testimonials || testimonials.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen text-white">
        <h3>No testimonials available for this space.</h3>
      </div>
    );
  }

  // Animation settings for the continuous marquee effect
  const marqueeVariants = {
    animate: {
      x: ['100%', '-100%'], // Move the testimonials horizontally
      transition: {
        x: {
          repeat: Infinity, // Loop infinitely
          repeatType: 'loop',
          duration: 15, // Duration of each loop
          ease: 'linear',
        },
      },
    },
  };

  return (
    <div className="relative overflow-hidden h-[200px]">
      <motion.div
        className="flex gap-8 whitespace-nowrap"
        variants={marqueeVariants}
        animate="animate"
      >
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="flex-shrink-0 bg-white text-black p-4 rounded-lg shadow-lg w-[300px]"
          >
            <p className="text-lg mb-2">{testimonial.value}</p>
            <p className="text-sm text-gray-500 font-semibold">- {testimonial.user}</p>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default TestimonialList;
