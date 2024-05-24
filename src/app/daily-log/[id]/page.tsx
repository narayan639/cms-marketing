"use client"
import { getlog_byid } from '@/app/apiconnect/formhandler'
import Container_with_nav from '@/components/ui/Container_with_nav'
import moment from 'moment'
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { useMutation } from 'react-query'
import parse from "html-react-parser"
import Breadcrumbs from '@/components/ui/breadcrumbs'



const Page = () => {
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
    <Container_with_nav page_title='Daily Details'>
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
      
      <div className='mt-5 flex flex-wrap text-wrap flex-col gap-5 rounded-md p-3 bg-slate-50'>
        <section>
          <strong>Post Date: </strong>
          <span>{date}</span>
        </section>
        <section>
          <strong>Post Time: </strong>
          <span>{currLog?.time}</span>
        </section>
        <section>
          <strong>Client Location: </strong>
          <span>{currLog?.address}</span>
        </section>
        <section>
          <strong>Client Name: </strong>
          <span>{currLog?.client_name}</span>
        </section>
        <section>
          <strong>Client Company Name: </strong>
          <span>{currLog?.company_name}</span>
        </section>
        <section>
          <strong>Client Phone Number: </strong>
          <span>{currLog?.phonenumber}</span>
        </section>
        <section>
          <strong>Client Budget: </strong>
          <span>Rs {currLog?.budget}</span>
        </section>
        <section className='flex flex-wrap'>
          <strong>Requirements: </strong>
          <span className="text-wrap">{parse(`${currLog?.requirements}`)}</span>
        </section>
        <section className='flex flex-wrap'>
          <strong>Feedback: </strong>
          <span className="text-wrap">{parse(`${currLog?.feedback}`)}</span>
        </section>
        {
          currLog?.remarks &&
          <section className='flex flex-wrap'>
            <strong>Remarks: </strong>
            <span className="text-wrap">{parse(`${currLog?.remarks}`)}</span>
          </section>
        }

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