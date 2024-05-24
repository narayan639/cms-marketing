import React, { useContext } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import UserContext from "@/contextapi/userdetail/UserContext";

type Teamdetail = {
  name: string;
  user_id: string;
  business: number;
  total_client: number;
};
interface TeamProps {
  teams: Teamdetail[];
}

const MyBusiness_team: React.FC<TeamProps> = () => {
  const { currUser } = useContext(UserContext);
  const team = currUser?.team || [];

  // Calculate total business amounts
  const total_of_business = team.map((item: any) => {
    const dailylog = item?.dailylog
      .filter((i: any) => i.is_verify === "verify")
      .map((item: any) => Number(item?.budget));
    return dailylog.reduce((acc: number, num: number) => acc + num, 0);
  });

  const total_business_sum = total_of_business.reduce((acc, num) => acc + num, 0);

  return (
    <>
    {
      team?.length>0 ?
    
    <Table className="border-2 rounded-[10px]">
      <TableHeader>
        <TableRow>
          <TableHead className="font-semibold text-ghost">SN</TableHead>
          <TableHead className="font-semibold text-ghost">Team Member</TableHead>
          <TableHead className="font-semibold text-ghost">User ID</TableHead>
          <TableHead className="font-semibold text-ghost">Business</TableHead>
          <TableHead className="font-semibold text-ghost">Total Clients</TableHead>
        </TableRow>
      </TableHeader>

      {team.map((item: any, index: number) => {
        const client = item?.dailylog.filter((i: any) => i.is_verify === "verify");
        const dailylog = item?.dailylog
          .filter((i: any) => i.is_verify === "verify")
          .map((item: any) => Number(item?.budget));
        const total_business = dailylog.reduce((acc: number, num: number) => acc + num, 0);

        return (
          <TableBody key={index} className="text-[14px]">
            <TableCell className="text-nowrap">{index + 1}</TableCell>
            <TableCell className="text-nowrap">{item.name}</TableCell>
            <TableCell className="text-nowrap">{item._id}</TableCell>
            <TableCell className="text-nowrap">{total_business ? `Rs ${total_business.toLocaleString('en-US')}` : 0}</TableCell>
            <TableCell className="text-nowrap">{client.length}</TableCell>
          </TableBody>
        );
      })}
      <TableFooter className="bg-transparent">
        <TableRow>
          <TableCell className="text-nowrap" colSpan={3}>Total</TableCell>
          <TableCell className="text-nowrap">Rs {total_business_sum.toLocaleString('en-US')}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>:
    <h1 className="font-semibold">No data Found!</h1>
  
  }
  </>
  );
};

export default MyBusiness_team;
