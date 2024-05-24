import axios from "axios";
import { getToken } from "./formhandler";

export const fetchCache = 'force-no-store'
export const revalidate = 0
export const dynamic = 'force-dynamic'

const headers = {
    'Cache-Control': 'no-store'
};
const token = getToken();

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
    if (!token) {
        throw new Error('No token found');
    }
    try {
        const res = await axios.get("/api/dailylog/getall", 
 {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }        );
        return res;
    } catch (error) {
        console.error('Error fetching daily logs:', error);
        return null;
    }
};
