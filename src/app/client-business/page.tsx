"use client";

import PageTitle from "@/components/common/PageTitle";
import Clients_detail from "@/components/tables/client-detail.table";
import MyBusiness_self from "@/components/tables/mybusinessTable/mybusiness_self";
import MyBusiness_team from "@/components/tables/mybusinessTable/mybusinessTable_team";
import { Button } from "@/components/ui/button";
import Container_with_nav from "@/components/ui/Container_with_nav";
import UserContext from "@/contextapi/userdetail/UserContext";
import { useContext, useState } from "react";
import { FaPerson } from "react-icons/fa6";
import { HiUserGroup } from "react-icons/hi2";
import { TbBrandTeams } from "react-icons/tb";




const page = () => {
  const [status, setStatus] = useState("self");
  const { currUser,isLoading } = useContext(UserContext);
  const verify_daily_log = currUser?.dailylog.filter((i: any) => i?.is_verify === "verify") || []
  const team = currUser?.team || [];


  return (
    <Container_with_nav page_title="My Business">
      <div className="flex md:flex-col items-center md:items-start justify-between">
        <PageTitle title="My Business" className="md:hidden" />
        <div className="flex gap-2 mb-2">
          <Button
            className={` ${
              status === "self"
                ? "bg-primary text-white"
                : "bg-transparent text-primary"
            } flex gap-2 border hover:text-white`}
            onClick={() => setStatus("self")}
          >
            <FaPerson size={15} />
            <p className="hidden md:flex">Self</p>{" "}
          </Button>
          <Button
            className={` ${
              status === "team"
                ? "bg-primary text-white"
                : "bg-transparent text-primary"
            } flex gap-2 border hover:text-white`}
            onClick={() => setStatus("team")}
          >
            <HiUserGroup size={15} />
            <p className="hidden md:flex">Team</p>{" "}
          </Button>
          <Button
            className={` ${
              status === "client"
                ? "bg-primary text-white"
                : "bg-transparent text-primary"
            } flex gap-2 border hover:text-white`}
            onClick={() => setStatus("client")}
          >
            <TbBrandTeams size={15} />
            <p className="hidden md:flex">View Clients</p>{" "}
          </Button>
        </div>
      </div>

      <div className="mt-2">
        {status === "self" && <MyBusiness_self currUser_log={verify_daily_log} isLoading={isLoading} />}
        {status === "team" && <MyBusiness_team team={team} isLoading={isLoading}/>}
        {status === "client" && <Clients_detail clients={verify_daily_log} />}

      </div>
    </Container_with_nav>
  );
};

export default page;
