"use client";
import Container_with_nav from "@/components/ui/Container_with_nav";
import Breadcrumbs from "@/components/ui/breadcrumbs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  changepasswordSchema,
  changepassword_SchemaType,
} from "../Schema/change_password.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Errors from "@/components/ui/errors";
import { changepassword } from "../apiconnect/formhandler";
import { useMutation } from "react-query";
import toast from "react-hot-toast";

const page = () => {
  const [currentVisible, setCurrentVisible] = useState(false);
  const [newVisible, setNewVisible] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<changepassword_SchemaType>({
    resolver: zodResolver(changepasswordSchema),
  });


  const mutation = useMutation(changepassword, {
    onSuccess: (data) => {
      toast.success(data?.message)
      reset()
    },
    onError:(error: any)=>{
      toast.error(error?.message)
  }
  });

  const onSubmit: SubmitHandler<changepassword_SchemaType> = async(data) =>mutation.mutate({data})
  
  return (
    <div>
      <Container_with_nav page_title="Profile">
        <Breadcrumbs
          breadcrumbs={[
            { label: "Profile", href: "/profile" },
            {
              label: "Change password", href: "/profile",
              active: true,
            },
          ]}
        />

        <div className="w-full sm:2-[50%] md:w-[40%] lg:w-[35%] pt-10">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex gap-4 flex-col"
          >
            <div className="flex gap-2 flex-col relative">
              <Label htmlFor="current_password">Current Password</Label>
              <Input
                type={currentVisible ? "text" : "password"}
                className=" outline-none focus-visible:ring-0 focus-visible:ring-offset-0" 
                {...register("password")}
              />
              {currentVisible ? (
                <Eye
                  size={20}
                  className="absolute right-2 top-8 cursor-pointer"
                  onClick={() => setCurrentVisible(!currentVisible)}
                />
              ) : (
                <EyeOff
                  size={20}
                  className="absolute right-2 top-8 cursor-pointer"
                  onClick={() => setCurrentVisible(!currentVisible)}
                />
              )}
              <Errors error={errors.password?.message} />
            </div>
            <div className="flex gap-2 flex-col relative">
              <Label htmlFor="new_password">New Password</Label>
              <Input
                type={newVisible ? "text" : "password"}
                className=" outline-none focus-visible:ring-0 focus-visible:ring-offset-0" 
                {...register("new_password")}
              />
              {newVisible ? (
                <Eye
                  size={20}
                  className="absolute right-2 top-8 cursor-pointer"
                  onClick={() => setNewVisible(!newVisible)}
                />
              ) : (
                <EyeOff
                  size={20}
                  className="absolute right-2 top-8 cursor-pointer"
                  onClick={() => setNewVisible(!newVisible)}
                />
              )}
              <Errors error={errors.new_password?.message} />
            </div>
            <div className="flex gap-2 flex-col relative">
              <Label htmlFor="confirm_password">Confirm Password</Label>
              <Input
                type={confirmVisible ? "text" : "password"}
                className=" outline-none focus-visible:ring-0 focus-visible:ring-offset-0" 
                {...register("confirm_password")}
              />
              {confirmVisible ? (
                <Eye
                  size={20}
                  className="absolute right-2 top-8 cursor-pointer"
                  onClick={() => setConfirmVisible(!currentVisible)}
                />
              ) : (
                <EyeOff
                  size={20}
                  className="absolute right-2 top-8 cursor-pointer"
                  onClick={() => setConfirmVisible(!currentVisible)}
                />
              )}
              <Errors error={errors.confirm_password?.message} />
            </div>
            <Button disabled={mutation.isLoading} type="submit" className="w-fit">
              save change
            </Button>
          </form>
        </div>
      </Container_with_nav>
    </div>
  );
};

export default page;
