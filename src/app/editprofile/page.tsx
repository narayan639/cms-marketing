"use client";
import Container_with_nav from "@/components/ui/Container_with_nav";
import Breadcrumbs from "@/components/ui/breadcrumbs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useContext, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Errors from "@/components/ui/errors";
import { profileupdate } from "../apiconnect/formhandler";
import { useMutation, useQuery } from "react-query";
import toast from "react-hot-toast";
import { district_list, municipility_list, province_list } from "../Country_data/countryData";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import UserContext from "@/contextapi/userdetail/UserContext";
import { profileSchema, profileSchemaType } from "../Schema/profileedit.schema";
import { getEmails } from "../apiconnect/fetch";
import { MailCheck, MailX } from 'lucide-react';
import axios from "axios";

const page = () => {
  const [alldistrict, setAlldistrict] = useState<string[]>([]);
  const [allmunicipility, setAllmunicipility] = useState<string[]>([]);
  const [province, setProvince] = useState("");
  const [newemail, setnewemail] = useState("");
  const [district, setDistrict] = useState("");
  const [profile, setprofile] = useState("");
  const [resume, setresume] = useState("");
  const [load, setLoad] = useState(false);
  const { currUser } = useContext(UserContext);
  const [image, setImage] = useState<File | null>(null);
  const [image_cv, setImage_cv] = useState<File | null>(null);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [selectedFile_cv, setSelectedFile_cv] = useState<string | null>(null);

  const { register, handleSubmit,watch, formState: { errors }, trigger } = useForm<profileSchemaType>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: currUser?.name ,
      email: currUser?.email,
      phone: currUser?.phone,
    }
  });

  const { data: email, refetch: refetchUsersemail } = useQuery("emails", getEmails);
