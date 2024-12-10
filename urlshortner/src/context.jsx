import {createContext, useContext, useEffect }  from "react";
import UseFetch from "./hooks/use-Fetch";
import { getCurrentUser } from "./Db/apiAuth";

const UrlContext = createContext()

const UrlProvider =({children}) =>{
   const {data:user,loading,fn:fetchUser}= UseFetch(getCurrentUser);

   const isAuthenticated = user?.role ==="authenticated";

   useEffect(()=>{
      fetchUser();
   },[]);
   return (
   <UrlContext.Provider value={{user,fetchUser,loading,isAuthenticated}}>
    {children}
   </UrlContext.Provider>
   );
}
export const UrlState= ()=>{
   return useContext(UrlContext);
}


export default UrlProvider