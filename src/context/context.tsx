/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { createContext, SetStateAction, useState } from "react";
import { useStorage } from "../hooks";
const { getUser,setUser } = useStorage()



export const initialUser = {
    isAuth: false,
    roles: [],
    profile:"",
    name: null,
    token: null,
    token_refresh: null,
}

export const initDataShared = {}

export const AppContext = createContext({
    user:initialUser,
    dataShared:initDataShared,
    onUserChange: (data: any) => {}
})

interface ContainerProps {
    children:any
}
export const AppContextProvider : React.FC <ContainerProps> = ({children}) => {
    const usrLocal = getUser() || initialUser //recuperation de l'utilisateur dans localStorage
    const [userCtx, setUserCtx] = useState(usrLocal)
    const [dataShared, setDataShared] = useState(initDataShared)
    const handleDataSharedChange = (c: SetStateAction<{}>) => {
        //console.log("new data ")
        //console.log(c)
        setDataShared(c)
    }
    const handleAuthChange = (c: any) => {
        
        setUserCtx(c)
        setUser(c);
    }

    const contextValue = {
        user: userCtx,
        onUserChange:handleAuthChange,
        dataShared: dataShared,
        onDataSharedChange:handleDataSharedChange,
    }

    return(
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    )
}