const {handleRefetchUser} =useContext(UserContext)
  const filteredEmails = email?.data.emails.filter((email: string) => email !== currUser?.email);
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

  const mutation = useMutation(profileupdate, {
    onSuccess: (data) => {
      toast.success(data?.message);
      refetchUsersemail();
      handleRefetchUser();
    },
    onError: (error: any) => {
      toast.error(error?.message);
    }
  });

  const validateFile = (file: File) => {
    const validTypes = ['image/png', 'image/jpg', 'image/jpeg'];
    const maxSize = 5 * 1024 * 1024; // 5 MB
    if (!validTypes.includes(file.type)) {
      toast.error("Invalid file type. Only PNG, JPG, and JPEG are allowed.");
      return false;
    }
    if (file.size > maxSize) {
      toast.error("File size exceeds the 5MB limit.");
      return false;
    }
    return true;
  };

  const OnChangeHandler_cv: (e: React.ChangeEvent<HTMLInputElement>) => void = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (!validateFile(file)) {
        return;
      }
      setImage_cv(file);

      // FileReader to preview image
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedFile_cv(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const OnChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (!validateFile(file)) {
        return;
      }
      setImage(file);

      // FileReader to preview image
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedFile(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmitHandle_cv = async (e: any) => {
    e.preventDefault();
    try {
      if (!image_cv) {
        return;
      }
      setLoad(true);
      const formData = new FormData();
      formData.append('image', image_cv);
      const response = await axios.post("/api/uploadimage", formData);
      const data = response.data;
      if (data) {
        setresume(data.msg);
        setLoad(false);
      }
    } catch (error: any) {
      console.log("err", error.message);
    }
  };

  useEffect(() => {
    if (image_cv) {
      const e = { preventDefault: () => {} };
      onSubmitHandle_cv(e);
    }
  }, [image_cv]);

  const onSubmitHandle = async (e: any) => {
    e.preventDefault();
    try {
      if (!image) {
        return;
      }
      setLoad(true);
      const formData = new FormData();
      formData.append('image', image);
      const response = await axios.post("/api/uploadimage", formData);
      const data = response.data;
      if (data) {
        setprofile(data.msg);
        setLoad(false);
      }
    } catch (error: any) {
      console.log("err", error.message);
    }
  };

  useEffect(() => {
    if (image) {
      const e = { preventDefault: () => {} };
      onSubmitHandle(e);
    }
  }, [image]);

  const onSubmit: SubmitHandler<profileSchemaType> = async (data) => {
    if (!filteredEmails?.includes(newemail)) {
      const payload = {
        userid: currUser?.id,
        name: data.name,
        email: data.email,
        phone: data.phone,
        cv: resume ? resume : currUser?.cv ? currUser?.cv : "",
        profile_image: profile ? profile : currUser?.profile ? currUser?.profile : "",
        address: data.address_municipility ? `${data.address_province}, ${data.address_district}, ${data.address_municipility}` : currUser?.address
      };
      mutation.mutate({ data: payload });
    } else {
      toast.error("Email already taken!");
    }
  };


  return (
    <div>
      <Container_with_nav page_title="Edit profile">
        <Breadcrumbs
          breadcrumbs={[
            { label: "Profile", href: "/profile" },
            {
              label: "Edit profile", href: "/profile/editprofile",
              active: true,
            },
          ]}
        />
        {currUser ? (
          <div className="w-full pt-10 flex flex-col md:flex-row gap-5">
            <div className="h-[150px] w-[150px] sm:h-[200px] sm:w-[200px] md:h-[200px] xl:h-[250px]  md:w-[200px] xl:w-[250px] rounded-full overflow-hidden relative">
              <Avatar className="h-full w-full">
                <AvatarImage src={selectedFile ? selectedFile : currUser?.profile ? currUser?.profile : "https://github.com/shadcn.png"} />
                <AvatarFallback>profile</AvatarFallback>
              </Avatar>
            </div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex gap-4 flex-col"
            >
              <div className="flex flex-col md:flex-row gap-5 w-full">
                <section className="w-full flex flex-[0.5]">
                  <label htmlFor="uploadp" className="cursor-pointer h-[20vh] w-full flex items-center justify-center border-2 border-dashed">
                    <input type="file" name="image" id="uploadp" className="hidden" onChange={OnChangeHandler} />
                    <p className="text-zinc-500 font-semibold">Upload Profile</p>
                  </label>
                </section>
                {
                  currUser && currUser?.isAdmin === false &&
                <section className="w-full flex flex-[0.5]">
                  <label htmlFor="cv" className="h-[20vh] relative cursor-pointer flex items-center justify-center w-full border-2 border-dashed rounded-md">
                    <img className="h-full w-full object-contain" src={selectedFile_cv ? selectedFile_cv : currUser?.cv ? currUser?.cv : "https://wallpapers.com/images/featured/blank-white-background-xbsfzsltjksfompa.jpg"} alt="" />
                    {!resume && !currUser?.cv && <h1 className="font-bold absolute text-zinc-700">Click Upload Resume</h1>}
                  </label>
                  <Input type="file" id="cv" className="border-2 hidden" onChange={OnChangeHandler_cv} />
                </section>
                }
              </div>

              <div className="flex gap-2 flex-col relative">
                <Label htmlFor="current_password">Full Name</Label>
                <Input
                  className=" outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                  placeholder="Eg: John Doe"
                  {...register("name")}
                  type="text"
                />
                { errors?.name?.message &&
                <Errors error={errors?.name?.message} />
                }
              </div>
              <div className="flex gap-2 flex-col relative">
                <Label htmlFor="new_password">Email</Label>
                <div className="flex items-center border rounded-lg">
                  <Input
                    type="text"
                    className=" outline-none border-none focus-visible:ring-0 focus-visible:ring-offset-0"
                    placeholder="Eg: johndoe@gmail.com"
                    {...register("email")}
                    onChange={(e: any) => setnewemail(e.target.value)}
                  />
                  {(!filteredEmails?.includes(newemail) && emailPattern.test(newemail)) && <MailCheck className="px-2 text-green-500" size={40} />}
                  {!emailPattern.test(newemail) && newemail.length > 0 && <MailX className="px-2 text-red-500" size={40} />}
                </div>
                <Errors error={errors?.email?.message} />
                {filteredEmails?.includes(newemail) && <Errors error="Email already taken!" />}
              </div>
              <div className="flex gap-2 flex-col relative">
                <Label htmlFor="confirm_password">Phone</Label>
                <div className="flex items-center border rounded-lg">
                  <h2 className="bg-secondary h-10 flex items-center justify-center px-2">+977</h2>
                  <Input
                    {...register("phone")}
                    type="number" className="border-none outline-none focus-visible:ring-0 focus-visible:ring-offset-0" />
                </div>
                <Errors error={errors?.phone?.message} />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="Address">Address</Label>
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
                    {...register("address_municipility")}
                    className="text-sm p-2 rounded-md cursor-pointer"
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
                <Errors error={errors?.address_municipility?.message} />
              </div>

              <Button disabled={load} type="submit" className={`w-fit ${mutation?.isLoading ? "cursor-not-allowed opacity-90" : ""}`}>
                {mutation.isLoading ? "Saving.." : "Save Change"}
              </Button>
            </form>
          </div>
        ) : (
          <div className="border border-blue-100 shadow rounded-md p-4 w-full mx-auto h-[50vh] mt-5">
            <div className="animate-pulse flex space-x-4">
              <div className="rounded-full bg-slate-300 h-36 w-36"></div>
              <div className="flex-1 space-y-20 py-1">
                <div className="h-10 bg-slate-300 rounded"></div>
                <div className="space-y-20">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="h-10 bg-slate-300 rounded col-span-2"></div>
                    <div className="h-10 bg-slate-300 rounded col-span-1"></div>
                  </div>
                  <div className="h-10 bg-slate-300 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Container_with_nav>
    </div>
  );
};

export default page;
