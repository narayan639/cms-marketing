"use client"
import { setnewpasswordSchema, setnewpassword_SchemaType } from '@/app/Schema/setnewpassword'
import { resetpassword } from '@/app/apiconnect/formhandler'
import PageTitle from '@/components/common/PageTitle'
import { Button } from '@/components/ui/button'
import Errors from '@/components/ui/errors'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff, MoveLeft } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useMutation } from 'react-query'

const page = () => {
    const [newVisible, setNewVisible] = useState(false);
    const [confirmVisible, setConfirmVisible] = useState(false);
    const route=useRouter()

    const path=usePathname()
    const [_, userId, token] = path.split("/").slice(-3);



    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
      } = useForm<setnewpassword_SchemaType>({
        resolver: zodResolver(setnewpasswordSchema),
      });
    
    
      const mutation = useMutation(resetpassword, {
        onSuccess: (data) => {
          toast.success(data?.message)
          reset()
        },
        onError:(error: any)=>{
          toast.error(error?.message)
      }
      });
      console.log(mutation)
    
      const onSubmit: SubmitHandler<setnewpassword_SchemaType> = async(data) =>{
        const payload={
          new_password: data.new_password,
          token
        }

        mutation.mutate({data:payload})
      }
      
  return (
    <div className='p-5'>
    <p onClick={()=>route.push("/login")} className='mb-4 flex items-center gap-1 cursor-pointer'><MoveLeft />Back to Login</p>
  <PageTitle title='Set New Password'/>
  <form onSubmit={handleSubmit(onSubmit)} className='w-[350px] mt-4 flex flex-col gap-2'>
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
                  onClick={() => setConfirmVisible(!confirmVisible)}
                />
              ) : (
                <EyeOff
                  size={20}
                  className="absolute right-2 top-8 cursor-pointer"
                  onClick={() => setConfirmVisible(!confirmVisible)}
                />
              )}
              <Errors error={errors.confirm_password?.message} />
            </div>
            <Button disabled={mutation.isLoading}  type="submit" className="w-fit">
              Reset Password
            </Button>
  </form>
 
</div>
  )
}

export default page