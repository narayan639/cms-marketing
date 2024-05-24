import React from 'react'

const Mobile_nav = () => {

  return (
    <div className="flex items-center h-full w-full md:hidden px-2">
    <div className="flex gap-1 items-center">
    <img className="h-[50px] w-[50px] object-contain" src="https://metalogic.com.np/metalogo.png" alt="logo" />
    <h1 className="font-bold text-ghost">Metalogic</h1>
    </div>
    </div>
  )
}

export default Mobile_nav