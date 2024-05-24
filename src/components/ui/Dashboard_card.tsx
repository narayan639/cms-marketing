import React from 'react'

type Iitem={
    title: string
    total_number: number
    img: string

}
const Dashboard_card = ({item}:{item: Iitem}) => {
  return (
    <div className="rounded-md bg-secondary p-5 sm:p-8 flex justify-between sm:h-[200px] bg-gradient-to-r from-blue-500 to-blue-700 text-white">
        <div className="flex flex-col justify-between gap-4">
        <span className="h-[50px] sm:h-[80px] w-[50px] sm:w-[80px]">
          <img src={item.img} alt="logo" />
        </span>
        <p className="font-semibold text-secondary">{item.title}</p>
        </div>
        <div className="font-bold text-[20px]">
          {item.total_number}
        </div>
      </div>
  )
}

export default Dashboard_card