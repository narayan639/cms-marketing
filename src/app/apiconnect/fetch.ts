import axios from "axios";

export const fetchCache = 'force-no-store'
export const revalidate = 0 // seconds
export const dynamic = 'force-dynamic'

const headers = {
    'Cache-Control': 'no-store'
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
        const res = await fetch("/api/dailylog/getall", {
            next:{revalidate}
        } );
        return await res.json();
    } catch (error) {
        console.error('Error fetching daily logs:', error);
        return null;
    }
};
