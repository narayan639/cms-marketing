"use client";

import PageTitle from "@/components/common/PageTitle";
import MyBusiness_self from "@/components/tables/mybusinessTable/mybusiness_self";
import MyBusiness_team from "@/components/tables/mybusinessTable/mybusinessTable_team";
import { Button } from "@/components/ui/button";
import Container_with_nav from "@/components/ui/Container_with_nav";
import { useState } from "react";
import { FaPerson } from "react-icons/fa6";
import { HiUserGroup } from "react-icons/hi2";

const teamData = [
  {
    name: "John Smith",
    user_id: "abg543",
    business: 75000,
    total_client: 7,
  },
  {
    name: "Emma Johnson",
    user_id: "pqr123",
    business: 62000,
    total_client: 4,
  },
  {
    name: "Michael Brown",
    user_id: "xyz789",
    business: 55000,
    total_client: 6,
  },
  {
    name: "Sarah Williams",
    user_id: "lmn456",
    business: 48000,
    total_client: 3,
  },
  {
    name: "David Jones",
    user_id: "def321",
    business: 69000,
    total_client: 8,
  },
];

const selfData = [
  {
    company_name: "ABC Corporation",
    amount: 1500,
    date: "2024-05-15",
  },
  {
    company_name: "XYZ Industries",
    amount: 1800,
    date: "2024-04-28",
  },
  {
    company_name: "LMN Enterprises",
    amount: 2200,
    date: "2024-06-03",
  },
  {
    company_name: "PQR Limited",
    amount: 1700,
    date: "2024-05-02",
  },
  {
    company_name: "DEF Group",
    amount: 1900,
    date: "2024-04-10",
  },
];

const page = () => {
  const [status, setStatus] = useState("self");

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
            } flex gap-2 border-2 hover:text-white`}
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
            } flex gap-2 border-2 hover:text-white`}
            onClick={() => setStatus("team")}
          >
            <HiUserGroup size={15} />
            <p className="hidden md:flex">Team</p>{" "}
          </Button>
        </div>
      </div>

      <div className="mt-2">
        {status === "self" && <MyBusiness_self myselfadd={selfData} />}
        {status === "team" && <MyBusiness_team teams={teamData} />}
      </div>
    </Container_with_nav>
  );
};

export default page;
