"use client";
import { loginSchema, loginSchemaType } from "@/app/Schema/login.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, UserRound } from "lucide-react";
import { useMutation, useQuery } from "react-query";
import { LockKeyhole } from "lucide-react";
import { useContext, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Errors from "../ui/errors";
import toast from 'react-hot-toast';
import { useRouter } from "next/navigation";
import { submitLoginForm } from "@/app/apiconnect/formhandler";
import UserContext from "@/contextapi/userdetail/UserContext";


export default function LoginForm() {
  const [see, setSee] = useState(false)
  const route = useRouter()
  const {setCurrUser} =useContext(UserContext)
  
  const { register, handleSubmit, formState: { errors } } = useForm<loginSchemaType>({ resolver: zodResolver(loginSchema) })

  const mutation = useMutation(submitLoginForm, {
    onSuccess: (data) => {
      route.push("/")
      toast.success(data?.message)
      setCurrUser(data?.user)
    },
    onError: (error: any) => {
      toast.error(error?.message)
    }
  });

  const onSubmit: SubmitHandler<loginSchemaType> = (data) => mutation.mutate(data)
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col md:flex-row m-6 space-y-8 md:space-y-0 bg-white shadow-2xl rounded-2xl">
        <div className="flex flex-col justify-center p-8 md:p-14">
          <span className="text-3xl font-semibold mb-3 text-blue-800">
            Login
          </span>
          <form onSubmit={handleSubmit(onSubmit)}>


            {/* Phone Number Input */}
            <div className="py-4 relative">
              <label className="mb-2 text-md" htmlFor="email">
                Email
              </label>
              <div className="flex items-center border border-gray-300 rounded-md mb-1">
                <UserRound className="w-5 h-5 text-gray-500 mx-2" />
                <input
                  type="email"
                  {...register("email")}
                  id="email"
                  placeholder="Enter your email"
                  className="w-full p-2 placeholder:text-gray-500 placeholder:font-light"
                />
              </div>
              <Errors error={errors.email?.message} />
            </div>

            {/* Password Input */}
            <div className="pb-4 relative">
              <label className="mb-2 text-md" htmlFor="password">
                Password
              </label>
              <div className="flex items-center border border-gray-300 rounded-md mb-1">
                <LockKeyhole className="w-5 h-5 text-gray-500 mx-2" />
                <input
                  type={see ? "text" : "password"}
                  id="password"
                  {...register("password")}
                  placeholder="Enter your password"
                  className="w-full p-2 placeholder:text-gray-500 placeholder:font-light"
                />
                {
                  see ?
                    <Eye className="cursor-pointer px-1" onClick={() => setSee(!see)} size={30} /> :
                    <EyeOff className="cursor-pointer px-1" onClick={() => setSee(!see)} size={30} />

                }

              </div>
              <Errors error={errors.password?.message} />
            </div>

            {/* Login Button */}
            <button type="submit" className={`w-full mt-3 p-2 rounded-lg mb-6 bg-blue-800 text-white hover:bg-blue-600 hover:border-gray-300 hover:border ${mutation?.isLoading ? "cursor-not-allowed opacity-50" : ""}`}>Login
            </button>
          </form>
          <p className="text-blue-600 cursor-pointer" onClick={()=>route.push("/forgot-password")}>Forgot password?</p>


        </div>
      </div>
    </div>
  );
}
