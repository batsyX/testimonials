'use client';

import React, { useState } from 'react';
import { toast } from 'sonner';

const TextDialog = ({spaceName}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    spaceName:spaceName,
    user: '',
    email: '',
    type: 'text',
    value: '',
    isLiked:false
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if(name==='text'){
        setFormData({ ...formData, value: value });
        return;
    }
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const res=await fetch(`${process.env.NEXT_PUBLIC_URL}/api/testimonials`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(formData)
        })
        if(!res.ok){
            throw new Error('Failed to send text');
        }
        console.log(res)
        toast.success('Text sent successfully');
    } catch (error) {
        console.log(error)
        toast.error('Failed to send text');
    }
    setIsOpen(false); // Close the dialog after submission
  };

  return (
    <>
        
      <button
        className="btn text-white text-sm mt-4 w-4/5 py-3 bg-black flex justify-center items-center"
        onClick={() => setIsOpen(true)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-3"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
          ></path>
        </svg>
        Send a text
      </button>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center ">
          <div className="bg-white p-6 rounded-md w-[400px]">
            <h2 className="text-lg font-bold mb-4">Send a Text</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="text"
                name="user"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded"
                required
              />
              <textarea
                name="text"
                placeholder="Enter your text"
                value={formData.text}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded"
                required
                style={{resize:'none'}}
              />
              <div className="flex gap-2">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-200 rounded"
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default TextDialog;
