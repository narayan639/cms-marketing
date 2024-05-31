"use client";
import { Button } from "@/components/ui/button";
import React, { useContext, useEffect, useState } from "react";
import { CircleDashed, ListTodo, Plus } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Asterisk } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Myteamtable from "@/components/tables/myteam.table";
import PageTitle from "@/components/common/PageTitle";
import { SubmitHandler, useForm } from "react-hook-form";
import { myteamSchema, myteamSchemaType } from "../Schema/myteam.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Errors from "@/components/ui/errors";
import Container_with_nav from "@/components/ui/Container_with_nav";
import {
  district_list,
  municipility_list,
  province_list,
} from "../Country_data/countryData";
import { useMutation, useQuery } from "react-query";
import { getUsers } from "../apiconnect/fetch";
import { addTeam } from "../apiconnect/formhandler";
import toast from "react-hot-toast";
import UserContext from "@/contextapi/userdetail/UserContext";
import { fetchUser } from "@/contextapi/userdetail/userContextProvider";
import axios from "axios";



const page = () => {
  const [open, setOpen] = useState(false)
  const [status, setStatus] = useState("approved");
  const {currUser}=useContext(UserContext)
 

  const {handleRefetchUser}=useContext(UserContext)
  const {
    data: user,
    error,
    isLoading,
    refetch: refetchUsers
  } = useQuery("users", getUsers);

  const totalapproved = user?.data.users.filter((i: any) => i.user_status === "approved").length
  const totalpending = user?.data.users.filter((i: any) => i.user_status === "pending").length

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<myteamSchemaType>({ resolver: zodResolver(myteamSchema) });

  const mutation = useMutation(addTeam, {
    onSuccess: (data) => {
      toast.success(data?.message)
      reset()
      setOpen(false)
      refetchUsers()
      handleRefetchUser()
    },
    onError: (error: any) => {
      toast.error(error?.message)
    }
  })




  const onSubmit_teams: SubmitHandler<myteamSchemaType> = (data) =>mutation.mutate({data})

  return (
    <Container_with_nav page_title="Team">
      <div className="flex md:flex-col items-center md:items-start justify-between pb-4 md:pb-0">
        <PageTitle title="My Team" className="md:hidden" />
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="flex gap-2 md:rounded-[50%] md:h-[55px] md:w-[55px] md:fixed bottom-8 right-5 md:z-[40]">
              <Plus size={25} />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Team Member Details</DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSubmit(onSubmit_teams)}>
              <div className="py-4 flex gap-4 flex-col">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="name" className="font-semibold flex">
                    <p>Full Name</p>
                    <Asterisk className="text-red-500" size={11} />
                  </Label>
                  <Input
                    id="name"
                    {...register("name")}
                    placeholder="Eg: Hari lal yadav"
                    className=" outline-none focus-visible:ring-0 focus-visible:ring-offset-0 capitalize"                  />
                  <Errors error={errors.name?.message} />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="Email" className="font-semibold flex">
                    <p>Email</p>
                    <Asterisk className="text-red-500" size={11} />
                  </Label>
                  <Input
                    id="Email"
                    {...register("email")}
                    placeholder="Eg: jhondoe@gmail.com"
                    className=" outline-none focus-visible:ring-0 focus-visible:ring-offset-0"                  />
                  <Errors error={errors.email?.message} />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="phone" className="font-semibold flex">
                    <p>Phone</p>
                    <Asterisk className="text-red-500" size={11} />
                  </Label>
                  <div className="flex items-center border rounded-lg">
                <h2 className="bg-secondary h-10 flex items-center justify-center px-2">+977</h2>
              <Input
                type="number" {...register("phone")} className="border-none outline-none focus-visible:ring-0 focus-visible:ring-offset-0"/>
                </div>
                  <Errors error={errors.phone?.message} />
                </div>
                
              </div>

              <DialogFooter>
                {
                  mutation?.isLoading ?
                    <Button type="button" disabled>
                      Processing...
                    </Button> :
                    <Button disabled={mutation?.isLoading} type="submit" className="flex gap-2">
                      <Plus /> <p>Add Team</p>
                    </Button>
                }
              </DialogFooter>
            </form>

          </DialogContent>
        </Dialog>
      </div>
      <hr className="md:hidden" />
      <div className="flex gap-2 pt-2 md:pt-0 justify-end md:justify-start md:pb-2">
        <Button
          className={` ${status === "approved"
            ? "bg-primary text-white"
            : "bg-transparent text-primary"
            } flex gap-2 border hover:text-white`}
          onClick={() => setStatus("approved")}
        >
          <ListTodo size={15} />
          <p className="">Approved {currUser?.isAdmin===true &&  totalapproved ? <span>({totalapproved})</span> : null}</p>{" "}
        </Button>
        <Button
          className={` ${status === "pending"
            ? "bg-primary text-white"
            : "bg-transparent text-primary"
            } flex gap-2 border hover:text-white`}
          onClick={() => setStatus("pending")}
        >
          <CircleDashed size={15} />
          <p className="">Pending {currUser?.isAdmin===true && totalpending ? <span>({totalpending})</span> : null}</p>{" "}
        </Button>
      </div>

      <div className="mt-2">
        <Myteamtable myteams={ currUser?.isAdmin=== true ? user?.data.users : currUser?.team} status={status} isLoading={isLoading} />
      </div>
    </Container_with_nav>
  );
};

export default page;
