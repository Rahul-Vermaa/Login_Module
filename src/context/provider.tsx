import React, { createContext, useState, ReactNode, useEffect } from 'react';

import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import request from 'superagent';
interface MyContextType {
    state: any;
    setState: React.Dispatch<React.SetStateAction<any>>;
}

const defaultState: MyContextType = {
    state: {},
    setState: () => { },
};

export const MyContext = createContext<MyContextType>(defaultState);

export const MyProvider = ({ children }: { children: ReactNode }) => {
    const [state, setState] = useState<any>({});

    useEffect( () => { 
        const token = Cookies.get('authToken') 
        if (token) { 
            try { 
                const decodedToken:{id:string} = jwtDecode(token) ; 
                console.log(decodedToken,"tototototo");
                (async ()=>{
                    const response = await request.get(`https://master.project.henceforthsolutions.com:3000/users/${decodedToken.id}`).set('Authorization', `Bearer ${token}`);
                    setState(response.body); 
                })()
            } catch (error) { 
                console.error('Invalid token:', error); 
            } 
        } 
    }, []);

    
    return (
        <MyContext.Provider value={{ state, setState }}>
            {children}
        </MyContext.Provider>
    );
};
