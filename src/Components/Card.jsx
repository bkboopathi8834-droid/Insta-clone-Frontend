import axios from 'axios';
import { Link,useNavigate } from 'react-router-dom'
import { userContext } from '../Context/LoginUser';
import './Card.css'
import { useContext, useEffect, useState } from 'react';
import toast from "react-hot-toast";
import profilephoto from '../assets/images/no-dp-image-2.webp'




function Card({post, onlike}){
    const Data = useContext(userContext);
    const navigate=useNavigate();
    const [openMenu, setOpenMenu] = useState(false)

    const date = post.createdAt?.split("T")[0];
    const isLiked = post.likes?.some((id)=> id.toString()===Data.loguser?._id);

    const isowner = Data.loguser?._id === post.user?._id

    const Handledelete =async(postID)=>{
        try{
            const res = await axios.delete(`https://insta-clone-serverside.onrender.com/api/deletepost/${postID}`);
            toast.success(res.data.message);
            setOpenMenu(!openMenu);
            navigate('/profile')
            
        }
        catch(error){
            toast.error(error.response?.data?.message || "Something went wrong")
        }
    }
    return( 
        <div>
                   <div className='Card-page'>
                        <div key={post._id} className='one-part'>
                            <div className='just-flex'>
                                <Link to= {`/profile/${post.user._id}`} className="profile-link">
                                <div className='top-page'>
                                    <img src={post?.user?.profilepic || profilephoto} alt="profile" />
                                    <p><b>{post.user.username}</b></p>
                                </div>
                                </Link>
                                {isowner ? (
                                    <div className="menu">
                                        <button onClick={()=> setOpenMenu(!openMenu)} className='icon-btn'>
                                            <i className="fa-solid fa-ellipsis"></i>
                                        </button>
                                        {openMenu && (
                                            <div className='popup'>
                                                <button onClick={()=> Handledelete(post._id)}><i className="fa-solid fa-trash-can"></i> Delete</button>
                                                <Link to={`/create/${post._id}`}><button><i className="fa-regular fa-pen-to-square"></i> Edit</button></Link>
                                            </div>
                                        )}
                                    </div>
                                ):(<div></div>)}
                            </div>
                            <div className='post-image-page'>
                                <img src={post.image} alt="Post" />
                            </div>
                            <div>
                              <i className="fa-light fa-heart"></i>
                            </div>
                            <div className='icons'>
                                <div style={{display:"flex", alignItems:"center"}}>
                                    <i  className={isLiked ? "fa-solid fa-heart" : "fa-regular fa-heart"}
                                    style={{ color: isLiked ? "red" : "black", cursor: "pointer" }}
                                    onClick={() => onlike(post._id)}></i>

                                    <p style={{fontSize:"15px"}}>{post.likes.length}</p>
                                </div>
                                <i className="fa-regular fa-comment"></i>
                                <i className="fa-regular fa-paper-plane"></i>
                            </div>
                            <div className='caption-page'>
                                <p><b>{post.user.username}</b></p>
                                <p>{post.caption}</p>
                            </div>
                            <div>
                                <p style={{fontSize:"10px"}}>{date}</p>
                            </div>
                        </div>
                    </div>    
        </div>
    );
}

export default Card;