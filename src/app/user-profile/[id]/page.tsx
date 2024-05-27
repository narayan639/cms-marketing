"use client"
import { getUsers } from '@/app/apiconnect/fetch'
import { getuser_byid } from '@/app/apiconnect/formhandler'
import Clients_detail from '@/components/tables/client-detail.table'
import MyBusiness_team from '@/components/tables/mybusinessTable/mybusinessTable_team'
import MyBusiness_self from '@/components/tables/mybusinessTable/mybusiness_self'
import Container_with_nav from '@/components/ui/Container_with_nav'
import Dashboard_card from '@/components/ui/Dashboard_card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import Dailylog_card from '@/components/ui/dailylog_card'
import UserContext from '@/contextapi/userdetail/UserContext'
import { Idailylog } from '@/type'
import { Mail, MapPin, Phone } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { Download } from 'lucide-react';
import toast from 'react-hot-toast'
import saveAs from 'file-saver'

const page = () => {
  const[selectcont,setSelectcont]=useState("self")
  const {currUser}=useContext(UserContext)
  const mutation = useMutation(getuser_byid)
  const {
    data: Allusers,
    refetch: refetchUsers
  } = useQuery("users", getUsers);
  const thisuser = mutation?.data?.user
  const path=usePathname()
  const route=useRouter()
  const user_id=path.split("/").pop()

  const download = () => {
    if (thisuser.cv) {
      saveAs(thisuser?.cv, 'resume')
    } else {
      toast.error("User don't have Cv")
    }
  }

  const verify_daily_log = thisuser?.dailylog.filter((i: any) => i?.is_verify === "verify");
  const mapBudget = verify_daily_log?.map((i: any) => parseFloat(i.budget));
  const totalBudget = mapBudget?.reduce((sum: number, budget: number) => sum + budget, 0);  console.log(mapBudget)

  const daily_log = thisuser?.dailylog
  const team = thisuser?.team || [];

  const Card_detail = [
    {
      title: "Total Daily log",
      total_number: daily_log?.length>0? daily_log?.length : 0,
      img: "/img/daily.png",
    },
    {
      title: "My Team",
      total_number: team?.length>0 ? team?.length : 0,
      img: "/img/team.png",
    },
    {
      title: "Total Clients",
      total_number: verify_daily_log?.length > 0? verify_daily_log?.length : 0,
      img: "/img/client.png",
    },
    {
      title: "Total Budgets",
      total_number:  `Rs ${totalBudget? totalBudget?.toLocaleString('en-US') : 0}`,
      img: "/img/budget.png",
    },
  ];



  useEffect(()=>{
   if(user_id && user_id?.length===24){
     mutation.mutate({data:{user_id}})
   }else{
    route.push("/not-found")
   }
  },[user_id])
  return (
    <Container_with_nav page_title='User Profile'>
      {
      
      
      currUser && currUser?.isAdmin &&
      <>
      <div className='flex gap-1'>
            <div className="rounded-md lg:flex-[0.5] flex-1 w-full h-[200px] md:h-max p-2 sm:p-5 flex gap-4 sm:gap-10 bg-secondary mt-2 md:mt-0 relative">
              <div className="circle h-[100px] sm:h-[20vw] md:h-[15vw] w-[100px] sm:w-[20vw] md:w-[15vw] relative cursor-pointer">
                <Avatar className="h-full w-full">
                  <AvatarImage src={`${thisuser?.profile_image ? thisuser?.profile_image : "https://github.com/shadcn.png"}`} />
                  <AvatarFallback>profile</AvatarFallback>
                </Avatar>
               
              </div>
              <div>
                <h1 className="font-semibold sm:text-[25px] md:text-[20px] lg:text-[1.5vw] text-secondary-foreground">
                  {thisuser?.name}
                </h1>
                <p className="font-medium text-primary text-sm">
                  {
                    thisuser?.isAdmin === true ? "Admin" : "Marketing Executive"
                  }

                </p>

                <div className="flex flex-col mt-5 gap-1 sm:gap-2 text-xs sm:text-sm">
                  <span className="flex items-center gap-2">
                    <Phone size={15} />
                    <p>{thisuser?.phone}</p>
                  </span>
                  {
                    thisuser?.address &&
                  <span className="flex items-center gap-2">
                    <MapPin size={15} />
                    <p>{thisuser?.address}</p>
                  </span>
                  }
                  <span className="flex items-center gap-2">
                    <Mail size={15} />
                    <p>{thisuser?.email}</p>
                  </span>
                  <span className="flex items-center gap-2 italic absolute bottom-3">
                    Added By:
                    <h1>
                      {
                      currUser?.id == thisuser?.addby ? <p>Admin</p> : Allusers?.data?.users.find((i: any) => i._id == thisuser?.addby)?.name ? <p onClick={()=>route.push(`/user-profile/${thisuser?.addby}`)} className="cursor-pointer text-blue-700 underline">{Allusers?.data?.users.find((i: any) => i._id == thisuser?.addby)?.name }</p> : "user remove"
                        
                       }
                       
                       </h1>
                  </span>

                </div>
              </div>
              {
                thisuser?.cv &&
              <span className="group h-fit absolute top-4 right-2" onClick={download}>
                            <Download
                              size={35}
                              className="cursor-pointer border-[1px] hover:bg-secondary p-2 rounded-md text-[20px] text-ghost"
                              />

                            <p className="absolute top-[-16px] right-0 opacity-0 w-max group-hover:opacity-100 transform duration-300 text-white px-1 bg-primary rounded-sm text-xs">
                              Download resume
                            </p>
                          </span>
                            }
            </div>
            <div className="hidden lg:flex-[0.5] lg:grid grid-cols-1 md:grid-cols-2 gap-1">
          {Card_detail?.map((item, index) => (
            <Dashboard_card item={item} key={index} />
          ))}
        </div>

            </div>

      <h1 className='my-2 font-semibold text-[18px] underline'>Contribution</h1>
      <div className='flex gap-2'>
        <Button onClick={()=>setSelectcont("self")} className={`bg-white text-black hover:bg-zinc-200 border text-sm ${selectcont==="self"? "bg-blue-600 hover:bg-blue-700 text-white":""}`}>Self</Button>
        <Button onClick={()=>setSelectcont("team")} className={`bg-white text-black hover:bg-zinc-200 border text-sm ${selectcont==="team"? "bg-blue-600 hover:bg-blue-700 text-white":""}`}>Team</Button>
        <Button onClick={()=>setSelectcont("dailylog")} className={`bg-white text-black hover:bg-zinc-200 border text-sm ${selectcont==="dailylog"? "bg-blue-600 hover:bg-blue-700 text-white":""}`}>Daily Logs</Button>
        <Button onClick={()=>setSelectcont("client")} className={`bg-white text-black hover:bg-zinc-200 border text-sm ${selectcont==="client"? "bg-blue-600 hover:bg-blue-700 text-white":""}`}>View clients</Button>
      
      
      </div>
      <div className='flex gap-1'>
        {
          selectcont === "self"?
          <MyBusiness_self currUser_log={verify_daily_log} isLoading={mutation.isLoading} />:
          selectcont === "team"?
          <MyBusiness_team team={team} isLoading={mutation.isLoading} />:
          selectcont === "dailylog"?
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 w-full mt-2`}>
          {  
            daily_log ?
              daily_log.sort((a: Idailylog, b: Idailylog) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
              .map((event: Idailylog, index: number) => {
                return <Dailylog_card key={index} event={event} showpost={false}/>;
              })
               :
              daily_log?.length == 0 ?
                null :
                <>
                  <div className="border border-blue-100 shadow rounded-md p-4  w-full">
                    <div className="animate-pulse flex space-x-4">
                      <div className="flex-1 space-y-6 py-1">
                        <div className="h-8 bg-slate-200 rounded"></div>
                        <div className="space-y-3">
                          <div className="grid grid-cols-3 gap-4">
                            <div className="h-8 bg-slate-200 rounded col-span-2"></div>
                            <div className="h-8 bg-slate-200 rounded col-span-1"></div>
                          </div>
                          <div className="h-8 bg-slate-200 rounded"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="border border-blue-100 shadow rounded-md p-4  w-full mx-auto">
                    <div className="animate-pulse flex space-x-4">
                      <div className="flex-1 space-y-6 py-1">
                        <div className="h-8 bg-slate-200 rounded"></div>
                        <div className="space-y-3">
                          <div className="grid grid-cols-3 gap-4">
                            <div className="h-8 bg-slate-200 rounded col-span-2"></div>
                            <div className="h-8 bg-slate-200 rounded col-span-1"></div>
                          </div>
                          <div className="h-8 bg-slate-200 rounded"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="border border-blue-100 shadow rounded-md p-4  w-full mx-auto">
                    <div className="animate-pulse flex space-x-4">
                      <div className="flex-1 space-y-6 py-1">
                        <div className="h-8 bg-slate-200 rounded"></div>
                        <div className="space-y-3">
                          <div className="grid grid-cols-3 gap-4">
                            <div className="h-8 bg-slate-200 rounded col-span-2"></div>
                            <div className="h-8 bg-slate-200 rounded col-span-1"></div>
                          </div>
                          <div className="h-8 bg-slate-200 rounded"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
          }
          {
            daily_log?.length < 1 &&
            <p>No data found!</p>
          }
        </div>:
        <>
        {
          verify_daily_log?.length>0?
          <Clients_detail clients={verify_daily_log}/>:
          <p className='py-2'>No data found!</p>
        }
        </>

        }
      </div>
      </>
      
}
    </Container_with_nav>
  )
}

export default page