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
  const [alldistrict, setAlldistrict] = useState<string[]>([]);
  const [allmunicipility, setAllmunicipility] = useState<string[]>([]);
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [status, setStatus] = useState("approved");
  const {currUser}=useContext(UserContext)
  const [resume, setresume] = useState("");
  const [load,setLoad]=useState(false)
  const[image,setImage]=useState<File | null>(null)
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  const { refetch: refatchUser } = useQuery(
    'currentUser',
    fetchUser
);  
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


  useEffect(() => {
    const districtNames = district_list({ pro: province });
    if (districtNames) {
      setAlldistrict(districtNames);
    }
    const municipality = municipility_list({
      province: province,
      district: district,
    });
    if (municipality) {
      setAllmunicipility(municipality);
    }
  }, [province, district]);

  const mutation = useMutation(addTeam, {
    onSuccess: (data) => {
      toast.success(data?.message)
      reset()
      setOpen(false)
      refetchUsers()
      refatchUser()
    },
    onError: (error: any) => {
      toast.error(error?.message)
    }
  })

  const OnChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    
    const file = e.target.files[0];
    // Ensure that a file is selected
    if (file) {
      // Create a FileReader object
      const reader = new FileReader();
      // Define a callback function for when the file is read
      reader.onload = () => {
        // Set the result of reading the file as the selected file URL
        setSelectedFile(reader.result as string);
      };
      // Read the file as a data URL
      reader.readAsDataURL(file);
    }}

  }
  
  const onSubmitHandle = async (e: any) => {
    e.preventDefault();
    try {
      if (!image) {
        return;
      }
      setLoad(true)
      const formData = new FormData();
      formData.append('image', image);
      const response = await axios.post("/api/uploadimage", formData);
      const data = response.data;
      if(data){
        setresume(data.msg)
        setLoad(false)
      }
    } catch (error: any) {
      console.log("err", error.message);
    }
  }

  useEffect(() => {
    if (image) {
      const e = { preventDefault: () => {} }; 
      onSubmitHandle(e);
    }
  }, [image]);


  const onSubmit_teams: SubmitHandler<myteamSchemaType> = (data) =>{
    const payload={
      ...data,
      cv: resume ? resume : "" 
    }
    mutation.mutate( { data: payload })
  } 

  return (
    <Container_with_nav page_title="My Team">
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
                    <p>Name</p>
                    <Asterisk className="text-red-500" size={11} />
                  </Label>
                  <Input
                    id="name"
                    {...register("name")}
                    placeholder="Eg: Hari lal yadav"
                    className=" outline-none focus-visible:ring-0 focus-visible:ring-offset-0"                  />
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
                type="text" {...register("phone")} className="border-none outline-none focus-visible:ring-0 focus-visible:ring-offset-0"/>
                </div>
                  <Errors error={errors.phone?.message} />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="Address" className="font-semibold flex">
                    <p>Address</p>
                    <Asterisk className="text-red-500" size={11} />
                  </Label>
                  <div className="grid grid-cols-3 w-full gap-1">
                    <select
                      {...register("address_province")}
                      onChange={(e: any) => setProvince(e.target.value)}
                      className="text-sm p-2 rounded-md cursor-pointer"
                    >
                      <option
                        value=""
                        className="bg-primary text-white font-semibold "
                      >
                        Province
                      </option>
                      {province_list?.map((item, index) => (
                        <option value={item} key={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                    <select
                      {...register("address_district")}
                      onChange={(e: any) => setDistrict(e.target.value)}
                      className="text-sm p-2 rounded-md cursor-pointer"
                    >
                      <option
                        value=""
                        className="bg-primary text-white font-semibold "
                      >
                        District{" "}
                      </option>
                      {alldistrict?.map((item, index) => (
                        <option value={item} key={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                    <select
                      className="text-sm p-2 rounded-md cursor-pointer"
                      {...register("address_municipility")}
                    >
                      <option
                        value=""
                        className="bg-primary text-white font-semibold"
                      >
                        Municipility
                      </option>
                      {allmunicipility?.map((item, index) => (
                        <option value={item} key={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </div>
                  <Errors error={errors.address_municipility?.message} />
                </div>
                <div className="flex flex-col gap-2">
                  <Label
                    htmlFor="cv"
                    className="font-semibold flex gap-1 items-center"
                  >
                    <p>Upload CV</p>
                    <p className="text-gray-500"> (optional)</p>
                  </Label>
                  <label htmlFor="cv" className="h-[170px] relative cursor-pointer flex items-center justify-center w-full border-2 rounded-md">
                    <img className="h-full w-full object-contain" src={`${selectedFile ? selectedFile :"https://coolbackgrounds.io/images/backgrounds/white/pure-white-background-85a2a7fd.jpg"}`} alt="Upload Resume" />
                   {!resume && <h1 className="font-bold absolute">Click Upload Resume</h1>}
                  </label>
                  <Input type="file" id="cv" className="border-2 hidden" onChange={OnChangeHandler}/>

                  {/* <Errors error={errors.resume?.message} /> */}
                </div>
              </div>

              <DialogFooter>
                {
                  mutation?.isLoading ?
                    <Button type="button" disabled>
                      Processing...
                    </Button> :
                    <Button disabled={load} type="submit" className="flex gap-2">
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
            } flex gap-2 border-2 hover:text-white`}
          onClick={() => setStatus("approved")}
        >
          <ListTodo size={15} />
          <p className="">Approved {currUser?.isAdmin===true &&  totalapproved ? <span>({totalapproved})</span> : null}</p>{" "}
        </Button>
        <Button
          className={` ${status === "pending"
            ? "bg-primary text-white"
            : "bg-transparent text-primary"
            } flex gap-2 border-2 hover:text-white`}
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
