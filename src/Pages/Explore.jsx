import { useEffect, useState } from 'react';
import './Explore.css';
import axios from 'axios';
import loading from '../assets/logo/tube-spinner.svg';
import { Link } from 'react-router-dom';
import toast from "react-hot-toast";

function Explore(){
    const [posts, setPost] = useState([]);
    const [load, setLoad] = useState(true);

    useEffect(()=>{
        getALLpost();
    },[]);

    const getALLpost=async()=>{
        try{
            const res = await axios.get('https://insta-clone-serverside.onrender.com/api/getallpost');
            setPost(res.data.allPost);
            setLoad(false);
        }
        catch(error){
            toast.error(error.response.data.message);
        }
    }

    if(load){
        return(
            <div className='loading'>
                <img src={loading} alt="loading..." />
            </div>
        )
    }
    return(
        <div className='explore-page'>
            {posts.map((post)=>{
                return(
                    <div key={post._id}>
                        <Link to={`/post/${post._id}`}><img src={post.image} alt="" /></Link>
                    </div>
                )
            })}
        </div>
    );
}
export default Explore;