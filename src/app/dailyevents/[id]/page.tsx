"use client"
import React, { useEffect } from "react";
import Form from "@/components/shared/edit-form";
import Breadcrumbs from "@/components/ui/breadcrumbs";
import Container_with_nav from "@/components/ui/Container_with_nav";
import { usePathname, useRouter } from "next/navigation";
import { useMutation } from "react-query";
import { getlog_byid } from "@/app/apiconnect/formhandler";

export default function Page() {
    const mutation = useMutation(getlog_byid)
    const currLog = mutation?.data?.dailylog
  
    const path = usePathname()
    const route=useRouter()
  
    const log_id = path.split("/").pop()
    
    useEffect(() => {
      if (log_id && log_id.length === 24) {
        console.log("lnj",log_id?.length)
        mutation.mutate({ data: { log_id } });
      } else {
        route.push('/not-found');
      }
    }, [log_id]);
  return (
    <Container_with_nav page_title="Edit Event">
      <div className="flex flex-col w-full">
        <Breadcrumbs
          breadcrumbs={[
            { label: "Event", href: "/daily-log" },
            {
              label: "Edit event",
              href: `/dailyevents/${log_id}`,
              active: true,
            },
          ]}
        />
        <Form currentlog={currLog}/>
      </div>
    </Container_with_nav>
  )}