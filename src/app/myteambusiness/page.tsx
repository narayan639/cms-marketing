"use client"
import Container_with_nav from '@/components/ui/Container_with_nav'
import React, { useContext } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Link from 'next/link'
import UserContext from '@/contextapi/userdetail/UserContext'
import PageTitle from '@/components/common/PageTitle'

interface DailyLog {
  _id: string;
  budget: number;
  is_verify: string;
}

interface TeamMember {
  _id: string;
  name: string;
  dailylog: DailyLog[];
  team: TeamMember[];
}

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  isAdmin: boolean;
  team: TeamMember[];
  dailylog: DailyLog[];
  role: string;
  profile_image: string;
  cv: string;
}

const Page = () => {
  const { currUser } = useContext(UserContext) as { currUser: User | null };
  const team = currUser?.team;

  const getVerifiedLogs = (logs: DailyLog[]): DailyLog[] => logs.filter((log) => log.is_verify === "verify");

  const calculateSum = (logs: DailyLog[]): number => {
    const amounts = logs.map((log) => Number(log.budget));
    return amounts.reduce((acc, amount) => acc + amount, 0);
  }

  return (
    <Container_with_nav page_title='My team Contribution'>
            <PageTitle title='My team Contribution' className='flex md:hidden'/>

      {currUser && currUser.isAdmin &&
        <Table className='mt-4 md:mt-2'>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">SN</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Self Contribution</TableHead>
              <TableHead>Team Contribution</TableHead>
              <TableHead className="text-right">See More</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {team?.map((member, index) => {
              const { name, dailylog, team: nestedTeam , _id} = member;

              const verifiedSelfLogs = getVerifiedLogs(dailylog);
              const selfSum = calculateSum(verifiedSelfLogs);

              const verifiedTeamLogs = nestedTeam.flatMap((nestedMember) =>
                getVerifiedLogs(nestedMember.dailylog)
              );
              const teamSum = calculateSum(verifiedTeamLogs);

              return (
                <TableRow key={index}>
                  <TableCell className="font-medium text-nowrap">{index + 1}</TableCell>
                  <TableCell className='text-nowrap'>{name}</TableCell>
                  <TableCell className='font-medium text-nowrap'>
                    Business Rs {selfSum.toLocaleString('en-US')} <br /><br /> No Of Clients {verifiedSelfLogs.length}
                  </TableCell>
                  <TableCell className='font-medium text-nowrap'>
                    Business Rs {teamSum.toLocaleString('en-US')} <br /> <br /> No Of Clients {verifiedTeamLogs.length}
                  </TableCell>
                  <TableCell className="text-right flex flex-col gap-2 items-end text-nowrap">
                    <Link href={`/business-self/${_id}`} className='border w-20 text-center p-1 rounded-lg hover:bg-blue-500 hover:text-white'>Self</Link>
                    <Link href={`/business-team/${_id}`} className='border w-20 text-center p-1 rounded-lg hover:bg-blue-500 hover:text-white'>Team</Link>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      }
    </Container_with_nav>
  )
}

export default Page
