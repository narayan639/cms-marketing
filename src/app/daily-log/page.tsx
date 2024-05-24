"use client";
import React, { useState, useEffect, useContext } from "react";
import moment from "moment";
import PageTitle from "@/components/common/PageTitle";
import Search from "@/components/ui/search";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Tooltip } from "@nextui-org/tooltip";
import { useRouter, useSearchParams } from "next/navigation";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Container_with_nav from "@/components/ui/Container_with_nav";
import { useQuery } from "react-query";
import { getDailylogs } from "../apiconnect/fetch";
import { Idailylog } from "@/type";
import Dailylog_card from "@/components/ui/dailylog_card";
import UserContext from "@/contextapi/userdetail/UserContext";
import { LiaGripHorizontalSolid } from "react-icons/lia";
import { MdOutlineHorizontalSplit } from "react-icons/md";
import Pageinationsection from "@/components/ui/pageinationsec";

const sort_events = [
  "All Daily Logs",
  "Today",
  "Yesterday",
  "This week",
  "Last week",
  "This Month",
  "Last Month",
]

export default function Page() {
  const [setdata, setSetdata] = useState(true)
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(9);
  const [sortCriteria, setSortCriteria] = useState("");
  const searchParams = useSearchParams()
  const { data: Allogs } = useQuery("logs", getDailylogs)
  const { currUser } = useContext(UserContext)
  const logsToDisplay = currUser?.isAdmin === true ? Allogs?.data?.dailylog : currUser?.dailylog;
  const [finallog, setFinallog] = useState<Idailylog[]>([]);
  const search = searchParams.get('query')


  // search fun
  useEffect(() => {
    if (logsToDisplay) {
      setFinallog(logsToDisplay);
    }
  }, [logsToDisplay])

  useEffect(() => {
    if (logsToDisplay) {
      const filteredLogs = logsToDisplay.filter((log: any) =>
        log.client_name.toLowerCase().includes(search)
      );
      if (filteredLogs.length > 0) {

        setFinallog(filteredLogs);
      } else {
        setFinallog(logsToDisplay);
      }
    }
  }, [search, logsToDisplay]);

  // Function to sort events based on date
  const sortEventsByDate = (logs: Idailylog[]) => {
    if(sortCriteria==="All Daily Logs"){
      setFinallog(logs)
    }else if (sortCriteria === "Today") {
      // today
      const currentDate = moment(new Date()).format('YYYY-MM-DD');
      const logs_date = logs.filter((i: any) => moment(i.date).format('YYYY-MM-DD') === currentDate)
      setFinallog(logs_date)

    } else if (sortCriteria === "Yesterday") {
      const yesterdayDate = moment().subtract(1, 'day').format('YYYY-MM-DD');
      const logs_date_yesterday = logs.filter((i: any) => moment(i.date).format('YYYY-MM-DD') === yesterdayDate);
      setFinallog(logs_date_yesterday)
    } else if (sortCriteria === "This week") {
      const startOfWeek = moment().startOf('week').format('YYYY-MM-DD');
      const endOfWeek = moment().add(7, 'days').format('YYYY-MM-DD');

      // Filter data for this week
      const logs_date_this_week = logs.filter((i: any) =>
        moment(i.date).isBetween(startOfWeek, endOfWeek, null, '[]')
      );
      setFinallog(logs_date_this_week)

      console.log("this week", logs_date_this_week)

    } else if (sortCriteria === "Last week") {
      const startOfLastWeek = moment().subtract(1, 'week').startOf('week').format('YYYY-MM-DD');
      const endOfLastWeek = moment().subtract(1, 'week').endOf('week').format('YYYY-MM-DD');

      // Filter data for last week
      const logs_date_last_week = logs.filter((i: any) =>
        moment(i.date).isBetween(startOfLastWeek, endOfLastWeek, null, '[]')
      );
      setFinallog(logs_date_last_week)
    } else if (sortCriteria === "This Month") {
      const startOfMonth = moment().startOf('month').format('YYYY-MM-DD');
      const endOfMonth = moment().endOf('month').format('YYYY-MM-DD');

      // Filter data for this month
      const logs_date_this_month = logs.filter((i: any) =>
        moment(i.date).isBetween(startOfMonth, endOfMonth, null, '[]')
    );
    setFinallog(logs_date_this_month)
    } else if (sortCriteria === "Last Month") {
      const startOfLastMonth = moment().subtract(1, 'month').startOf('month').format('YYYY-MM-DD');
      const endOfLastMonth = moment().subtract(1, 'month').endOf('month').format('YYYY-MM-DD');

      // Filter data for last month
      const logs_date_last_month = logs.filter((i: any) =>
        moment(i.date).isBetween(startOfLastMonth, endOfLastMonth, null, '[]')
      );
      setFinallog(logs_date_last_month)
    }


   





  };


  useEffect(() => {
    if (logsToDisplay) {
     sortEventsByDate(logsToDisplay);
    }
  }, [sortCriteria, logsToDisplay]);







  // Function to handle sort criteria changes
  const handleSortChange = (newSortCriteria: string) => {
    setSortCriteria(newSortCriteria);
  };

     // Calculate the index of the first and last items on the current page
     const indexOfLastItem = currentPage * itemsPerPage;
     const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  
     const currentItems=finallog.slice(indexOfFirstItem,indexOfLastItem)
  
  return (
    <Container_with_nav page_title="Events">
      <div className="flex flex-col gap-6 w-full">
        <PageTitle title="Events" className="md:hidden" />
        <div className="flex justify-end lg:justify-between items-center gap-4 w-full">
          <div className="hidden lg:flex gap-2 p-1 bg-secondary rounded-md">
            <MdOutlineHorizontalSplit size={25} className={`${setdata === true && "text-blue-500"} cursor-pointer`} onClick={() => setSetdata(true)} />
            <LiaGripHorizontalSolid size={25} className={`${setdata === false && "text-blue-500"} cursor-pointer`} onClick={() => setSetdata(false)} />
          </div>

          <div className="flex flex-wrap-reverse sm:flex-nowrap justify-end gap-2">

            <div className="w-full md:w-[400px]">
              <Search placeholder="Search with Client Name..." />
            </div>
            <div className="flex items-center gap-4">
              <Select onValueChange={handleSortChange}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Sort: All Daily Logs" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup onChange={(e: any) => setSortCriteria(e.target.value)}>
                    {
                      sort_events?.map((item, index) => (
                        <SelectItem key={index} value={item}>{item}</SelectItem>
                      ))
                    }
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Tooltip content="Create an event" placement="bottom">
                <Button
                  variant="outline"
                  className="bg-blue-800 text-white hover:bg-blue-600"
                  onClick={()=>router.push("/daily-log/create")}
                >
                  <Plus />
                </Button>
              </Tooltip>
            </div>
          </div>
        </div>
        <>
        {
          !search && sortCriteria ?
          <div>
            <strong className="text-zinc-700">{sortCriteria}</strong>
          </div>:
          !search &&
          <div>
            <strong className="text-zinc-700">All Daily Logs</strong>
          </div>
        }
        {
          search &&
          <div>
            <strong className="text-zinc-700">Result : {search}</strong>
          </div>
        }
        </>

        <div className={`grid ${setdata ? "grid-cols-1" : "lg:grid-cols-3"} gap-2`}>
          {
            logsToDisplay ?
              currentItems?.map((event: Idailylog, index: number) => {
                return (
                  <>
                    <Dailylog_card key={index} event={event} />
                  </>
                )
              }
              ) :
              logsToDisplay?.length == 0 ?
                null :
                <>
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
            finallog?.length < 1 &&
            <p>No data found!</p>
          }




        </div>

      
        <Pageinationsection totalitem={finallog.length} itemsperpage={itemsPerPage} currentpage={currentPage} setCurrentpage={setCurrentPage}/>
      </div>
    </Container_with_nav>
  );
}


