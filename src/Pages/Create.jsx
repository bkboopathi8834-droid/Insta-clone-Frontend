import './Create.css'
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

function Create(){
    const navigate = useNavigate();

    const {id} = useParams();
    
    const [image, setImage] = useState(null);
    const [caption, setCaption] = useState('');


   
    useEffect(()=>{
        if(id){
            getidpost();
        }
    },[id])


    const getidpost=async()=>{
        try{
            const get =await axios.get(`http://localhost:5000/api/getSinglepost/${id}`);
            setImage(get.data.singlepost.image);
            setCaption(get.data.singlepost.caption);
        }
        catch(error){
            toast.error(error.response?.data?.message || "Something went wrong!")
        }
    }

    const Handlepost = async(e)=>{

        e.preventDefault();

        const formData = new FormData();

        formData.append("caption", caption);
        formData.append("image", image);

        const token = localStorage.getItem("token");
        try{
            if(id){
                if(!image){
                    alert("Please enter an image URL!");
                    return;
                }
                const res = await axios.put(`https://insta-clone-serverside.onrender.com/api/updatepost/${id}`,formData);
                toast.success("post updated!");
                navigate('/profile')
                return;
            }
            else{
                if(!image){
                toast.error("Please select an image");
                return;
            }
            const res = await axios.post('https://insta-clone-serverside.onrender.com/api/createpost',formData,
                {
                    headers:{
                    Authorization:`Bearer ${token}`
                }
                }
            )
            toast.success(res.data.message);
            setImage(null);
            setCaption('');
            navigate('/profile')
            }
            
        }
        catch(error){
            toast.error(error.response?.data?.message || "Something went wrong");
        }
    }
    return(
        <div className="create-part">
            {id? (<h1>Edit Post</h1>):(<h1>Create Post</h1>)}
            <form onSubmit={Handlepost} className='post-page'>
                <img src={image? image instanceof File? URL.createObjectURL(image):image : null} alt="Post Image" />
                <div className='image'>
                    <input type="file" placeholder="Enter post URL" accept='image/*' onChange={(e)=>setImage(e.target.files[0])}/>
                </div>
                <div className='cap'>
                    <input type="text" name="" id="" placeholder="Enter Caption" value={caption} onChange={(e)=>setCaption(e.target.value)}/>
                </div>
                {id? (<button type="submit">Update</button>):(<button type="submit">Post</button>)}
            </form>
        </div>
    );
}
export default Create;