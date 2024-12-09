import { useState } from "react";

const UseFetch = (cb, options ={}) =>{
    const [data,SetData]=         useState(null);
    const [loading,SetLoading]=   useState(null);
    const [error,SetError]=       useState(null);

     const  fn = async(...args)=>{
          SetLoading(true);
          SetError(null);
          try {
            const responce = await cb(options, ...args);
            SetData(responce);
          } catch (error) {
            SetError(error)
          }finally{
            SetLoading(false)
          }
     };
     return {data , loading , error , fn};

 }

 export default UseFetch