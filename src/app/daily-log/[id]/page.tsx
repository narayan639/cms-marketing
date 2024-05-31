"use client"
import { getlog_byid } from '@/app/apiconnect/formhandler'
import Container_with_nav from '@/components/ui/Container_with_nav'
import moment from 'moment'
import { usePathname, useRouter } from 'next/navigation'
import React, { useContext, useEffect } from 'react'
import { useMutation } from 'react-query'
import parse from "html-react-parser"
import Breadcrumbs from '@/components/ui/breadcrumbs'
import UserContext from '@/contextapi/userdetail/UserContext'



const Page = () => {
  const {currUser}=useContext(UserContext)
  const mutation = useMutation(getlog_byid)
  const currLog = mutation?.data?.dailylog  

  const path = usePathname()
  const route=useRouter()

  const log_id = path.split("/").pop()

  const date = moment(currLog?.date).format('ll')

  useEffect(() => {
    if (log_id && log_id.length === 24) {
      mutation.mutate({ data: { log_id } });
    } else {
      route.push('/not-found');
    }
  }, [log_id])
  return (
    <Container_with_nav page_title='Daily Log Detail'>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Event", href: "/daily-log" },
          {
            label: "Details",
            href: `/daily-log/${log_id}`,
            active: true,
          },
        ]}
      />    
      {
        currLog?
      
      <div className='mt-5 flex flex-wrap text-wrap flex-col gap-5 rounded-md bg-blue-50 md:mr-20 relative h-max'>
        <h1 className='text-lg font-semibold text-gray-800 border-b px-2 sm:px-6 pt-2 border-dashed'>Daily Log Detail</h1>
        <div className='grid grid-cols-1 gap-3 sm:gap-6 px-2 sm:px-6 pb-4'>

        <section className='flex flex-col'>
          <p className="font-semibold text-zinc-500 text-sm">Post Date</p>
          <span>{date}</span>
        </section>
        <section className='flex flex-col'>
          <p className="font-semibold text-zinc-500 text-sm">Post Time </p>
          <span>{currLog?.time}</span>
        </section>
        <section className='flex flex-col'>
          <p className="font-semibold text-zinc-500 text-sm">Location </p>
          <span>{currLog?.address}</span>
        </section>
        <section className='flex flex-col'>
          <p className="font-semibold text-zinc-500 text-sm">Client Name</p>
          <span>{currLog?.client_name}</span>
        </section>
        <section className='flex flex-col'>
          <p className="font-semibold text-zinc-500 text-sm">Company Name</p>
          <span>{currLog?.company_name}</span>
        </section>
        <section className='flex flex-col'>
          <p className="font-semibold text-zinc-500 text-sm">Phone Number </p>
          <span>{currLog?.phonenumber}</span>
        </section>
        <section className='flex flex-col'>
          <p className="font-semibold text-zinc-500 text-sm">Client Budget </p>
          <span>Rs {currLog?.budget}</span>
        </section>
        {
          currLog?.remarks &&
          <section className='flex flex-wrap flex-col'>
            <p className="font-semibold text-zinc-500 text-sm">Remarks</p>
            <span className="text-wrap">{parse(`${currLog?.remarks}`)}</span>
          </section>
        }
       
        <section className='flex flex-wrap flex-col'>
          <p className="font-semibold text-zinc-500 text-sm">Feedback</p>
          <span className="text-wrap">{parse(`${currLog?.feedback}`)}</span>
        </section>
        {
          currUser?.isAdmin &&
        <section className='flex flex-wrap flex-col'>
          <p className="font-semibold text-zinc-500 text-sm">Posted By: </p>
          <span className="text-wrap underline text-blue-600 cursor-pointer" onClick={()=>route.push(`/user-profile/${currLog?.addby?._id}`)}>{`${currLog?.addby?.name}`}</span>
        </section>
        }
        <div className='flex flex-wrap text-wrap w-full'>
          <p className="font-semibold text-zinc-500 text-sm">Requirements </p>
          <div className="w-full overflow-x-auto mt-2">{parse(`${currLog?.requirements}`)}</div>
        </div>
        </div>

      </div>:
      <div className="border border-blue-100 shadow rounded-md p-4 mt-5 w-full sm:w-[90%]">
      <div className="animate-pulse flex flex-col space-y-4">
        <div className="h-6 bg-slate-300 rounded w-2/3"></div>
        <div className="h-6 bg-slate-300 rounded w-1/4"></div>
        <div className="h-6 bg-slate-300 rounded w-1/2"></div>
        <div className="h-6 bg-slate-300 rounded w-1/4"></div>
        <div className="h-6 bg-slate-300 rounded w-2/3"></div>
        <div className="h-6 bg-slate-300 rounded w-1/3"></div>
        <div className="h-6 bg-slate-300 rounded w-1/2"></div>
        <div className="h-6 bg-slate-300 rounded w-full"></div>
        <div className="h-6 bg-slate-300 rounded w-full"></div>
        <div className="h-6 bg-slate-300 rounded w-full"></div>
        <div className="h-6 bg-slate-300 rounded w-3/4"></div>
      </div>
    </div>}
    




    </Container_with_nav>
  )
}

export default Page