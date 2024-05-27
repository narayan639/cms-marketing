import Image from 'next/image'
import React from 'react'

const CustomLoadingComponent = () => {
  return (
    <div className='h-[100vh] w-full flex items-center justify-center'>
        <div className="h-16 w-16">
          <Image className='w-full h-full object-contain' src="/img/load.svg" alt="load" width={200} height={200}/>
          <p>Fetching...</p>
        </div>

    </div>
  )
}

export default CustomLoadingComponent