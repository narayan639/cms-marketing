import { BookUser, CalendarDays, Clock7, Eye, IndianRupee, MapPinned, Trash2, UserRound, Warehouse } from 'lucide-react'
import React, { useContext } from 'react'
import { Button } from './button'
import moment from 'moment'
import { useRouter } from 'next/navigation'
import { FaRegEdit } from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useMutation, useQuery } from 'react-query'
import { delete_dailylogs, verify_log } from '@/app/apiconnect/formhandler'
import toast from 'react-hot-toast'
import { fetchUser } from '@/contextapi/userdetail/userContextProvider'
import UserContext from '@/contextapi/userdetail/UserContext'
import { getDailylogs } from '@/app/apiconnect/fetch'



const Dailylog_card = ({ event }: { event: any }) => {
  const { currUser } = useContext(UserContext)
  const { isLoading, refetch: refatchlogs}=useQuery("logs", getDailylogs)

  const { refetch: refatchUser } = useQuery(
    'currentUser',
    fetchUser
  );

  const route = useRouter()

  const muatation_log=useMutation(verify_log,{
    onSuccess: (data) => {
      toast.success(data?.message)
      refatchlogs()
    },
    onError:(error: any)=>{
      toast.error(error?.message)
  }
  })

  const mutation = useMutation(delete_dailylogs, {
    onSuccess: (data) => {
      toast.success(data?.message)
      refatchUser()
      refatchlogs()

    },
    onError: (error: any) => {
      toast.error(error?.message)
    }
  })

  const handledelete = (log_id: string) => {
    mutation.mutate({ log_id })
  }
  const verifylog=(log_id: string)=>muatation_log.mutate({log_id})

  return (
    <div
      className="w-full rounded-lg text-primary shadow-md overflow-hidden flex flex-row justify-between gap-4 bg-secondary relative"
    >
      {/* Event details */}
      <div className="flex-1 bg-gradient-to-r from-blue-800 to-blue-400 rounded-lg text-white p-2">
        {/* Client Name */}
        <div
          title="Client name"
          className="flex items-center gap-2 mb-2 cursor-pointer"
        // onClick={() => handleEventSelection(event)}
        >
          <UserRound className=" mr-2" size={18} />
          <span>{event.client_name}</span>
        </div>

        {/* Address */}
        <div title="Address" className="flex items-center gap-2 mb-2">
          <MapPinned className=" mr-2" size={18} />
          <span>{event.address}</span>
        </div>

        {/* Phone number */}
        <div
          title="Phone number"
          className="flex items-center mb-2 gap-2"
        >
          <BookUser className=" mr-2" size={18} />
          <span>{event.phonenumber}</span>
        </div>

        {/* Company Name */}
        {event.company_name && (
          <div
            title="Company Name"
            className="flex items-center gap-2 mb-2"
          >
            <Warehouse className=" mr-2" size={18} />
            <span>{event.company_name}</span>
          </div>
        )}
        <div
          title="Budget"
          className="flex items-center gap-2 mb-2"
        >
         Rs
          <span>{event.budget} /-</span>
        </div>




      </div>

      {/* Date and Time */}
      <div className="flex flex-col justify-between p-2">
        <div className="flex justify-end items-end gap-1">
          {
            currUser?.isAdmin === true && event?.is_verify === "not verify" &&
            <Button className='p-1 px-2 bg-white text-black hover:bg-zinc-300' onClick={()=>verifylog(event?._id)}>
              <MdVerified className="cursor-pointer text-green-500" size={18}  />
            </Button>
          }

          <Button className='p-1 px-2 bg-white text-black hover:bg-zinc-300'>
            <Eye className="cursor-pointer" size={18} onClick={() => route.push(`/daily-log/${event._id}`)} />

          </Button>
          <Button className='p-1 px-2 bg-white text-black hover:bg-zinc-300'>

            <FaRegEdit size={18} className='cursor-pointer'  onClick={() => route.push(`/dailyevents/${event._id}`)}/>
          </Button>


          <AlertDialog>
            <AlertDialogTrigger asChild><Button className='p-1 px-2 bg-white text-black hover:bg-zinc-300'>

              <Trash2 size={18} />
            </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Do you want to Delete?</AlertDialogTitle>

              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => handledelete(event._id)} className='bg-red-500 hover:bg-red-600'>Delete</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

        </div>

        <div className='flex justify-end text-sm'>
          {
            event?.is_verify === "verify" ?
              <div className='p-1 rounded-lg bg-green-500 text-white font-medium w-fit px-2'>Verified</div> :
              <div className='p-1 rounded-lg bg-red-500 text-white font-medium w-fit px-2'>Not Verify</div>
          }
        </div>


        <div>
          <div title="Date" className="flex items-center">
            <CalendarDays className=" mr-2" />
            <span>
              {moment(event.date).format("MMM Do, YYYY")}
            </span>{" "}
          </div>
          <div title="Time" className="flex items-center mt-2">
            <Clock7 className=" mr-2" />
            <span>{event.time}</span>
          </div>
        </div>


      </div>
    </div>
  )
}

export default Dailylog_card