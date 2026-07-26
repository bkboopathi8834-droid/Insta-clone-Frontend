import './Suggestion.css'
import axios from 'axios';
import { useState, useEffect,useContext } from 'react';
import defaultprofile from '../assets/images/no-dp-image-2.webp';
import { userContext } from '../Context/LoginUser';
import loading from '../assets/logo/tube-spinner.svg'
import { Link } from 'react-router-dom';
import toast from "react-hot-toast";
function Suggestion(){
    const {loguser} = useContext(userContext);
    const [load, setLoad ] = useState(true)
    const [users, setUsers] = useState([])

    useEffect(()=>{
        getAlluser();
    },[])
    const getAlluser = async()=>{
        try{
            const token = localStorage.getItem("token");
            const res = await axios.get('https://insta-clone-serverside.onrender.com/api/suggestion',{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            });
            setUsers(res.data.allusers);
        }
        catch(error){
            toast.error(error.response.data.message);
        }
        finally{
            setLoad(false)
        }
    }
    
    return(
        <div className='suggestion-page'>
            {loguser && (
                <>
                <div className='Main-sug'>
                    <div className='sug-profile'>
                        <div className='pic-page'>
                            <img src={loguser.profilepic || defaultprofile} alt="" />
                            <div>
                                <p>{loguser.username}</p>
                                <p style={{color:"rgb(73, 78, 73)", fontSize:"17px"}}>{loguser.name}</p>
                            </div>
                        </div>
                        <div>
                            <p style={{color:"rgb(10, 0, 204)", fontWeight:"600"}}>switch</p>
                        </div>
                    </div>
                    <div>
                        <p>Suggestion for you</p>
                    </div>
                </div>
                 </>
                 )}

                 {load ? (
                    <div className='Loading-sug'>
                        <img src={loading} alt="Loading..." />
                    </div>
                 ):(
                    <div className='users-container'>
                        {users.slice(0,7).map((user)=>{
                            const isfollowing = loguser?.following?.some((id)=>id.toString()===user._id);
                            return(
                                <div key={user._id}>
                                    <div className='sug-profile-2'>
                                        <div>
                                            <Link to={`/profile/${user._id}`} className='pic-page-2'>
                                                <img src={user.profilepic || defaultprofile} alt="" />
                                                <div>
                                                    <p>{user.username}</p>
                                                    <p style={{color:"rgb(73, 78, 73)", fontSize:"17px"}}>{user.name}</p>
                                                </div>
                                            </Link>
                                        </div>
                                        <div>
                                            <p style={{color:"rgb(10, 0, 204)", fontWeight:"600"}}>{isfollowing ? "Following":"Follow"}</p>
                                        </div>
                                        
                                    </div>
                                </div>
                                

                            );
                        })}
                        <h5>© 2026 Instagram from Meta</h5>
                    </div>
                 )}
        </div>
    );
}
export default Suggestion;