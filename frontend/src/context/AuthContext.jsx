import {createContext} from "react"
//
const userAuthContext = createContext()

export const  AuthContextProvider=({children})=>{
    return <userAuthContext.Provider value={}>{children}</userAuthContext.Provider>
}

export const useUserAuth=()=>{
    return userContext(userAuthContext)
}