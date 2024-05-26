
export type IUser = {
    name: string;
    email: string;
    address: string;
    phone: string;
    isAdmin: boolean;
    id: string;
    team: []
    dailylog:[]
    profile: string
    cv: string
    addby: string
};
export type IUserx = {
    name: string;
    email: string;
    address: string;
    phone: string;
    isAdmin: boolean;
    _id: string;
    team: []
    dailylog:[]
};
export type Idailylog={
    client_name: string
     company_name: string
     address: string
     phonenumber: string
     date: string
     time: string
     budget: string
     createdAt: string
}