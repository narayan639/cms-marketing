import axiosInstance from "@/utils/axiosInstance";
import axios from "axios";
import { getCookie } from "cookies-next";

interface LoginFormValues {
    email: string;
    password: string;
  }
  
  type PasswordChangeData = {
    password: string;
    new_password: string;
    confirm_password: string;
};

type Iteam={
  name: string
  email: string
  phone: string
  
}

type Iprofile={
  name: string
  email: string
  phone: string
  cv?: any
  profile_image?: any
}
type Ilog={
  log_id: string;
  client_name: string;
  address: string;
  phonenumber: string;
  company_name: string;
  requirements: string;
  feedback: string;
  remarks: string;
  budget: string;
  time: string
  date: string
}

export const getToken = () => {
    return getCookie('accesstoken');
};
export const RefreshToken = () => {
    return getCookie('refreshtoken');
};

export const logupdate = async ({ data }: { data: Ilog }) => {
  try {
    const res = await axiosInstance.put('/api/dailylog/editeventlogs', data);
    return res.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const changepassword = async ({ data }: { data: PasswordChangeData }) => {
  try {
    const res = await axiosInstance.post('/api/user/changepassword', data);
    return res.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const profileupdate = async ({ data }: { data: Iprofile }) => {
  try {
    const res = await axiosInstance.put('/api/user/editprofile', data);
    return res.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export async function submitLoginForm(formData: LoginFormValues): Promise<any> {
  try {
    const response = await axiosInstance.post("/api/user/login", formData);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
}

export const addTeam = async ({ data }:{data:Iteam }) => {
  try {
    const res = await axiosInstance.post('/api/user/signup', data);
    return res.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const verify_user = async ({userid}:{userid: string}) => {
  try {
    const res = await axiosInstance.put('/api/user/signup',{userid});
    return res.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const delete_user = async ({userid}:{userid: string}) => {
  try {
    const res = await axiosInstance.put('/api/user/deleteuser',{userid});
    return res.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const addDailylog = async ({ data }:{data:Iteam }) => {
  try {
    const res = await axiosInstance.post('/api/dailylog/create', data);
    return res.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const getlog_byid = async ({ data }:{data: {log_id: string}}) => {
  try {
    const res = await axiosInstance.post('/api/dailylog/getlogbyid', data);
    return res.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const getuser_byid = async ({ data }:{data: {user_id: string}}) => {
  try {
    const res = await axiosInstance.post('/api/user/getuserbyid', data);
    return res.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const delete_dailylogs = async ({ log_id }:{log_id: string}) => {
  try {
    const res = await axiosInstance.put('/api/dailylog/deletelogs',{log_id});
    return res.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const verify_log = async ({log_id}:{log_id: string}) => {
  try {
    const res = await axiosInstance.put('/api/dailylog/verifydailylog',{log_id});
    return res.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const forgotpassword = async ({ data }:{data:{email: string} }) => {
  try {
    const res = await axiosInstance.post('/api/forgotpassword/getemailfromuser', data);
    return res.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const resetpassword = async ({ data }:{data:{token: string, new_password: string} }) => {
  try {
    const res = await axiosInstance.post('/api/forgotpassword/getnewpasswordfromuser', data);
    return res.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};
