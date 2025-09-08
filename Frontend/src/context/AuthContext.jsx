import React, { createContext } from 'react'
export const AuthDataContext  = createContext()
const ServerUrl = 'https://linked-in-clone-ecru.vercel.app';
let value ={ 
    ServerUrl
}
const AuthContext = ({children}) => {
  return (
    <>
    <AuthDataContext.Provider value={value}>
    {children}
    </AuthDataContext.Provider>
    </>
  )
}

export default AuthContext
