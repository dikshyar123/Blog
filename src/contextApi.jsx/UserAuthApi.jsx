import { createContext, useState } from "react";

export const User = createContext();



function UserAuthApi({children}) {
    // 1
    const [data , setData]= useState(localStorage.getItem("auth") || null);
  return <User.Provider value={[data, setData]}>{children}</User.Provider>
  
}

export default UserAuthApi;