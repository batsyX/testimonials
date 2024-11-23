"use client"
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'

import HeadBar from '../components/HeadBar'
import Dialog from '../components/Dialog'
import { redirect } from 'next/navigation'
import SpaceCard from '../components/SpaceCard'
import { ThreeDot } from 'react-loading-indicators'
import { Toaster } from 'sonner'


const Page = () => {

  const {data:session,status}=useSession();
  const [dialog,setDialog]=useState(false);
  const [spaces,setSpaces]=useState([]);
  const [loading,setLoading]=useState(true);

  const handleDialogClose = () => {
    setDialog(false); // Logic to close the dialog
  };
  const getSpaces = async () => {
    try {
      const res = await fetch(`/api/space`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json','userEmail':session?.user?.email},
      });
      const data = await res.json();
      setSpaces(data.spaces);
      setLoading(false);
    } catch (error) {
      console.log(error)
    }
  }
 
  const handleSearch = (e) => {
    if(e.target.value){
      const filteredSpaces = spaces.filter(space=>space.spaceName.toLowerCase().includes(e.target.value.toLowerCase()));
      setSpaces(filteredSpaces);
    }else{
      getSpaces();
    }
  }

  useEffect(()=>{
    if (status === 'authenticated' && session?.user?.email) {
      getSpaces();
    }
  },[status, session])

  if (status === "loading") {
    return <div></div>
  }

  if (status === "unauthenticated") {
    redirect('/');
  }
  const handleDelete = async (spaceName) => {
    try {
      const res = await fetch(`/api/space`,{
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ spaceName: spaceName })
      });
      getSpaces();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div >
      <HeadBar session={session}/>
      <Toaster position='top-right' richColors  />
      <div className="w-full flex justify-center mt-20">
        <div className="flex flex-col gap-10 w-3/5 max-sm:w-full max-sm:mx-3 ">
            <div className="w-full flex justify-between">
                <h2 className="text-white text-4xl ">Spaces</h2>
                <div onClick={()=>setDialog(true)} className="px-10 bg-purple-600 py-4 max-sm:py-2 max-sm:px-5 rounded-xl text-white font-bold hover:scale-105 transition-all cursor-pointer " >Create Space</div>
            </div>
            <div className="w-full">
                  <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="white" aria-hidden="true">
                              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path>
                          </svg>
                      </div>
                      <input
                          id="search"
                          name="search"
                          className="block w-full pl-10 pr-3 py-2 text-white border  border-gray-700 rounded-md leading-5  bg-gray-800 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                          placeholder="Search testimonials by name, email, or keywords"
                          type="search"
                          onChange={handleSearch}
                      />
                  </div>
              </div>
        </div>
      </div>
      

      



    <div className='w-full flex justify-center my-10'>
      <ul className='w-3/5 max-lg:w-5/6 mt-6 grid grid-cols-3 max-xl:grid-cols-2 max-sm:grid-cols-1 gap-5 sm:gap-6 '>
        {
           spaces && spaces.map((space,index)=>(
          <SpaceCard key={index} spaceName={space.spaceName} spaceLogo={space.logo} onDelete={handleDelete}/>
          )) 
        }
        {
          loading && <ThreeDot color='white' size={50}/>
        }
      </ul>
    </div>


      {
        dialog && <Dialog handleDialogClose={handleDialogClose} onClick={()=>{
          setDialog(false)
          }}/>
      }
    </div>
  )
  
  
    
}

export default Page