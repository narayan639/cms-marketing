import React from 'react'

type Iitem={
    title: string
    total_number: number
    img: string

}
const Dashboard_card = ({item}:{item: Iitem}) => {
  return (
    <div className="rounded-md bg-secondary p-3 flex justify-between border">
        <div className="flex flex-col justify-between gap-2">
        <span className="h-[50px] sm:h-[35px] w-[50px] sm:w-[35px]">
          <img src={item.img} alt="logo" />
        </span>
        <p className="font-medium">{item.title}</p>
        </div>
        <div className="font-medium text-[20px]">
          {item.total_number}
        </div>
      </div>
  )
}

export default Dashboard_card