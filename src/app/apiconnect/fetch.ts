import axios from "axios";

const headers = {
  'Cache-Control': 'no-cache, no-store, must-revalidate',
  'Pragma': 'no-cache',
  'Expires': '0'
};

export const getUsers = async () => {
    try {
        const res = await axios.get("/api/user/allusers", { headers });
        return res;
    } catch (error) {
        console.error('Error fetching users:', error);
        return null;
    }
};

export const getEmails = async () => {
    try {
        const res = await axios.get("/api/user/getallmails", { headers });
        return res;
    } catch (error) {
        console.error('Error fetching emails:', error);
        return null;
    }
};

export const getDailylogs = async () => {
    try {
        const res = await axios.get("/api/dailylog/getall", { headers });
        return res;
    } catch (error) {
        console.error('Error fetching daily logs:', error);
        return null;
    }
};
