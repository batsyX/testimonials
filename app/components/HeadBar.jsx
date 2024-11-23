import { signOut, useSession } from "next-auth/react"

import logo from "@/public/logo.png"
import Image from "next/image";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation";


const HeadBar = () => {

    const {data:session}=useSession();
    const router=useRouter();

  return (
    <>
    <div className="w-full flex justify-between px-5 pt-5">
        <div className="text-white cursor-pointer " onClick={()=>router.push('/')}>
            <Image src={logo} width={200} height={200} alt="" />
        </div>
        <div className="text-white">
            <DropdownMenu >
            <DropdownMenuTrigger className="outline-none border-none">
              <Image height={40} width={40} src={session.user.image} alt="" className="rounded-full w-[40px] h-[40px] "/>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='bg-[rgb(10,10,10)] border-none'>
                <DropdownMenuLabel className='text-white'>{session.user.name}</DropdownMenuLabel>
                <DropdownMenuSeparator  />
                <DropdownMenuItem className='text-gray-400 cursor-pointer '>
                    <h2 onClick={()=>signOut({callbackUrl:'/'})}>SignOut</h2>
                </DropdownMenuItem>
            </DropdownMenuContent>
            </DropdownMenu>
        </div>
    </div>
    <div className="w-full h-[0.5px] bg-gray-800"></div>

    
    

    </>
  )
}

export default HeadBar