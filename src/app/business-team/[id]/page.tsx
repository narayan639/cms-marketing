"use client"
import React, { useContext, useEffect } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Container_with_nav from '@/components/ui/Container_with_nav'
import { useMutation } from 'react-query'
import { getuser_byid } from '@/app/apiconnect/formhandler'
import { usePathname, useRouter } from 'next/navigation'
import UserContext from '@/contextapi/userdetail/UserContext'
import PageTitle from '@/components/common/PageTitle'


const Page = () => {
  const{currUser}=useContext(UserContext)
  const mutation = useMutation(getuser_byid)
  const path = usePathname()
  const router = useRouter()
  const user_id = path.split("/").pop()

  useEffect(() => {
    if (user_id && user_id?.length === 24) {
      mutation.mutate({ data: { user_id } })
    } else {
      router.push("/not-found")
    }
  }, [user_id])

  const team = mutation?.data?.user.team

  const total_of_business = team?.map((item: any) => {
    const dailylog = item?.dailylog
      .filter((i: any) => i.is_verify === "verify")
      .map((item: any) => Number(item?.budget));
    return dailylog.reduce((acc: number, num: number) => acc + num, 0);
  });

  const total_business_sum = total_of_business?.reduce((acc: number, num: number) => acc + num, 0);


  return (
    <Container_with_nav page_title='Team Business'>
      <PageTitle title='Team Business' className='flex md:hidden'/>
      {
        currUser && currUser?.isAdmin &&
        <>
        {
          team?
        
        
      <Table className='mt-4 md:mt-0'>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px] text-nowrap">SN</TableHead>
            <TableHead className='text-nowrap'>Team Name</TableHead>
            <TableHead className='text-nowrap'>User ID</TableHead>
            <TableHead className="text-right text-nowrap">Business</TableHead>
            <TableHead className="text-right text-nowrap">Total Clients</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {team?.map((item: any, index: number) => {
            const client = item?.dailylog.filter((i: any) => i.is_verify === "verify");
            const dailylog = item?.dailylog
              .filter((i: any) => i.is_verify === "verify")
              .map((item: any) => Number(item?.budget));
            const total_business = dailylog.reduce((acc: number, num: number) => acc + num, 0);

            return (
              <TableRow key={index}>
                <TableCell className="font-medium text-nowrap">{index + 1}</TableCell>
                <TableCell className='text-nowrap'>{item.name}</TableCell>
                <TableCell className='text-blue-500 cursor-pointer underline text-nowrap' onClick={()=>router.push(`/user-profile/${item._id}`)}>{item._id}</TableCell>
                <TableCell className="text-right text-nowrap">{total_business ? `Rs ${total_business.toLocaleString('en-US')}` : 0}</TableCell>
                <TableCell className="text-right text-nowrap">{client?.length}</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3} className='text-nowrap'>Total</TableCell>
            <TableCell className="text-right text-nowrap">Rs {total_business_sum?.toLocaleString('en-US')}</TableCell>
            <TableCell className="text-right text-nowrap"></TableCell>
          </TableRow>
        </TableFooter>
      </Table>:
      <p>Data Fetching...</p>
        }

      </>
      
      }
      {
         team?.length===0 &&
         <p>No Data Available!</p>
      }
    </Container_with_nav>
  )
}

export default Page
