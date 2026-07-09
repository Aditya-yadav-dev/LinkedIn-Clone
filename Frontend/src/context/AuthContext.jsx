import React, { createContext } from 'react'
export const AuthDataContext  = createContext()
// const ServerUrl = 'https://linked-in-clone-ecru.vercel.app';
// const ServerUrl = 'http://localhost:3000';
const ServerUrl = 'https://linkedin-clone-3kb9.onrender.com';
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
