import { IUser } from '@/type';
import { createContext } from 'react';

interface IUserContext {
    currUser: IUser | null;
    setCurrUser: (user: IUser | null) => void;
    isLoading: boolean;
    handleRefetchUser: () => void;
}

const UserContext = createContext<IUserContext>({
    currUser: null,
    setCurrUser: () => {},
    isLoading: false,
    handleRefetchUser: () => {}
});

export default UserContext;
