import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const userContext = createContext();

function LoginUser({children}){

    const [loguser, setLoguser] = useState(null);

    useEffect(()=>{
        getuser();
    },[]);

    const getuser = async()=>{
        
        try{
            const token = localStorage.getItem("token");
            if(!token){
                setLoguser(null);
                return;
            }
            const res = await axios.get("https://insta-clone-serverside.onrender.com/api/loginuser",{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            });
            setLoguser(res.data.user);  
        }
        catch(error){

            toast.error(error.response?.data?.message || "Something went wrong!");
            setLoguser(null);
            localStorage.removeItem("token")
        }
    }

    return(
        <userContext.Provider value={{loguser, setLoguser , getuser}}>
            {children}
        </userContext.Provider>
    );
}
export default LoginUser;