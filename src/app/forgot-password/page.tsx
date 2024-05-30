"use client"
import PageTitle from '@/components/common/PageTitle';
import { Button } from '@/components/ui/button';
import { MoveLeft, UserRound } from 'lucide-react';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { forgotSchema, forgotSchemaType } from '../Schema/forgotpasswordemail';
import { useRouter } from 'next/navigation';
import { useMutation } from 'react-query';
import { forgotpassword } from '../apiconnect/formhandler';
import toast from 'react-hot-toast';

const page = () => {
    const route=useRouter()
  const { register, handleSubmit, formState: { errors } ,reset} = useForm<forgotSchemaType>({
    resolver: zodResolver(forgotSchema),
  });
  const mutation=useMutation(forgotpassword, {
    onSuccess: (data) => {
        
      toast.success(data?.message)
      reset()
    },
    onError: (error: any) => {
      toast.error(error?.message)
    }
  })
  const onSubmit:SubmitHandler<forgotSchemaType> = (data) => mutation.mutate({data})
  return (
    <div className='p-5'>
        <p onClick={()=>route.push("/login")} className='mb-4 flex items-center gap-1 cursor-pointer'><MoveLeft />Back to Login</p>
      <PageTitle title='Reset Password'/>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="py-4 relative sm:w-[350px]">
          <label className="mb-4 text-md" htmlFor="email">
            Email
          </label>
          <div className="flex items-center border border-gray-300 rounded-md mb-1">
            <UserRound className="w-5 h-5 text-gray-500 mx-2" />
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="w-full p-2 placeholder:text-gray-500 placeholder:font-light"
              {...register('email')}
            />
          </div>
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>
        <Button disabled={mutation.isLoading} type="submit">Continue</Button>
      </form>
    </div>
  );
};

export default page;
