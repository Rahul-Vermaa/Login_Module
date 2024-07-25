import React, { createContext, useState, ReactNode, useEffect } from 'react';

import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import request from 'superagent';
import { useRouter } from 'next/router';
interface MyContextType {
    state: any;
    setState: React.Dispatch<React.SetStateAction<any>>;
}

const defaultState: MyContextType = {
    state: {},
    setState: () => {},
};

export const MyContext = createContext<MyContextType>(defaultState);

export const MyProvider = ({ children }: { children: ReactNode }) => {
    const [state, setState] = useState<any>({});
    const router = useRouter();

    useEffect( () => { 
        const token = Cookies.get('authToken') 
        console.log(token,"tytytytyt");
        if (token) { 
            try { 
                const decodedToken:{id:string} = jwtDecode(token) ; 
                console.log(decodedToken,"tototototo");
                (async ()=>{
                    const response = await request.get(`https://master.project.henceforthsolutions.com:3000/users/profile`).set('Authorization', `Bearer ${token}`);
                    // console.log(response.body, "alalalala")
                    setState(response.body); 
                })()
            } catch (error) { 
                console.error('Invalid token:', error); 
            } 
        }
        else{
            router.push('/');
        } 
    }, []);


    return (
        <MyContext.Provider value={{ state, setState }}>
            {children}
        </MyContext.Provider>
    );
};
