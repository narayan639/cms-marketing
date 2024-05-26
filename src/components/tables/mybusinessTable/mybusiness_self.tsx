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
  currUser_log: Selfdetail[];
  isLoading: boolean
}

const MyBusiness_self: React.FC<Myself> = ({currUser_log, isLoading}) => {

  const all_amount = currUser_log?.map((item: any) => Number(item?.budget)) || [];
  const sum = all_amount.reduce((acc, num) => acc + num, 0);
  const total_insen_amt = (sum * 10) / 100;

  return (
<>
{
  currUser_log?.length >0?
<>
{
  !isLoading ?


    <Table className=" rounded-[10px]">
      <TableHeader>
        <TableRow>
          <TableHead className=" text-nowrap">SN</TableHead>
          <TableHead className=" text-nowrap">Company</TableHead>
          <TableHead className=" text-nowrap">Budget</TableHead>
          <TableHead className=" text-nowrap text-right">Incentive</TableHead>
          <TableHead className=" text-nowrap text-right">Date</TableHead>
        </TableRow>
      </TableHeader>

      {currUser_log?.map((item: any, index: number) => {
        const insentive_amt = (item.budget * 10) / 100;
        const date = moment(item?.date).format('ll');

        return (
          <TableBody key={index} className="text-[14px]">
            <TableCell className="text-nowrap">{index + 1}</TableCell>
            <TableCell className="text-nowrap">{item.company_name}</TableCell>
            <TableCell className="text-nowrap">Rs {parseInt(item.budget).toLocaleString('en-US')}</TableCell>
            <TableCell className="text-nowrap text-right">Rs {insentive_amt.toLocaleString('en-US')}</TableCell>
            <TableCell className="text-nowrap text-right">{date}</TableCell>
          </TableBody>
        );
      })}
      <TableFooter className="">
        <TableRow>
          <TableCell colSpan={2}>Total</TableCell>
          <TableCell className="text-nowrap">Rs {sum.toLocaleString('en-US')}</TableCell>
          <TableCell className="text-nowrap text-right">Rs {total_insen_amt.toLocaleString('en-US')}</TableCell>
          <TableCell className="text-nowrap"></TableCell>
        </TableRow>
      </TableFooter>
    </Table>:
    <p>Data Fetching!</p>
  
  }
  </>:
  <p className="py-2">No data found!</p>
}

</>

)};

export default MyBusiness_self;
