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
import Pageinationsection from "@/components/ui/pageinationsec";

const sort_events = [
  "All Daily Logs",
  "Today",
  "Yesterday",
  "This week",
  "Last week",
  "This Month",
  "Last Month",
];

export default function Page() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(9);
  const [sortCriteria, setSortCriteria] = useState("");
  const searchParams = useSearchParams();
  const { data: Allogs } = useQuery("logs", getDailylogs);
  const { currUser } = useContext(UserContext);
  const logsToDisplay = currUser?.isAdmin === true ? Allogs?.data.dailylog : currUser?.dailylog;
  const [finallog, setFinallog] = useState<Idailylog[]>([]);
  const search = searchParams.get('query');
  const [searchby, setSearchby] = useState("client_name");
  const [verificationStatus, setVerificationStatus] = useState('');

  useEffect(() => {
    if (logsToDisplay) {
      let filteredLogs = logsToDisplay;

      if (verificationStatus) {
        filteredLogs = filteredLogs.filter((log: any) => log.is_verify === verificationStatus);
      }

      if (search) {
        filteredLogs = filteredLogs.filter((log: any) =>
          log[searchby]?.toLowerCase().includes(search.toLowerCase())
        );
      }

      if (sortCriteria === "Today") {
        const currentDate = moment().format('YYYY-MM-DD');
        filteredLogs = filteredLogs.filter((log: any) => moment(log.date).format('YYYY-MM-DD') === currentDate);
      } else if (sortCriteria === "Yesterday") {
        const yesterdayDate = moment().subtract(1, 'day').format('YYYY-MM-DD');
        filteredLogs = filteredLogs.filter((log: any) => moment(log.date).format('YYYY-MM-DD') === yesterdayDate);
      } else if (sortCriteria === "This week") {
        const startOfWeek = moment().startOf('week').format('YYYY-MM-DD');
        const endOfWeek = moment().endOf('week').format('YYYY-MM-DD');
        filteredLogs = filteredLogs.filter((log: any) =>
          moment(log.date).isBetween(startOfWeek, endOfWeek, null, '[]')
        );
      } else if (sortCriteria === "Last week") {
        const startOfLastWeek = moment().subtract(1, 'week').startOf('week').format('YYYY-MM-DD');
        const endOfLastWeek = moment().subtract(1, 'week').endOf('week').format('YYYY-MM-DD');
        filteredLogs = filteredLogs.filter((log: any) =>
          moment(log.date).isBetween(startOfLastWeek, endOfLastWeek, null, '[]')
        );
      } else if (sortCriteria === "This Month") {
        const startOfMonth = moment().startOf('month').format('YYYY-MM-DD');
        const endOfMonth = moment().endOf('month').format('YYYY-MM-DD');
        filteredLogs = filteredLogs.filter((log: any) =>
          moment(log.date).isBetween(startOfMonth, endOfMonth, null, '[]')
        );
      } else if (sortCriteria === "Last Month") {
        const startOfLastMonth = moment().subtract(1, 'month').startOf('month').format('YYYY-MM-DD');
        const endOfLastMonth = moment().subtract(1, 'month').endOf('month').format('YYYY-MM-DD');
        filteredLogs = filteredLogs.filter((log: any) =>
          moment(log.date).isBetween(startOfLastMonth, endOfLastMonth, null, '[]')
        );
      }

      filteredLogs = filteredLogs.sort((a: any, b: any) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

      setFinallog(filteredLogs);
    }
  }, [verificationStatus, search, searchby, sortCriteria, logsToDisplay]);

  const handleVerificationStatusChange = (status: string) => {
    setVerificationStatus(prevStatus => prevStatus === status ? '' : status);
  };

  // Function to handle sort criteria changes
  const handleSortChange = (newSortCriteria: string) => {
    setSortCriteria(newSortCriteria);
  };

  // Calculate the index of the first and last items on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = finallog.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <Container_with_nav page_title="Events">
      <div className="flex flex-col gap-2 w-full">
        <PageTitle title="Events" className="md:hidden" />
        <div className="flex justify-between items-center gap-4 w-full">
          <div className="flex items-center gap-4">
            <label htmlFor="verify" className={`flex items-center cursor-pointer border rounded-lg p-2 ${verificationStatus === 'verify'? "bg-blue-600 text-white":""}`}>
              <input
                type="radio"
                id="verify"
                name="verificationStatus"
                value="verify"
                checked={verificationStatus === 'verify'}
                onClick={()=>handleVerificationStatusChange("")}
                onChange={() => handleVerificationStatusChange('verify')}
                className="mr-2 hidden"
              />
              Verified
            </label>
            <label htmlFor="not verify" className={`flex items-center cursor-pointer border rounded-lg p-2 ${verificationStatus === 'not verify'? "bg-blue-600 text-white":""}`}>
              <input
                type="radio"
                id="not verify"
                name="verificationStatus"
                value="not verify"
                checked={verificationStatus === 'not verify'}
                onClick={()=>handleVerificationStatusChange("")}
                onChange={() => handleVerificationStatusChange('not verify')}
                className="mr-2 hidden"
              />
              Not Verified
            </label>
          </div>
          <div className="flex flex-wrap-reverse sm:flex-nowrap justify-end gap-2">
            <select name="" id="" className="rounded-lg px-2" onChange={(e: any) => setSearchby(e.target.value)}>
              <option value="client_name">Client Name</option>
              <option value="company_name">Company Name</option>
              <option value="phonenumber">Phone Number</option>
            </select>
            <div className="w-full md:w-[300px]">
              <Search placeholder="Search" />
            </div>
            <div className="flex items-center gap-4">
              <Select onValueChange={handleSortChange}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Sort: All Daily Logs" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup onChange={(e: any) => setSortCriteria(e.target.value)}>
                    {sort_events?.map((item, index) => (
                      <SelectItem key={index} value={item}>{item}</SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {currUser?.isAdmin === false &&
                <Tooltip content="Create an event" placement="bottom">
                  <Button
                    variant="outline"
                    className="bg-blue-800 text-white hover:bg-blue-600"
                    onClick={() => router.push("/daily-log/create")}
                  >
                    <Plus />
                  </Button>
                </Tooltip>
              }
            </div>
          </div>
        </div>
        <>
          {!search && sortCriteria ?
            <div>
              <strong className="text-zinc-700">{sortCriteria}</strong>
            </div> :
            !search &&
            <div>
              <strong className="text-zinc-700">All Daily Logs</strong>
            </div>
          }
          {search &&
            <div>
              <strong className="text-zinc-700">Result : {search}</strong>
            </div>
          }
        </>
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2`}>
          {logsToDisplay ?
            currentItems?.map((event: Idailylog, index: number) => {
              return (
                <>
                  <Dailylog_card key={index} event={event} showpost={true} />
                </>
              )
            }) :
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
          {logsToDisplay?.length < 1 &&
            <p>No data found!</p>
          }
        </div>
        <Pageinationsection totalitem={finallog.length} itemsperpage={itemsPerPage} currentpage={currentPage} setCurrentpage={setCurrentPage} />
      </div>
    </Container_with_nav>
  );
}
