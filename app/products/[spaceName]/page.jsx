"use client"
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { ThreeDot } from "react-loading-indicators";
import HeadBar from "@/app/components/HeadBar";
import {  HeartIcon,Trash,Trash2} from "lucide-react"
import { motion } from "framer-motion";
import { toast,Toaster } from 'sonner';
import Swal from "sweetalert2";


const Page = () => {
  const [space, setSpace] = useState(null);
  const [loading, setLoading] = useState(true); 
  const { spaceName } = useParams();
  const { data: session, status } = useSession();
  const [filter,setFilter]=useState('all');
  const [testimonials,setTestimonials]=useState([]);

  const handleLike=async (currTesti)=>{
      try { 
        const res= await fetch('/api/like',{
          method:'PUT',
          headers:{'Content-Type':'application/json'},
          body: JSON.stringify({ currTesti }),
        })

        if (!res.ok) {
          throw new Error('Failed to toggle like status');
        }
        setTestimonials((prev) =>
          prev.map((item) =>
            item.value === currTesti.value && item.spaceName === currTesti.spaceName
              ? { ...item, isLiked: !item.isLiked }
              : item
          )
        );
        if(!currTesti.isLiked){
          toast.success('Added to Liked!');
        }else{
          toast.success('Removed from Liked!');
        }
      } catch (error) {
        console.log(error)
      }
  }

  const getSpace = async () => {
    try {
      const userEmail = session?.user?.email;
      const res = await fetch(`/api/space`, {
        method: "GET",
        headers: { "Content-Type": "application/json", userEmail },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch spaces");
      }

      const { spaces } = await res.json();
      const matchedSpace = spaces.find(
        (s) => s.spaceName === spaceName && s.userEmail === userEmail
      );

      setSpace(matchedSpace || null); // Set the space or null if not found
    } catch (error) {
      console.error("Error fetching spaces:", error);
    } finally {
      setLoading(false); // Ensure loading is set to false after fetch
    }
  };
  const getTestimonials= async ()=>{
    try {
      const res = await fetch(`/api/testimonials`, {
        method: "GET",
        headers: { "Content-Type": "application/json", spaceName },
      });
      const data =await res.json();
      setTestimonials(data.testimonials);
    } catch (error) {
      console.log(error)
    }
  }
  const handleDelete = async (testimonialId) => {
    try {
      const res= await fetch('/api/testimonials',{
        method:'DELETE',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ testimonialId }),
      })
      if(!res.ok){
        throw new Error('Failed to delete testimonial');
      }
      setTestimonials((prev) => prev.filter((item) => item._id !== testimonialId));
      toast.success('Testimonial deleted successfully');
    } catch (error) {
      toast.error('Failed to delete testimonial');
    }
  }

  useEffect(() => {
    if (status === "authenticated") {
      getSpace();
      getTestimonials();
    }
  }, [status]);

  if (status === "loading" || loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center text-white">
        <ThreeDot color="#ffffff" size="medium" text="" textColor="#NaNNaNNaN" />
      </div>
    );
  }

  if (!space || status === "unauthenticated") {
    return (
      <div className="w-full h-screen bg-[rgb(21,23,25)] flex justify-center items-center">
        <div className="flex justify-center items-center flex-col gap-3">
          <Image
            src="https://res.cloudinary.com/dqwr00jri/image/upload/v1732113984/alvin-and-the-chipmunks-alvin_yxz16e.gif"
            alt="gif"
            className="rounded-2xl"
            width={300}
            height={300}
          />
          <h1 className="text-white">Oops, you do not own this space!</h1>
          <a href="/dashboard">
            <button className="px-7 py-4 bg-white rounded-2xl flex justify-center items-center cursor-pointer hover:bg-gray-800 transition-all hover:text-white">
              Return to dashboard
            </button>
          </a>
        </div>
      </div>
    );
  }

  return (
    <div>
      <HeadBar session={session} />
      <Toaster position='top-right' richColors  />
      <div className="w-full">
        <div className="mx-10 max-sm:mx-3 mt-10 flex items-center justify-between">
          <div className="flex gap-3 items-center">
            <Image src={space.logo} alt="space" width={75} height={75} className="rounded-3xl " />
            <h1 className="text-white text-3xl">{space.spaceName}</h1>
          </div>
          <div>
            <a href={`/space/${space.spaceName}`}>
              <button className="px-10 py-2 bg-white rounded-2xl flex justify-center items-center cursor-pointer hover:bg-gray-800 transition-all hover:text-white">
                Visit
              </button>
            </a>
          </div>
        </div>

        <div className="w-full flex sm:gap-5 max-sm:flex-col ">
        <div className=" w-2/5  max-sm:w-full h-[400px] sm:ml-10 mt-20 max-sm:mx-10">
            <h2 className="text-gray-300 text-2xl font-bold mb-7">Inbox</h2>
            <div className="flex flex-col gap-4 select-none">
              <button
              onClick={()=>{
                setFilter('all')
              }}
                className={`w-3/5 max-sm:w-4/5 mt-1 group flex items-center px-4 py-3 text-base leading-5 font-medium rounded-md hover:bg-gray-700  transition ease-in-out duration-150  text-white ${filter=='all'&& 'bg-gray-700'} focus:outline-none`}
                aria-current="page"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" className="h-4 w-4 mr-2">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 13.5h3.86a2.25 2.25 0 012.012 1.244l.256.512a2.25 2.25 0 002.013 1.244h3.218a2.25 2.25 0 002.013-1.244l.256-.512a2.25 2.25 0 012.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 00-2.15-1.588H6.911a2.25 2.25 0 00-2.15 1.588L2.35 13.177a2.25 2.25 0 00-.1.661z"
                    ></path>
                </svg>
                <p className="mb-1">ALL</p>
              </button>
              <button 
              onClick={()=>{
                setFilter('text')
              }}
              className={`w-3/5 mt-1 max-sm:w-4/5 group flex items-center px-4 py-3 text-base leading-5 font-medium rounded-md hover:bg-gray-700  transition ease-in-out duration-150  text-white ${filter=='text'&& 'bg-gray-700'} focus:outline-none`}
                aria-current="page">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" className="h-4 w-4 mr-2">
                      <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.068.157 2.148.279 3.238.364.466.037.893.281 1.153.671L12 21l2.652-3.978c.26-.39.687-.634 1.153-.67 1.09-.086 2.17-.208 3.238-.365 1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                      ></path>
                  </svg>
                  <p className="mb-1">Text</p>
              </button>
              <button 
              onClick={()=>{
                setFilter('video')
              }}
              className={`w-3/5 mt-1 max-sm:w-4/5 group flex items-center px-4 py-3 text-base leading-5 font-medium rounded-md hover:bg-gray-700  transition ease-in-out duration-150  text-white ${filter=='video'&& 'bg-gray-700'} focus:outline-none`}
                aria-current="page">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" className="h-4 w-4 mr-2">
                  <path strokeLinecap="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z"></path>
                  </svg>
                  <p className="mb-1">Video</p>
              </button>
              <button 
              onClick={()=>{
                setFilter('isLiked')
              }}
              className={`w-3/5 mt-1 max-sm:w-4/5 group flex items-center px-4 py-3 text-base leading-5 font-medium rounded-md hover:bg-gray-700  transition ease-in-out duration-150  text-white ${filter=='isLiked'&& 'bg-gray-700'} focus:outline-none`}
                aria-current="page">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" className="h-4 w-4 mr-2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"></path>
                  </svg>
                  <p className="mb-1">Liked</p>
              </button>
            </div>
        </div>
        <div className="w-4/5 max-sm:w-full  sm:mt-20 flex flex-col gap-10 mb-10 max-sm:items-center ">
          {
            testimonials && testimonials.filter((item)=>{
              if(filter=='isLiked'){
                return item.isLiked
              }
              return filter=='all' ? item : item.type==filter
            }).map((item,index)=>{
              return(
                <div key={index} className='w-4/5 max-sm:w-[350px] h-[300px] bg-[rgb(37,40,44)] hover:bg-[rgba(37,40,44,0.5)] transition-all rounded-lg cursor-pointer relative'>
                    <div className={`absolute top-4 left-4 rounded-full px-7 py-1 ${item.type=='text'?'bg-purple-500':'bg-green-700'} text-white uppercase`}>
                    {item.type}
                    </div>
                    <motion.div className={`w-10 h-10 absolute top-4 right-4 rounded-xl flex items-center justify-center duration-300 ${item.isLiked?'text-red-500':'text-white'}`}>
                          <motion.div whileTap={{scale:0.9}}>
                                      <HeartIcon size={30} 
                                      fill={item.isLiked?'red':'white'}
                                      className={`cursor-pointer `} 
                                      onClick={()=>{
                                        handleLike(item)
                                      }}/>
                          </motion.div>
                  </motion.div>
                  <motion.div className={`w-10 h-10 absolute bottom-4 right-4 rounded-xl flex items-center justify-center duration-300 `}>
                          <motion.div whileTap={{scale:0.9}}>
                                      <Trash2 color="#ef4444" size={30} 
                                      className={`cursor-pointer border-white`} 
                                      onClick={()=>{
                                        Swal.fire({
                                            title: "Are you sure?",
                                            text: "You won't be able to revert this!",
                                            icon: "warning",
                                            customClass: {
                                            confirmButton: 'custom-confirm-btn',
                                            cancelButton: 'custom-cancel-btn',
                                            },
                                            showCancelButton: true,
                                            confirmButtonColor: "#3085d6",
                                            cancelButtonColor: "#d33",
                                            confirmButtonText: "Yes, delete it!",
                                            }).then((result) => {
                                            if (result.isConfirmed) {
                                                handleDelete(item._id);
                                                Swal.fire({
                                                title: "Deleted!",
                                                text: "Your file has been deleted.",
                                                icon: "success",
                                                customClass:{
                                                    confirmButton: 'custom-confirm-btn',
                                                }
                                                });
                                            }
                                            });
                                      }}/>
                          </motion.div>
                  </motion.div>
                                      
                    <div className="mt-24 sm:ml-20 max-sm:ml-4 max-sm:mt-16 ">
                      <h3 className="text-gray-200 font-bold text-xl">{item.value}</h3>
                      <div className="flex justify-between">
                        <div className="w-2/6 text-gray-400 mt-3">
                          <h3>Uploaded by:</h3>
                          <h3>{item.user}</h3>
                        </div>
                        <div className="w-2/6 text-gray-400 mt-3">
                          <h3>Email:</h3>
                          <h3>{item.user}</h3>
                        </div>
                      </div>
                      <div className="w-2/6 text-gray-400 mt-3">
                        <h3>Submitted on:</h3>
                        <h3>Nov 21, 2024, 7:14:53 PM</h3>
                      </div>
                    </div>
                </div>
              )
              })
          }{
            filter==='video' && <div className='w-4/5 h-[300px] bg-[rgb(37,40,44)] transition-all rounded-lg cursor-pointer relative flex justify-center items-center'>
              <h2 className="text-white font-funky text-xl">Coming soon...</h2>
            </div>
          }

        </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
