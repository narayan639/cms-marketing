import React from 'react'


import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"

  
const Clients_detail = ({clients}: any) => {
  return (
    <>
     <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px] text-nowrap">SN</TableHead>
          <TableHead className='text-nowrap'>Client Company</TableHead>
          <TableHead className='text-nowrap'>Client Name</TableHead>
          <TableHead className='text-nowrap text-center'>Client Budget</TableHead>
          <TableHead className="text-right text-nowrap">Location</TableHead>
          <TableHead className="text-right text-nowrap">Phone Number</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {
          clients?.map((item: any,index: any)=>{
            return(
         <TableRow key={index}>
            <TableCell className="font-medium text-nowrap">{index + 1}</TableCell>
            <TableCell className='text-nowrap'>{item?.company_name}</TableCell>
            <TableCell className='text-nowrap'>{item?.client_name}</TableCell>
            <TableCell className="text-center text-nowrap">Rs {parseInt(item?.budget).toLocaleString('en-US')}</TableCell>
            <TableCell className="text-right text-nowrap">{item?.address}</TableCell>
            <TableCell className="text-right text-nowrap">{item?.phonenumber}</TableCell>
          </TableRow>
            )
          })
        }
      </TableBody>
     
    </Table>
    </>
  )
}

export default Clients_detail