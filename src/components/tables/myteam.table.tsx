import React, { useContext, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { saveAs } from "file-saver"
import { Asterisk, Download, SquarePen, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "@radix-ui/react-label";
import { MdOutlineVerified } from "react-icons/md";
import { myteamSchema, myteamSchemaType } from "@/app/Schema/myteam.schema";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { district_list, municipility_list, province_list } from "@/app/Country_data/countryData";
import Errors from "../ui/errors";
import { useMutation, useQuery } from "react-query";
import { delete_user, profileupdate, verify_user } from "@/app/apiconnect/formhandler";
import toast from "react-hot-toast";
import { getUsers } from "@/app/apiconnect/fetch";
import UserContext from "@/contextapi/userdetail/UserContext";
import { fetchUser } from "@/contextapi/userdetail/userContextProvider";
import { IUser, IUserx } from "@/type";

type Teamdetail = {
  _id: string
  name: string;
  email: string;
  address: string;
  phone: string;
  cv: string;
  user_status: string;
};

interface myteams {
  myteams: Teamdetail[];
  status: string;
  isLoading: boolean
}
const Myteamtable: React.FC<myteams> = ({ myteams, status, isLoading }) => {
  const [curUser, setCurUser] = useState<IUserx[]>([])
  const [alldistrict, setAlldistrict] = useState<string[]>([]);
  const [allmunicipility, setAllmunicipility] = useState<string[]>([]);
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const { currUser } = useContext(UserContext)
  const { refetch: refatchUser } = useQuery(
    'currentUser',
    fetchUser
  );


  const {
    data: Allusers,
    refetch: refetchUsers
  } = useQuery("users", getUsers);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<myteamSchemaType>({ resolver: zodResolver(myteamSchema) });

  const Getcurruser = (email: string) => {

    const findcrruser = Allusers?.data?.users.filter((i: any) => i.email === email)
    setCurUser(findcrruser)

  }


  const mutation = useMutation(profileupdate, {
    onSuccess: (data) => {
      toast.success(data?.message)
      refetchUsers()
    },
    onError: (error: any) => {
      toast.error(error?.message)
    }
  });



  const update_teams: SubmitHandler<myteamSchemaType> = (data) => {
    const payload = {
      userid: curUser[0]?._id,
      name: data.name,
      email: data.email,
      phone: data.phone,
      // cv: data.cv ? data.cv : "",
      address: data.address_municipility ? `${data.address_province}, ${data.address_district}, ${data.address_municipility}` : curUser[0]?.address

    }
    mutation.mutate({ data: payload })
  };

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

  const muatation = useMutation(verify_user, {
    onSuccess: (data) => {
      toast.success(data?.message)
      refetchUsers()
    },
    onError: (error: any) => {
      toast.error(error?.message)
    }
  })


  const muatation_delete = useMutation(delete_user, {
    onSuccess: (data) => {
      toast.success(data?.message)
      refetchUsers()
      refatchUser()

    },
    onError: (error: any) => {
      toast.error(error?.message)
    }
  })
  const Deleteuser = (userid: string) => muatation_delete.mutate({ userid })


  const verifyuser = (userid: string) => muatation.mutate({ userid })



  return (
    <>{

      muatation?.isLoading &&
      <div className="fixed left-0 z-[9999999] top-0 w-full h-[100vh] bg-black/70 cursor-not-allowed flex flex-col items-center justify-center">
        <img className="h-[200px] w-[200px]" src="/img/load.gif" alt="loader" />
        <h1 className="font-bold text-white text-center">Verifying user...</h1>
      </div>
    }
       
      <Table className="rounded-[10px]">
      {
                myteams?.filter((team) => team?.user_status === status)?.length > 0 &&
        <TableHeader>
          <TableRow>
            <TableHead className="font-semibold text-ghost">SN</TableHead>
            <TableHead className="font-semibold text-ghost">Name</TableHead>
            <TableHead className="font-semibold text-ghost">Email</TableHead>
            <TableHead className="font-semibold text-ghost">Phone</TableHead>
            <TableHead className="font-semibold text-ghost">Address</TableHead>
            <TableHead className="font-semibold text-ghost">Actions</TableHead>
          </TableRow>
        </TableHeader>}
        {
          isLoading ?
            <>
              <TableBody>

                <TableCell className="animate-pulse">      <div className="h-5 bg-slate-300 rounded"></div>
                </TableCell>
                <TableCell className="animate-pulse">      <div className="h-5 bg-slate-300 rounded"></div>
                </TableCell>
                <TableCell className="animate-pulse">      <div className="h-5 bg-slate-300 rounded"></div>
                </TableCell>
                <TableCell className="animate-pulse">      <div className="h-5 bg-slate-300 rounded"></div>
                </TableCell>
                <TableCell className="animate-pulse">      <div className="h-5 bg-slate-300 rounded"></div>
                </TableCell>
                <TableCell className="animate-pulse">      <div className="h-5 bg-slate-300 rounded"></div>
                </TableCell>

              </TableBody>
              <TableBody>

                <TableCell className="animate-pulse">      <div className="h-5 bg-slate-300 rounded"></div>
                </TableCell>
                <TableCell className="animate-pulse">      <div className="h-5 bg-slate-300 rounded"></div>
                </TableCell>
                <TableCell className="animate-pulse">      <div className="h-5 bg-slate-300 rounded"></div>
                </TableCell>
                <TableCell className="animate-pulse">      <div className="h-5 bg-slate-300 rounded"></div>
                </TableCell>
                <TableCell className="animate-pulse">      <div className="h-5 bg-slate-300 rounded"></div>
                </TableCell>
                <TableCell className="animate-pulse">      <div className="h-5 bg-slate-300 rounded"></div>
                </TableCell>

              </TableBody>
              <TableBody>

                <TableCell className="animate-pulse">      <div className="h-5 bg-slate-300 rounded"></div>
                </TableCell>
                <TableCell className="animate-pulse">      <div className="h-5 bg-slate-300 rounded"></div>
                </TableCell>
                <TableCell className="animate-pulse">      <div className="h-5 bg-slate-300 rounded"></div>
                </TableCell>
                <TableCell className="animate-pulse">      <div className="h-5 bg-slate-300 rounded"></div>
                </TableCell>
                <TableCell className="animate-pulse">      <div className="h-5 bg-slate-300 rounded"></div>
                </TableCell>
                <TableCell className="animate-pulse">      <div className="h-5 bg-slate-300 rounded"></div>
                </TableCell>

              </TableBody>
              <TableBody>

                <TableCell className="animate-pulse">      <div className="h-5 bg-slate-300 rounded"></div>
                </TableCell>
                <TableCell className="animate-pulse">      <div className="h-5 bg-slate-300 rounded"></div>
                </TableCell>
                <TableCell className="animate-pulse">      <div className="h-5 bg-slate-300 rounded"></div>
                </TableCell>
                <TableCell className="animate-pulse">      <div className="h-5 bg-slate-300 rounded"></div>
                </TableCell>
                <TableCell className="animate-pulse">      <div className="h-5 bg-slate-300 rounded"></div>
                </TableCell>
                <TableCell className="animate-pulse">      <div className="h-5 bg-slate-300 rounded"></div>
                </TableCell>

              </TableBody>


            </>
            :
            <>
              {
                myteams?.filter((team) => team?.user_status === status)?.length > 0 ?

                  myteams?.filter((team) => team?.user_status === status)?.map((item, index) => {
                    const download = () => {
                      if (item.cv) {
                        saveAs(item?.cv, 'resume')
                      } else {
                        toast.error("User don't have Cv")
                      }
                    }
                    return (

                      <TableBody key={index} className="text-[14px]">
                        <TableCell className="text-nowrap">{index + 1}</TableCell>
                        <TableCell className="text-nowrap">{item?.name}</TableCell>
                        <TableCell className="text-nowrap">{item?.email}</TableCell>
                        <TableCell className="text-nowrap">{item?.phone}</TableCell>
                        <TableCell className="text-nowrap">{item?.address.toLocaleLowerCase()}</TableCell>

                        <TableCell className="flex gap-2 items-center relative">
                          <span className="group" onClick={download}>
                            <Download
                              size={35}
                              className="cursor-pointer border-[1px] hover:bg-secondary p-2 rounded-md text-[20px] text-ghost"
                            />

                            <p className="absolute top-0 opacity-0 group-hover:opacity-100 transform duration-300 text-white px-1 bg-primary rounded-sm text-xs">
                              Download
                            </p>
                          </span>
                          {status === "pending" && currUser?.isAdmin === true && (
                            <Dialog>
                              <DialogTrigger asChild>
                                <span className="group" onClick={() => Getcurruser(item.email)}>
                                  <SquarePen
                                    size={35}
                                    className="cursor-pointer border-[1px] hover:bg-secondary p-2 rounded-md text-[20px] text-ghost"
                                  />

                                  <p className="absolute top-0 opacity-0 group-hover:opacity-100 transform duration-300 text-white px-1 bg-primary rounded-sm text-xs">
                                    Update
                                  </p>
                                </span>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                  <DialogTitle>Edit Team member Information</DialogTitle>
                                </DialogHeader>

                                <form onSubmit={handleSubmit(update_teams)}>
                                  <div className="py-4 flex gap-4 flex-col">
                                    <div className="flex flex-col gap-2">
                                      <Label htmlFor="name" className="font-semibold flex">
                                        <p>Name</p>
                                        <Asterisk className="text-red-500" size={11} />
                                      </Label>
                                      <Input
                                        id="name"
                                        className=" outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                                        {...register("name")}
                                        defaultValue={curUser[0]?.name}
                                        placeholder="Eg: Hari lal yadav"
                                      />
                                      <Errors error={errors.name?.message} />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                      <Label htmlFor="Email" className="font-semibold flex">
                                        <p>Email</p>
                                        <Asterisk className="text-red-500" size={11} />
                                      </Label>
                                      <Input
                                        id="Email"
                                        className=" outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                                        {...register("email")}
                                        defaultValue={curUser[0]?.email}
                                        placeholder="Eg: jhondoe@gmail.com"
                                      />
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
                                          type="text" {...register("phone")}
                                          defaultValue={curUser[0]?.phone}
                                          className="border-none outline-none focus-visible:ring-0 focus-visible:ring-offset-0" />
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

                                  </div>

                                  <DialogFooter>
                                    <Button type="submit">Save change</Button>

                                  </DialogFooter>
                                </form>


                              </DialogContent>
                            </Dialog>
                          )}

                          <span className="group" onClick={() => Deleteuser(item?._id)}>
                            <Trash2
                              size={35}
                              className="cursor-pointer border-[1px] hover:bg-secondary p-2 rounded-md text-[20px] text-ghost"
                            />

                            <p className="absolute top-0 opacity-0 group-hover:opacity-100 transform duration-300 text-white px-1 bg-primary rounded-sm text-xs">
                              Delete
                            </p>
                          </span>
                          {status === "pending" && currUser?.isAdmin === true && (
                            <span className="group" onClick={() => verifyuser(item?._id)}>
                              <MdOutlineVerified
                                size={35}
                                className="cursor-pointer border-[1px] hover:bg-secondary p-2 rounded-md text-[20px] text-ghost"
                              />

                              <p className="absolute top-0 opacity-0 group-hover:opacity-100 transform duration-300 text-white px-1 bg-primary rounded-sm text-xs">
                                Verify
                              </p>
                            </span>
                          )}
                        </TableCell>

                      </TableBody>

                    )
                  })
                  :
                  <h1 className="p-5 font-bold">No Data Found!</h1>

              }
            </>



        }
      </Table>
    </>

  );
};

export default Myteamtable;
