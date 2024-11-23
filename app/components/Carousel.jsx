import React from 'react';
import { motion } from 'framer-motion';

const testimonials=[
    {
        "_id": "6d837cbf23b1479a823ac219",
        "spaceName": "Rate our service on Yelp",
        "type": "text",
        "value": "Amazing customer service! They went above and beyond. 🌟",
        "user": "by Jane Smith",
        "isLiked": false,
        "createdAt": "2024-11-22T14:15:30.123Z",
        "updatedAt": "2024-11-22T14:15:55.456Z",
        "__v": 0
    },
    {
        "_id": "93ba761c22e9478d930fc341",
        "spaceName": "Coursera: web development bootcamp by John",
        "type": "text",
        "value": "Very informative and easy to follow. Highly recommend! 👍",
        "user": "by Alice Johnson",
        "isLiked": false,
        "createdAt": "2024-11-22T14:30:10.567Z",
        "updatedAt": "2024-11-22T14:30:45.890Z",
        "__v": 0
    },
    {
        "_id": "b85e9c4d001d4250a70dc3fe",
        "spaceName": "Rate our product on Amazon",
        "type": "text",
        "value": "Exceeded my expectations. The quality is superb. 🌟🌟🌟🌟🌟",
        "user": "by Michael Brown",
        "isLiked": false,
        "createdAt": "2024-11-22T15:01:05.223Z",
        "updatedAt": "2024-11-22T15:01:30.345Z",
        "__v": 0
    }
    
]

const MarqueeTestimonial = () => {

  return (
    <div style={{ width: '100%', overflow: 'hidden' }}>
      <motion.div
        style={{ display: 'flex', alignItems: 'center',gap:'30px' }}
        animate={{ x: ['100%', '-100%'] }}  
        transition={{
          x: {
            repeat: Infinity,     // Repeat indefinitely
            repeatType: 'loop',   // Loop back to start after completing the animation
            duration: 20,          // Duration of the scroll in seconds
            ease: 'linear',        // Linear motion
          },
        }}
      >
        {testimonials.map((item, index) => (
            <div key={index} className='w-[500px]  min-h-[250px] max-sm:w-[400px] py-10 bg-[rgb(37,40,44)] hover:bg-[rgba(37,40,44,0.5)] transition-all rounded-lg cursor-pointer relative'>
                                        
                    <div className=" ">
                      <h3 className="text-white text-xl uppercase my-10 font-extrabold tracking-wider">{item.value}</h3>
                      <div className="flex justify-between items-center">
                        <div className="w-2/6 text-gray-400 mt-3 text-lg tracking-wide ">
                          <h3>Uploaded by:</h3>
                          <h3>{item.user}</h3>
                        </div>
                        <div className='w-3/6 flex items-center'>
                            <h3 className='text-lg uppercase text-gray-400 font-swanky tracking-wider'>On : {item.spaceName}</h3>
                        </div>
                      </div>
                      
                      
                    </div>
                </div>
        ))}
      </motion.div>
    </div>
  );
};

export default MarqueeTestimonial;
