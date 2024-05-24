'use client';

import UserContext from './UserContext';
import axios from 'axios';
import { IUser } from '@/type';
import { getToken } from '@/app/apiconnect/formhandler';
import { useQuery } from 'react-query';
import { useEffect, useState } from 'react';

export const fetchUser = async (): Promise<IUser | null> => {
    const token = getToken();
    if (!token) {
        throw new Error('No token found');
    }
    const { data } = await axios.get('/api/user/me', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return data.user;
};

const UserContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [currUser,setCurrUser]=useState<IUser | null>(null)    
        const { data: userinfo, error, isLoading, refetch: refetchUser } = useQuery<IUser | null>(
        'currentUser',
        fetchUser,
        {
          initialData: null,
          enabled: !!getToken(), // Only fetch if the token exists
        }
      );
    
      useEffect(() => {
        if (!currUser && getToken()) {
          refetchUser();
        }
      }, [currUser, refetchUser]);
    return (
        <UserContext.Provider value={{  currUser: userinfo || null, setCurrUser, isLoading }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContextProvider;
