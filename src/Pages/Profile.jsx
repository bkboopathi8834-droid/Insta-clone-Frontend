import './profile.css';
import { useContext, useEffect, useState } from "react";
import {Link, useParams} from 'react-router-dom'
import { userContext } from "../Context/LoginUser";
import profilephoto from '../assets/images/no-dp-image-2.webp'
import axios from 'axios';
import load from '../assets/logo/tube-spinner.svg';
import toast from "react-hot-toast";
function Profile(){
    const {loguser,setLoguser} = useContext(userContext);

    const {id} = useParams();

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true)
    const [profileuser, setProfileuser] = useState([]);

    useEffect(()=>{
         getpost();
    },[id]);

    const handlefollow=async(ID)=>{
        try{
            const token = localStorage.getItem("token");
            const res = await axios.put(`https://insta-clone-serverside.onrender.com/api/follow/${ID}`,{},{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            });
            getpost();
            setLoguser(res.data.LoginUser);
            setProfileuser(res.data.TargetUser);
        }
        catch(error){
            toast.error(error.response?.data?.message || "Something went wrong")
        }
    }
    
       const getpost = async()=>{
        const token = localStorage.getItem("token");
        try{
            if(id){
                const res = await axios.get(`https://insta-clone-serverside.onrender.com/api/singleuser/${id}`);
                setProfileuser(res.data.getuser);
                
                
                const post = await axios.get(`https://insta-clone-serverside.onrender.com/api/${id}/posts`);
                setPosts(post.data.posts);
                
                return;
            }
            else{
                const res= await axios.get('https://insta-clone-serverside.onrender.com/api/getuserpost',{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setPosts(res.data.posts);
            setProfileuser(loguser)
            }
        }   
        catch(error){
            toast.error(error.response.data.message);
        }
        finally{
            setLoading(false);
        }
    } 
    if(!loguser){
        return(
            <div className='loading-animation'>
                <img src={load} alt="Loading" />
            </div>
        )
    }
    const isOwner = loguser?._id === profileuser?._id;
    const isfollowing = loguser.following?.some((Id)=> Id.toString()===id);
    return(
        <div className="profile-page">
            <div className="profile-part">
                <img src={profileuser?.profilepic || profilephoto} alt="" />
                <div className='top-part'>
                    <h2>{profileuser?.username}</h2>
                    <h4 style={{color:"rgb(57, 56, 56)"}}>{profileuser?.name}</h4>
                
                    <div className='follow-part'>
                        <p>{posts.length} posts</p>
                        <p>{profileuser?.followers?.length} followers</p>
                        <p>{profileuser?.following?.length} following</p>
                    </div>
                    <div>
                        <h4>{profileuser?.bio}</h4>
                    </div>
                </div>
            </div>
            {isOwner? (<div className='btn-part'>
                        <Link to="/editprofile"> <button>Edit Profile</button></Link>
                        <button>View Archive</button>
                    </div>) :(
                        <div className='btn-part'>
                            <button onClick={()=>handlefollow(profileuser._id)}>{isfollowing ? "Unfollow":"Follow"}</button>
                            <button>Message</button>
                        </div>    
                    )}
            <div className="post-part">
                {loading ? <div className='load-animation'>
                                <img src={load} alt="" />
                            </div> :(
                    <div className='posts'>
                        {posts.map((post)=>{
                            return(     
                            <div key={post._id} >
                                <Link to={`/post/${post._id}`}>
                                    <img src={post.image} alt={post.caption} />
                                </Link>
                            </div>
                            );
                        })}
                    </div> 
                )
                }
            </div>
        </div>
    );
}
export default Profile;