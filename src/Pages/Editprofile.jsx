import './Editprofile.css';
import { useState,useContext, useEffect } from 'react';
import { userContext } from '../Context/LoginUser';
import profilephoto from '../assets/images/no-dp-image-2.webp'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import toast from "react-hot-toast";

function Editprofile(){

    const navigate = useNavigate();

    const {loguser, setLoguser} = useContext(userContext);

    const [profilepic, setProfilepic] = useState(null);
    const [username , setUsername] = useState("");
    const [name, setName] = useState("");
    const [bio , setBio] = useState("");


    useEffect(()=>{

        if(loguser){
            setProfilepic(loguser.profilepic || profilephoto);
            setUsername(loguser.username || "");
            setName(loguser.name || "");
            setBio(loguser.bio || "")
        }
    },[loguser]);

    const Handlesubmit = async(e)=>{
        e.preventDefault();
        const token = localStorage.getItem("token");
        const formData = new FormData();

        formData.append("profilepic",profilepic);
        formData.append("username", username);
        formData.append("name", name);
        formData.append("bio",bio);

        try{
            if(username===""){
                toast.error("Username is required!");
                return;
            }
            const res = await axios.put(`https://insta-clone-serverside.onrender.com/api/edituser`,formData,
            {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            }
        );
            toast.success(res.data.message || "Updated!");
            (res.data.update)
            setLoguser(res.data.update)
            navigate('/profile')
            
        }
        catch(error){
            toast.error(error.response?.data?.message || "Something went wrong!");
        }
    }


    const logout = ()=>{
        localStorage.removeItem("token");
        setLoguser(null);
        navigate('/')
    }
    const handleback=()=>{
        navigate('/profile')
    }

    if(!loguser){
        return <h2 style={{display:"flex", alignItems:"center", justifyContent:"center"}}>Loading...</h2>
    }
    return(
        <div className='btn-for'>
            <h2 className='back-btn' onClick={handleback}><i className="fa-regular fa-circle-left"></i></h2>
            <form className='editprofile-page' onSubmit={Handlesubmit}>
                <h1>Edit Profile</h1>
                <div className='photo-div'>
                    <img src={profilepic? profilepic instanceof File? URL.createObjectURL(profilepic) : profilepic: null} alt="Pic" />
                    <input type="file" placeholder='Enter image url' accept='image/*' onChange={(e)=>setProfilepic(e.target.files[0])}/>
                </div>
                <div className='name-div'>
                    <div>
                        <label htmlFor="">Username : </label>
                        <input type="text" value={username || ""} placeholder='Enter new username' onChange={(e)=>setUsername(e.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor="">Name : </label>
                        <input type="text" value={name || ""} placeholder='Enter new name' onChange={(e)=>setName(e.target.value)}/>
                    </div>
                </div>
                <div className='bio-div'>
                    <label htmlFor="">Bio :</label>
                    <input type="text" value={bio || ""} placeholder='Edit Your Bio' onChange={(e)=>setBio(e.target.value)}/>
                </div>
                <button type='submit'>Submit</button>
            </form>
            <button onClick={logout} className='logout'>Logout</button>
       </div> 
        
    )
}


export default Editprofile;