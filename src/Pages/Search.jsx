import { useEffect, useState } from 'react';
import './Search.css'
import axios from 'axios';
import load from '../assets/logo/tube-spinner.svg';
import { Link } from 'react-router-dom';
import profilephoto from '../assets/images/no-dp-image-2.webp';
import toast from "react-hot-toast";
function Search(){

    const [query, setQuery] = useState("");
    const [user, setUser] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        findUser();

    },[query]);

    const findUser = async()=>{
        try{
            if(query.trim()===""){
                setUser([]);
                return;
            }
            else{
                const res = await axios.get(`https://insta-clone-serverside.onrender.com/api/searchuser?username=${query}`);
                setUser(res.data.users);
                (res.data.users)
            }
        }
        catch(error){
            toast.error(error.response.data.message)
        }
        finally{
            setLoading(false);
        }
    }
    return(
        <div className="Search-page">
            <div>
                <h1>Search</h1>
            </div>
            <div className='input-container'>
                <input type="text" placeholder="Search" value={query} onChange={(e)=> setQuery(e.target.value)}/>
            </div>
            <div className='main-gap'>
                {user.map((get)=>(
                    <Link key={get._id} className='user-container' to={`/profile/${get._id}`}>
                        <div className='flex-page'>
                            <img src={get.profilepic || profilephoto} alt="" />
                            <div>
                                <p>{get.username}</p>
                                <p>{get.name}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}
export default Search;