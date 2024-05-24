import { IUser } from '@/type';
import { createContext } from 'react';

interface IUserContext {
    currUser: IUser | null;
    setCurrUser: (user: IUser | null) => void;
    isLoading: boolean;
}

const UserContext = createContext<IUserContext>({
    currUser: null,
    setCurrUser: () => {},
    isLoading: false,
});

export default UserContext;
