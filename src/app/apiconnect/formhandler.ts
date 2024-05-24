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
  address_municipility: string,
  address_district: string,
  address_province: string,
  cv?: any
}

type Iprofile={
  name: string
  email: string
  phone: string
  address: string | undefined
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
    return getCookie('token');
};


export const logupdate = async ({ data }: { data: Ilog }) => {
  try {
      const token = getToken();
      const res = await axios.put('/api/dailylog/editeventlogs', data, {
          headers: {
              Authorization: `Bearer ${token}`,
          },
      });
      return res.data;
  } catch (error: any) {
    throw new Error(error.response.data.message); 
  }
};

export const changepassword = async ({ data }: { data: PasswordChangeData }) => {
    try {
        const token = getToken();
        const res = await axios.post('/api/user/changepassword', data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res.data;
    } catch (error: any) {
      throw new Error(error.response.data.message); 
    }
};

export const profileupdate = async ({ data }: { data: Iprofile }) => {
    try {
        const token = getToken();
        const res = await axios.put('/api/user/editprofile', data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res.data;
    } catch (error: any) {
      throw new Error(error.response.data.message); 
    }
};

export async function submitLoginForm(formData: LoginFormValues): Promise<any> {
    try {
      const response = await axios.post("/api/user/login", formData);
      return response.data; 
    } catch (error: any) {
      throw new Error(error.response.data.message); 
    }
}

export const addTeam = async ({ data }:{data:Iteam }) => {
  try {
      const token = getToken();
      const res = await axios.post('/api/user/signup', data, {
          headers: {
              Authorization: `Bearer ${token}`,
          },
      });
      return res.data;
  } catch (error: any) {
    throw new Error(error.response.data.message); 
  }
};

export const verify_user = async ({userid}:{userid: string}) => {
  try {
      const token = getToken();
      const res = await axios.put('/api/user/signup',{userid}, {
          headers: {
              Authorization: `Bearer ${token}`,
          },
      });
      return res.data;
  } catch (error: any) {
    throw new Error(error.response.data.message); 
  }
};
export const delete_user = async ({userid}:{userid: string}) => {
  try {
      const token = getToken();
      const res = await axios.put('/api/user/deleteuser',{userid}, {
          headers: {
              Authorization: `Bearer ${token}`,
          },
      });
      return res.data;
  } catch (error: any) {
    throw new Error(error.response.data.message); 
  }
};

export const addDailylog = async ({ data }:{data:Iteam }) => {
  try {
      const token = getToken();
      const res = await axios.post('/api/dailylog/create', data, {
          headers: {
              Authorization: `Bearer ${token}`,
          },
      });
      return res.data;
  } catch (error: any) {
    throw new Error(error.response.data.message); 
  }
};

export const getlog_byid = async ({ data }:{data: {log_id: string}}) => {
  try {
      const res = await axios.post('/api/dailylog/getlogbyid', data);
      return res.data;
  } catch (error: any) {
    throw new Error(error.response.data.message); 
  }
};

export const delete_dailylogs = async ({ log_id }:{log_id: string}) => {
  try {
      const token = getToken();
      const res = await axios.put('/api/dailylog/deletelogs',{log_id}, {
          headers: {
              Authorization: `Bearer ${token}`,
          },
      });
      return res.data;
  } catch (error: any) {
    throw new Error(error.response.data.message); 
  }
};

export const verify_log = async ({log_id}:{log_id: string}) => {
  try {
      const token = getToken();
      const res = await axios.put('/api/dailylog/verifydailylog',{log_id}, {
          headers: {
              Authorization: `Bearer ${token}`,
          },
      });
      return res.data;
  } catch (error: any) {
    throw new Error(error.response.data.message); 
  }
};