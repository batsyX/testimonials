import React, { useState } from 'react'
import close from "@/public/close.png"
import Image from 'next/image'
import SpaceLogoUploader from './LogoUploader'
import { Commet } from 'react-loading-indicators'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

const Dialog = ({onClick,handleDialogClose}) => {
  const router = useRouter();
  const {data:session}=useSession();
  const [currLogo, setCurrLogo] = useState('https://res.cloudinary.com/dqwr00jri/image/upload/v1731930134/cf5ojqpo2okedopupoan.gif');
  const [header, setHeader] = useState('Header goes here...');
  const [subMessage, setSubMessage] = useState('Your custom message goes here...');
  const [spaceName, setSpace] = useState('');
  const [loading, setLoading] = useState(false);
  const userEmail=session?.user?.email;

  const handleUpload = async (file) => {
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "testimonialsImg"); // Replace with your preset
      const response = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, {
        method: "POST",
        body: formData,
      });
  
      const data = await response.json();
      setCurrLogo(data.secure_url);
    } else {
      setCurrLogo("https://res.cloudinary.com/dqwr00jri/image/upload/v1731930134/cf5ojqpo2okedopupoan.gif");
    }
  };
  const handleHeader = (e) => {
    if(e.target.value === '') return;
    setHeader(e.target.value);
  }
  const handleSubMessage = (e) => {
    if(e.target.value === '') return;
    setSubMessage(e.target.value);
  }
  const handleSpace = (e) => {
    if(e.target.value === '') return;
    const space = e.target.value.replace(/\s/g, '-');
    setSpace(space);
  }
  const handleSubmit =async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const res = await fetch('/api/space',{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body: JSON.stringify({userEmail:userEmail,spaceName:spaceName,header: header, subMessage: subMessage, logo: currLogo})
      } );
      const body =await res.json();
      if(body.error==='Space name already exists'){
        toast.error('Space name already exists');
        setLoading(false);
        return;
      }
      router.push(`/space/${spaceName}`)
    } catch (error) {
      console.log(error?.response?.data || error);
    } finally{
      setLoading(false);
    }

  }
  

  return (
    <div className='fixed top-0 bottom-0 left-0 right-0 bg-[rgba(0,0,0,0.3)] flex justify-center overflow-y-scroll  '>
        
        <div className='w-4/5 max-sm:w-full my-20 bg-white min-h-screen rounded-2xl relative flex max-sm:flex-col '>
            <div className='absolute top-5 right-5 cursor-pointer' onClick={onClick}><Image alt='close button' src={close} width={15} height={15}/></div>
            <div className='h-[500px] w-2/5 max-sm:hidden relative mx-5 mt-10  border-solid border-2 border-gray-200 rounded-xl  '>
                
              <div className='w-[250px] h-[30px] bg-green-200 rounded-full absolute -top-4 left-5 flex justify-center items-center'>
                  <p className='font-bold  text-green-600 '>Live preview - Testimonial page</p>
              </div>
              <div className='mt-10  flex flex-col justify-center items-center'>
                <Image width={80} height={80} src={currLogo} alt="current header logo" className='rounded-full object-cover w-[80px] h-[80px]' />
                <div className=' w-full '><h2 className=' mt-10 font-bold text-4xl text-gray-600 text-center break-words'>{header}</h2></div>
                <div className="custom-message w-full"><h2 className='text-base text-gray-500 mt-5 text-center break-words'>{subMessage}</h2></div>
                <button className="btn text-white text-sm mt-10  w-4/5 py-3 bg-[rgb(93,93,255)] flex justify-center items-center" >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
                  Record a video
                </button>
                <button className="btn text-white text-sm mt-4  w-4/5 py-3 bg-black flex justify-center items-center" >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                  Send a text
                </button>
              </div>
                
            </div>
            <div className=' w-3/5 flex flex-col items-center max-sm:w-full '>
                <div className='mt-7 max-sm:mt-10'>
                  <h3 className=" mb-4 text-center text-4xl font-bold">Create a new Space</h3>
                  <p className="text-base text-gray-600 text-center">After the Space is created, it will generate a dedicated page for collecting testimonials.</p>
                </div>
                <form method='POST' onSubmit={handleSubmit} className='w-full flex flex-col items-center sm:gap-2 mt-10 max-sm:mt-3'>
                  <label htmlFor="spaceName" className=' self-start text-gray-800 ml-24 max-sm:ml-10'>Space name</label>
                  <input name='spaceName' onChange={handleSpace} required type="text" className='w-4/5 h-12 rounded-xl border-solid border-2 border-gray-200 text-center'/>
                  <div className=' self-start ml-24 max-sm:ml-10'>
                    <SpaceLogoUploader onUpload={handleUpload}/>
                  </div>
                  <label htmlFor="header" className=' self-start text-gray-800 ml-24 mt-7 max-sm:ml-10'>Header title</label>
                  <input name='header' maxLength={45} onChange={handleHeader}  required type="text" className='w-4/5 h-12 rounded-xl border-solid border-2 border-gray-200 text-center '/>
                  <label htmlFor="subMessage" className=' self-start text-gray-800 ml-24 mt-7 max-sm:ml-10'>Your custom message</label>
                  <input name='subMessage' onChange={handleSubMessage}  required type="text" className='w-4/5 h-12 rounded-xl border-solid border-2 border-gray-200 text-center'/>
                  { !loading ? <input type="submit" name="" id="" className='px-10 py-5 bg-[rgb(93,93,255)] rounded-xl text-white cursor-pointer    hover:scale-105 transition-all ml-24 mt-7 self-start max-sm:ml-10' />: <div className='mt-3'><Commet color="#66a0f0" size="medium" text="" textColor="" /></div>
                  }
                </form>
            </div>
        </div>
    </div>
  )
}

export default Dialog