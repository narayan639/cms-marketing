"use client";
import React, { useContext } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Tiptap from "./Tiptap";
import { Textarea } from "@/components/ui/textarea";
import { FormField, FormItem } from "@/components/ui/form";
import { EventDataSchema, eventdataSchemaType } from "@/app/Schema/edit.log.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { logupdate } from "@/app/apiconnect/formhandler";
import { useMutation } from "react-query";
import toast from "react-hot-toast";
import Errors from "../ui/errors";
import UserContext from "@/contextapi/userdetail/UserContext";
import { Button } from "../ui/button";

interface EventData {
  _id: string;
  client_name: string;
  address: string;
  phonenumber: string;
  company_name: string;
  requirements: string;
  feedback: string;
  remarks: string;
  budget: string;
  time: string;
  date: string;
}



export default function EditForm({ currentlog }: { currentlog: EventData }) {
  const router = useRouter();
  const {handleRefetchUser}=useContext(UserContext)

  const { register, handleSubmit, formState: { errors }, reset, control } = useForm<eventdataSchemaType>({ resolver: zodResolver(EventDataSchema) });

  const mutation = useMutation(logupdate, {
    onSuccess: (data) => {
      toast.success(data?.message)
      handleRefetchUser()
      router.push("/daily-log")
    },
    onError: (error: any) => {
      toast.error(error?.message)
    }
  });


  const onSubmit: SubmitHandler<eventdataSchemaType> = async (data) => {
    const payload = {
      log_id: currentlog?._id,
      client_name: data?.client_name,
      address: data?.address,
      phonenumber: data?.phonenumber,
      company_name: data?.company_name,
      requirements: data?.requirements || '',
      feedback: data?.feedback,
      remarks: data?.remarks || '',
      budget: data?.budget,
      time: currentlog?.time,
      date: currentlog?.date
    }
    mutation.mutate({ data: payload })
  };

  const handleCancel = () => {
    reset();
    router.push("/daily-log");
  };

  return (
    <div className="mt-10">
      {
        currentlog ?

          <form onSubmit={handleSubmit(onSubmit)} className="w-full sm:w-[80%] md:w-[90%] lg:w-[70%]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:pr-20">
              <div className="flex flex-col">
                <Label htmlFor="clientName" className="mb-2">
                  Client Name
                </Label>
                <Input
                  {...register("client_name")}
                  id="client_name"
                  type="text"
                  className="capitalize"
                  defaultValue={currentlog?.client_name}
                  placeholder="Enter client name"
                />
                <Errors error={errors.client_name?.message} />
              </div>

              <div className="flex flex-col">
                <Label htmlFor="address" className="mb-2">
                  Address
                </Label>
                <Input
                  {...register("address")}
                  id="address"
                  defaultValue={currentlog?.address}
                  type="text"
                  placeholder="Enter address"
                />            <Errors error={errors.address?.message} />

              </div>
              <div className="flex flex-col">
                <Label htmlFor="phone" className="mb-2">
                  Phone Number
                </Label>
                <div className="flex items-center border rounded-lg">
                <h2 className="bg-secondary h-10 flex items-center justify-center px-2">+977</h2>
                <Input
                  id="phone"
                  type="number"
                  className="border-none"
                  defaultValue={currentlog?.phonenumber}
                  placeholder="Enter phone number"
                  {...register("phonenumber")}
                />
                </div>
                <Errors error={errors.phonenumber?.message} />

              </div>
              
              <div className="flex flex-col">
                <Label htmlFor="budget" className="mb-2">
                  Budget
                </Label>
                <div className="flex items-center border rounded-lg">
                <h2 className="bg-secondary h-10 flex items-center justify-center px-2">Rs</h2>
                <Input
                  id="budget"
                  type="number"
                  className="border-none"
                  defaultValue={currentlog?.budget}
                  placeholder=""
                  {...register("budget")}
                />
                </div>
                <Errors error={errors.budget?.message} />

              </div>
              
              <div className="flex flex-col">
                <Label htmlFor="companyName" className="mb-2">
                  Company Name
                </Label>
                <Input
                  id="companyName"
                  type="text"
                  defaultValue={currentlog?.company_name}
                  placeholder="Enter company name"
                  {...register("company_name")}
                />
                <Errors error={errors.company_name?.message} />

              </div>

              

              <div className="flex flex-col">
                <Label htmlFor="feedback" className="mb-2">
                  Feedback
                </Label>
                <Input
                  id="feedback"
                  placeholder="Enter feedback"
                  defaultValue={currentlog?.feedback}
                  {...register("feedback")}
                />
                <Errors error={errors.feedback?.message} />

              </div>

              <FormField
                control={control}
                name="requirements"
                defaultValue={currentlog?.requirements}
                render={({ field }) => (
                  <FormItem className="">
                    <Label htmlFor="requirements">Requirements</Label>
                    <Tiptap
                      description={field.value}
                      onChange={(content: string) => field.onChange(content)}
                      {...({ id: "requirements" } as any)}
                    />
                    <Errors error={errors.requirements?.message} />

                  </FormItem>
                )}
              />



              <div className="flex flex-col">
                <Label htmlFor="remarks" className="mb-2">
                  Remarks
                </Label>
                <Textarea
                  defaultValue={currentlog?.remarks}
                  id="remarks"
                  placeholder="Enter remarks"
                  {...register("remarks")}
                />

              </div>
            </div>
            <div className="flex justify-end gap-4 mt-2 md:mt-0 md:pr-20">
              <Button
                type="button"
                className="bg-blue-800 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                onClick={handleCancel}
              >
                Cancel
              </Button>
              <Button
              disabled={mutation.isLoading}
                type="submit"
                className="bg-blue-800 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              >
                {
                  mutation?.isLoading?
                  "Updating":
                  "update"
                }
              </Button>
            </div>
          </form> :

          null
      }
    </div>
  );
}
