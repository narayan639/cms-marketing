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
import { useRouter } from "next/navigation";

type Teamdetail = {
  name: string;
  user_id: string;
  business: number;
  total_client: number;
};
interface TeamProps {
  team: Teamdetail[];
  isLoading: boolean
}

const MyBusiness_team: React.FC<TeamProps> = ({team,isLoading}) => {
  const {currUser}=useContext(UserContext)
  const route=useRouter()


  // Calculate total business amounts
  const total_of_business = team?.map((item: any) => {
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
    
    <Table className="rounded-[10px]">
      <TableHeader>
        <TableRow>
          <TableHead className="text-nowrap">SN</TableHead>
          <TableHead className="text-nowrap">Team Member</TableHead>
          <TableHead className="text-nowrap">User ID</TableHead>
          <TableHead className="text-right text-nowrap">Business</TableHead>
          <TableHead className="text-right text-nowrap">Total Clients</TableHead>
        </TableRow>
      </TableHeader>

      {team.map((item: any, index: number) => {
        const client = item?.dailylog.filter((i: any) => i.is_verify === "verify");
        const dailylog = item?.dailylog
          .filter((i: any) => i.is_verify === "verify")
          .map((item: any) => Number(item?.budget));
        const total_business = dailylog.reduce((acc: number, num: number) => acc + num, 0);

        return (
          <TableRow key={index} className="text-[14px]">
            <TableCell className="text-nowrap">{index + 1}</TableCell>
            <TableCell className="text-nowrap">{item.name}</TableCell>
            {
              currUser?.isAdmin ?
              <TableCell className="text-nowrap cursor-pointer underline text-blue-700" onClick={()=>route.push(`/user-profile/${item._id}`)}>{item._id}</TableCell>:
              <TableCell className="text-nowrap">{item._id}</TableCell>
            }
            <TableCell className="text-nowrap text-right">{total_business ? `Rs ${total_business.toLocaleString('en-US')}` : 0}</TableCell>
            <TableCell className="text-nowrap text-right">{client.length}</TableCell>
          </TableRow>
        );
      })}
      <TableFooter className="">
        <TableRow>
          <TableCell className="text-nowrap" colSpan={3}>Total</TableCell>
          <TableCell className="text-nowrap text-right">{`${total_business_sum? `Rs ${total_business_sum.toLocaleString('en-US')}`: 0}`}</TableCell>
          <TableCell className="text-nowrap text-right"></TableCell>
        </TableRow>
      </TableFooter>
    </Table>:
    <p className="py-2">No data found!</p>
  
  }
  </>
  );
};

export default MyBusiness_team;
