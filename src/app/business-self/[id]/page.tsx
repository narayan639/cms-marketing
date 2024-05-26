"use client"
import React, { useContext, useEffect } from 'react'

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
import Container_with_nav from '@/components/ui/Container_with_nav'
import { usePathname, useRouter } from 'next/navigation'
import { useMutation } from 'react-query'
import { getuser_byid } from '@/app/apiconnect/formhandler'
import moment from 'moment'
import UserContext from '@/contextapi/userdetail/UserContext'
   

   
const page = () => {
  const {currUser}=useContext(UserContext)
  const mutation = useMutation(getuser_byid)
  const user_dailylog = mutation?.data?.user?.dailylog.filter((i: any) => i.is_verify === "verify")

  const all_amount = user_dailylog?.map((item: any) => Number(item?.budget)) || [];
  const sum = all_amount.reduce((acc: number, num: number) => acc + num, 0);
  const total_insen_amt = (sum * 10) / 100;

  const path=usePathname()
  const route=useRouter()
  const user_id=path.split("/").pop()

  useEffect(()=>{
    if(user_id && user_id.length===24){
      mutation.mutate({data:{user_id}})
    }else{
      route.push("/not-found")
    }
  },[user_id])

  return (
    <Container_with_nav page_title='Self Team'>
      {
        currUser && currUser.isAdmin &&
      
        <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">SN</TableHead>
          <TableHead className='text-nowrap'>Name</TableHead>
          <TableHead className='text-nowrap'>Budget</TableHead>
          <TableHead className="text-right text-nowrap">Insentive</TableHead>
          <TableHead className="text-right text-nowrap">Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {
          user_dailylog?.map((item: any,index: number)=>{
            const{company_name,budget,date}=item
            const insentive=(budget*10)/100
            const Date = moment(date).format('ll');

            return(
          <TableRow>
            <TableCell className="font-medium text-nowrap">{index + 1}</TableCell>
            <TableCell className='text-nowrap'>{company_name}</TableCell>
            <TableCell className='text-nowrap'>Rs {`${Number(budget).toLocaleString('en-US')}`}</TableCell>
            <TableCell className="text-right text-nowrap">Rs {Number(insentive).toLocaleString('en-US')}</TableCell>
            <TableCell className="text-right text-nowrap">{Date}</TableCell>
          </TableRow>
            )
          })
        }
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={2}>Total</TableCell>
          <TableCell className="text-nowrap">Rs {sum.toLocaleString('en-US')}</TableCell>
          <TableCell className="text-right text-nowrap">Rs {total_insen_amt.toLocaleString('en-US')}</TableCell>
          <TableCell className="text-right text-nowrap"></TableCell>
        </TableRow>
      </TableFooter>
    </Table>}
    </Container_with_nav>
  )
}

export default page