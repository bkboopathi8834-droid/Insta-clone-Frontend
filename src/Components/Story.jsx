import './Story.css';
import { useEffect, useState } from "react";
import { useContext } from "react";
import { userContext } from "../Context/LoginUser";
import axios from "axios";
import profilephoto from '../assets/images/no-dp-image-2.webp'
import toast from "react-hot-toast";
function Story(){
    const {loguser} = useContext(userContext);
    const [image, setImage] = useState(null);
    const [open, setOpen] = useState(false);
    const [stories, setStories] = useState([]);
    const [selected , setSelected] = useState(null);
    const [mystory, setMystory]=useState([]);

    useEffect(()=>{
        getstory();
    },[]);

    const getstory = async()=>{
        const token = localStorage.getItem("token");
        try{
            const get = await axios.get('https://insta-clone-serverside.onrender.com/api/getstory',{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            });

            const real =  get.data.getstory.filter((item)=>{
                return item.user?._id !== loguser?._id
            });

            const Owner = get.data.getstory.filter((item)=>{
                return item.user?._id === loguser?._id
            });
            setStories(real);
            setMystory(Owner || null);
        }
        catch(error){
            toast.error(error.response?.data?.message || "Something went wrong")
        }
    }

    const addstory=async()=>{
        setOpen(false);
        const token = localStorage.getItem("token");
        const formData = new FormData();

        formData.append('image',image);

        try{

            if(!image){
                alert("Please select an image!");
                return;
            }
            const res = await axios.post("https://insta-clone-serverside.onrender.com/api/story",formData,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            });
            toast.success('Story Added!');
            setImage(null);
            setOpen(false)
            getstory();
        }
        catch(error){
            toast.error(error.response?.data?.message || "Something went wrong!")
        }
    }

    const sendstory=async(item)=>{
        setSelected(item)
    }
    return(
        <div className='story-container'>
            <div className="my-profile">
                {mystory.length>0 ? (
                    <div>
                        {mystory.map((item)=>{
                            return(
                                <div key={item._id} className='story-cent'>
                                    <button onClick={()=> sendstory(item)}><img src={loguser?.profilepic || profilephoto} alt="story" /></button>
                                    <p>your story</p>
                                </div>
                                )
                        })}  
                    </div>
                ):(
                    <div>
                        <button onClick={()=> setOpen(!open)}><img src={loguser?.profilepic || profilephoto} alt="story" /></button>
                        <p>your story</p>
                    </div>
                )}
            </div>
            <div className='my-profile-one'>
                {stories.map((GetStory)=>{
                return(
                    <div key={GetStory.user?._id} className='get-part' onClick={()=> sendstory(GetStory)}>
                        <button><img src={GetStory.user?.profilepic} alt="" /></button>
                        <p>{GetStory.user.username}</p>
                    </div>
                )
            })}
            </div>
            <div>
                {open && (
                    <div className='story-popup'>
                        <div className='popup-box'>
                            <h5>Add Story</h5>
                        </div>
                        <input type="file" accept='image/*' onChange={(e)=>setImage(e.target.files[0])} />
                        <button onClick={()=>addstory()}>Share</button>
                        <button onClick={()=>setOpen(false)}>Cancel</button>
                    </div>
                )}
            </div>

            <div>
                {selected && (
                    <div className='viewthe'>
                        <img src={selected.stories[0].image} alt="" />
                        <button onClick={()=>setSelected(null)}>close</button>
                    </div>
                )}
            </div>


            
        </div>
    );
};
export default Story;