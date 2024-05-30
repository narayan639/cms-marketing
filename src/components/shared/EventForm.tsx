"use client";

import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Tiptap from "./Tiptap";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import eventFormSchema from "@/lib/validator";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";
import { useMutation } from "react-query";
import { addDailylog } from "@/app/apiconnect/formhandler";
import UserContext from "@/contextapi/userdetail/UserContext";
import Errors from "../ui/errors";

export default function EventForm() {
  const router = useRouter()

  const {handleRefetchUser}=useContext(UserContext)
  
  const form = useForm({
    resolver: zodResolver(eventFormSchema),
    defaultValues: {
      date: null,
      time: null,
      client_name: "",
      address: "",
      phonenumber: 97,
      company_name: "",
      budget: 1,
      requirements: "",
      feedback: "",
      remarks: "",
    },
  });
  const mutation = useMutation(addDailylog, {
    onSuccess: (data) => {
      toast.success(data?.message)
      handleRefetchUser()
      router.push("/daily-log")
    },
    onError: (error: any) => {
      toast.error(error?.message)
    }
  })


  const onSubmit = (data: any) => {
    eventFormSchema.parse(data);
    mutation.mutate({ data })
  };

  const handleCancel = () => {
    form.reset();
    router.push("/daily-log");
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-12 mt-10"
        >


          {/* Client Name and Address */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:pr-20">
            {/* Date of Event */}
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <Label htmlFor="dateOfEvent">
                    Date of event <span className="text-red-600">*</span>
                  </Label>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          id="dateOfEvent"
                          variant="outline"
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                          onClick={field.onBlur}
                        >
                          {field.value
                            ? format(field.value, "PPP")
                            : "Pick a date"}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value || undefined}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <Errors error={form.formState.errors.date?.message}/>
                </FormItem>
              )}
            />

            {/* Time input */}
            <FormField
              control={form.control}
              name="time"
              render={({ field }) => (
                <FormItem className="flex flex-col form-field">
                  <Label htmlFor="timeInput">
                    Time <span className="text-red-600">*</span>
                  </Label>
                  <FormControl>
                    <Input
                      {...field}
                      id="timeInput"
                      type="time"
                      className="w-full border-gray-300"
                      value={field.value ?? undefined} // Convert null to undefined
                    />
                  </FormControl>
                  <Errors error={form.formState.errors.time?.message}/>
                </FormItem>
              )}
            />
            {/* Client Name */}
            <FormField
              control={form.control}
              name="client_name"
              render={({ field }) => (
                <FormItem className="">
                  <Label htmlFor="clientName">
                    Client Name <span className="text-red-600">*</span>
                  </Label>
                  <Input
                    {...field}
                    id="client_name"
                    placeholder="Enter client name"
                    
                  />
                                    <Errors error={form.formState.errors.client_name?.message}/>

                </FormItem>
              )}
            />
            {/* Client Name and Address */}
            {/* Client Name */}
            <FormField
              control={form.control}
              name="budget"
              render={({ field }) => (
                <FormItem className="">
                  <Label htmlFor="budget">
                    Budget <span className="text-red-600">*</span>
                  </Label>
                  <Input
                    {...field}
                    type="number"
                    id="budget"
                    placeholder="Enter client name"
                    
                  />
                                    <Errors error={form.formState.errors.budget?.message}/>

                </FormItem>
              )}
            />

            {/* Address */}
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem className="">
                  <Label htmlFor="address">
                    Address <span className="text-red-600">*</span>
                  </Label>
                  <Input
                    {...field}
                    id="address"
                    placeholder="Enter client address"
                  />
                                    <Errors error={form.formState.errors.address?.message}/>

                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phonenumber"
              render={({ field }) => (
                <FormItem className="">
                  <Label htmlFor="phonenumber">
                    Phone Number <span className="text-red-600">*</span>
                  </Label>
                  <Input
                    {...field}
                    id="phonenumber"
                    type="number"
                    placeholder="Enter phone number"
                  />
                                    <Errors error={form.formState.errors.phonenumber?.message}/>

                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="company_name"
              render={({ field }) => (
                <FormItem className="">
                  <Label htmlFor="company_name">Company Name</Label>
                  <Input
                    {...field}
                    id="company_name"
                    placeholder="Enter company name"
                  />
                                    <Errors error={form.formState.errors.company_name?.message}/>

                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="feedback"
              render={({ field }) => (
                <FormItem className="">
                  <Label htmlFor="feedback">
                    Feedback <span className="text-red-600">*</span>
                  </Label>
                  <Input
                    {...field}
                    id="feedback"
                    placeholder="Enter feedback"
                  />
                                    <Errors error={form.formState.errors.feedback?.message}/>

                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="requirements"
              render={({ field }) => (
                <FormItem className="">
                  <Label htmlFor="requirements">
                    Requirements <span className="text-red-600">*</span>
                  </Label>
                  <Tiptap
                    description={field.value}
                    onChange={(content: string) => field.onChange(content)}
                    {...({ id: "requirements" } as any)}
                  />
                                    <Errors error={form.formState.errors.requirements?.message}/>

                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="remarks"
              render={({ field }) => (
                <FormItem className="">
                  <Label htmlFor="remarks">Remarks</Label>
                  <Textarea {...field} id="remarks" placeholder="Enter remarks" />
                          <Errors error={form.formState.errors.remarks?.message}/>
                </FormItem>
              )}
            />
          </div>


          <div className="flex justify-end gap-4 md:pr-20">
            {/* Cancel button */}
            <Button
              type="button"
              className="bg-blue-800 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              onClick={handleCancel}
            >
              Cancel
            </Button>

            {/* Submit button */}
            <Button
              type="submit"
              className="bg-blue-800 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              {
                mutation?.isLoading ? "Please wait..." : "Submit"
              }
            </Button>
          </div>
        </form>
      </Form>
    </LocalizationProvider>
  );
}
