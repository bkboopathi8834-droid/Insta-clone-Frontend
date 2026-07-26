import './Postcard.css'
import axios from 'axios';
import Card from './Card';
import load from '../assets/logo/bouncing-circles.svg';
import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { userContext } from '../Context/LoginUser';
import Story from '../Components/Story';
import toast from 'react-hot-toast';
function Postcard(){

const {loguser} = useContext(userContext)
const [posts, setPosts] = useState([]);
const [loading, setLoading] = useState(true);

const [storypart, setStorypart]= useState(false)

const {id} = useParams();

    useEffect(()=>{
        if(loguser){
            Allposts();
        }
    },[id,loguser]);

    const Allposts = async()=>{
        try{
            if(!id){
                const res = await axios.get('https://insta-clone-serverside.onrender.com/api/getallpost');
                const otherPosts = res.data.allPost.filter(
                (pos) => loguser?.following?.some((id)=> id.toString()===pos?.user?._id.toString()));

                const withoutpost = res.data.allPost.filter((post)=>post.user?._id.toString()!==loguser?._id.toString());
                if(otherPosts.length ===0){
                    setPosts(withoutpost);
                    setStorypart(true)
                    return;
                }   
                else{
                    setPosts(otherPosts);
                    setStorypart(true)
                    return
                }
                return;
            }
            else{
                const resId = await axios.get(`https://insta-clone-serverside.onrender.com/api/getSinglepost/${id}`);
                setPosts([resId.data.singlepost])
                
            }
        }
        catch(error){
            toast.error(error.response?.data?.message || "Something went wrong")
        }
        finally{
            setLoading(false)
        }
    }

    const Handlelikes = async(postId)=>{
        const token = localStorage.getItem("token")
        try{
            const res = await axios.post(`https://insta-clone-serverside.onrender.com/api/${postId}/like`,{},
                {
                    headers:{
                        Authorization: `Bearer ${token}`    
                    }
                }
            );
            setPosts((prevpost)=>
                prevpost.map((post)=>
                    post._id === postId ? res.data.clickpost:post
                )
            )
        }
        catch(error){
            toast.error(error.response.data.message)
        }
    }

    if(loading){
        return(
            <div className='load-animation'>
                <img src={load} alt="" />
            </div>
            );
    }
    
    return(
        <div className='Main-Card'>
           { storypart && ( <div className='story-part'>
                <Story/>
            </div>)}

            <div className='postcard-page'>
                {posts.map((post)=>(
                        <Card key={post._id} post={post} onlike={Handlelikes}/>
                ))}
            </div>
        </div>
        
    );
}

export default Postcard;