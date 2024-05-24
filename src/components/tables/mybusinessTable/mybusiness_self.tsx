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
import moment from "moment";

type Selfdetail = {
  company_name: string;
  amount: number;
  date: string;
};

interface Myself {
  myselfadd: Selfdetail[];
}

const MyBusiness_self: React.FC<Myself> = () => {
  const { currUser,isLoading } = useContext(UserContext);

  console.log(isLoading)
  
  const verify_daily_log = currUser?.dailylog.filter((i: any) => i?.is_verify === "verify");

  // Calculate all amounts and total incentives
  const all_amount = verify_daily_log?.map((item: any) => Number(item?.budget)) || [];
  const sum = all_amount.reduce((acc, num) => acc + num, 0);
  const total_insen_amt = (sum * 10) / 100;

  return (
<>
{
  !isLoading ?


    <Table className="border-2 rounded-[10px]">
      <TableHeader>
        <TableRow>
          <TableHead className="font-semibold text-ghost text-nowrap">SN</TableHead>
          <TableHead className="font-semibold text-ghost text-nowrap">Company</TableHead>
          <TableHead className="font-semibold text-ghost text-nowrap">Budget</TableHead>
          <TableHead className="font-semibold text-ghost text-nowrap">Incentive</TableHead>
          <TableHead className="font-semibold text-ghost text-nowrap">Date</TableHead>
        </TableRow>
      </TableHeader>

      {verify_daily_log?.map((item: any, index: number) => {
        const insentive_amt = (item.budget * 10) / 100;
        const date = moment(item?.date).format('ll');

        return (
          <TableBody key={index} className="text-[14px]">
            <TableCell className="text-nowrap">{index + 1}</TableCell>
            <TableCell className="text-nowrap">{item.company_name}</TableCell>
            <TableCell className="text-nowrap">Rs {parseInt(item.budget).toLocaleString('en-US')}</TableCell>
            <TableCell className="text-nowrap">Rs {insentive_amt.toLocaleString('en-US')}</TableCell>
            <TableCell className="text-nowrap">{date}</TableCell>
          </TableBody>
        );
      })}
      <TableFooter className="bg-transparent">
        <TableRow>
          <TableCell colSpan={2}>Total</TableCell>
          <TableCell className="text-nowrap">Rs {sum.toLocaleString('en-US')}</TableCell>
          <TableCell className="text-nowrap">Rs {total_insen_amt.toLocaleString('en-US')}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>:

    <p>load</p>
  
  }

</>

)};

export default MyBusiness_self;
