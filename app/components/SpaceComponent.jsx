import Image from 'next/image'
import React from 'react'
import TextDialog from './TextDialog'

const SpaceComponent = ({header,subMessage,currLogo,spaceName}) => {

return (
    <div className='w-full  h-screen flex flex-col justify-center items-center '>
        <div className='mt-7'>
            <h3 className="h3 mb-4 text-center text-4xl font-bold underline">{spaceName}</h3>
        </div>
        <div className=' min-h-[400px] pb-10 w-[400px] relative mx-5 mt-10  border-solid border-2 border-gray-200 rounded-xl backdrop-blur-3xl'>
                <div className='mt-10 flex flex-col justify-center items-center'>
                  <Image width={80} height={80} src={currLogo} alt="current header logo" className='rounded-full object-cover w-[80px] h-[80px]' />
                  <h2 className='mt-10 font-bold text-4xl text-gray-600 text-center break-words w-full'>{header}</h2>
                  <div className="custom-message text-base text-gray-500 mt-5 text-center mb-10 break-words w-full"><p>{subMessage}</p></div>
                  
                  <TextDialog spaceName={spaceName}/>
                </div>
                  
              </div>
    </div>
  )
}

export default SpaceComponent