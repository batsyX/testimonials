"use client"
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import Swal from 'sweetalert2'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import EmbedCodeGenerator from './EmbedCodeGen'

const SpaceCard = ({spaceName,spaceLogo,onDelete}) => {

    const [testimonials,setTestimonials]=useState([]);
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
      const copyToClipboard = async (text) => {
        try {
          await navigator.clipboard.writeText(text);
          toast.success('Link copied to clipboard');
        } catch (error) {
          toast.error('Failed to copy link to clipboard');
        }
      };
    useEffect(() => {
          getTestimonials();
      }, []);

    const router = useRouter();
  return (
    <li className="col-span-1 flex flex-col bg-gray-800 rounded-lg border border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-200 ease-in-out">
        <div className="flex-1 p-6 ">
            <div className="flex items-center justify-between">
                <a className="flex items-center space-x-3 group" href={`/products/${spaceName}`}>
                    <Image
                        width={40}
                        height={40}
                        loading="lazy"
                        className="w-10 h-10 bg-gray-800 rounded-full flex-shrink-0 object-contain"
                        src={spaceLogo}
                        alt="sleep"
                    />
                    <span className="text-gray-100 font-semibold truncate group-hover:text-white text-base text-wrap" title="">{spaceName}</span>
                </a>
                <div className="relative inline-block text-left">
                    <div>
                    <DropdownMenu >
                    <DropdownMenuTrigger>
                        <div
                            className="rounded-md flex items-center justify-center w-8 h-8 text-gray-400 hover:text-gray-200 hover:bg-gray-700 transition-colors duration-200"
                            id="headlessui-menu-button-7"
                            type="button"
                            aria-haspopup="true"
                            aria-expanded="false"
                            
                        >
                            <span className="sr-only">Open options</span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" className="h-5 w-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"></path>
                            </svg>
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className='bg-[rgb(10,10,10)]'>
                        {/* <DropdownMenuLabel className='text-white'>Manage</DropdownMenuLabel> */}
                        {/* <DropdownMenuSeparator  /> */}
                        <DropdownMenuItem onClick={() => {
                                // const confirmed = confirm(`Are you sure you want to delete ${spaceName}?`);
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
                                        onDelete(spaceName);
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
                                
                            }} className='text-gray-400 cursor-pointer'>
                            <h2 >Delete</h2>
                        </DropdownMenuItem>
                        <DropdownMenuItem className='text-gray-400 cursor-pointer' onClick={()=>{
                            router.push(`/products/${spaceName}`)
                        }}>
                            <h2 >Edit</h2>
                        </DropdownMenuItem>
                        <DropdownMenuItem className='text-gray-400 cursor-pointer' onClick={()=>{
                            copyToClipboard(`${process.env.NEXT_PUBLIC_URL}/space/${spaceName}`)
                        }}>
                            <h2 >Get link</h2>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                    </DropdownMenu>
                    </div>
                </div>
            </div>
            <div className="mt-8 flex justify-between items-center text-gray-500 dark:text-gray-400">
                <div className="flex">
                    <p className="text-sm font-medium">Videos:</p>
                    <p className="text-sm ml-2">0</p>
                </div>
                <div className="flex">
                    <p className="text-sm font-medium">Text:</p>
                    <p className="text-sm ml-2">{testimonials.length}</p>
                </div>
            </div>
            <div className='mt-3'>
                <EmbedCodeGenerator spaceName={spaceName} />
            </div>
        </div>
    </li>

  )
}

export default SpaceCard
