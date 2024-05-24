"use client"
import PageTitle from "@/components/common/PageTitle";
import Container_with_nav from "@/components/ui/Container_with_nav";
import Dashboard_card from "@/components/ui/Dashboard_card";
import Graphchart from "@/components/ui/graphchart";
import { useQuery } from "react-query";
import { getDailylogs } from "./apiconnect/fetch";
import UserContext from "@/contextapi/userdetail/UserContext";
import { useContext } from "react";
export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'


export default function Home() {
  const {data: Allogs}=useQuery("logs", getDailylogs)
  const {currUser}=useContext(UserContext)


  const Card_detail = [
    {
      title: "Total Daily log",
      total_number: currUser?.isAdmin? Allogs?.data.dailylog.length : currUser?.dailylog.length,
      img: "/img/daily.png",
    },
    {
      title: "My Team",
      total_number: currUser?.team.length,
      img: "/img/team.png",
    },
    {
      title: "Total Pending Logs",
      total_number: currUser?.isAdmin? Allogs?.data.dailylog.filter((i:any)=>i.is_verify=="not verify").length : currUser?.dailylog.filter((i:any)=>i.is_verify=="not verify").length,
      img: "/img/pending.png",
    },
    {
      title: "Total Approved Logs",
      total_number: currUser?.isAdmin? Allogs?.data.dailylog.filter((i:any)=>i.is_verify=="verify").length : currUser?.dailylog.filter((i:any)=>i.is_verify=="verify").length,
      img: "/img/verify.png",
    },
  ];


  return (
    <Container_with_nav page_title="Dashboard">
      <PageTitle title="Dashboard" className="md:hidden"/>
         <Graphchart/>
       <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 py-4 gap-4">
          {Card_detail?.map((item, index) => (
            <Dashboard_card item={item} key={index} />
          ))}
        </div>
    </Container_with_nav>
   
  );
}
