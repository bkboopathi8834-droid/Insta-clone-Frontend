import  axios  from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";
function Register(){

    const [username,setUsername] = useState('');
    const [name, setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    const navigate = useNavigate();
    
    const HandleSubmit = async(e)=>{
        e.preventDefault();
        const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        try{
            if(username === ""){
                toast.error("username is required");
                return;
            }
            if(email === ""){
                toast.error("email address is required");
                return;
            }
            else if(!pattern.test(email)){
                    toast.error("Please enter valid email");
                    return;
            }
            if(password === ""){
                toast.error("Password is required")
                return;
            }
            else if(password.length <= 10){
                toast.error("Password should contain at least 10 characters")
                return;
            }
            const res = await axios.post('https://insta-clone-serverside.onrender.com/api/register',{
            username,
            name,
            email,
            password
        });
        toast.success(res.data.message);
        (res.data.createUser);
        setUsername('');
        setName('')
        setEmail('');
        setPassword('');
        navigate("/")
        }
        catch(error){
            toast.error(error.response.data.message || "Something went wrong!");
            setUsername('');
            setEmail('');
            setPassword('');
        }

    }
    return(
        <>
            <form className="register-page" onSubmit={HandleSubmit}>
                <h1>Instagram</h1>
                <div className="register-value">
                    <input type="text" placeholder='Enter Name' value={name} onChange={(e)=>setName(e.target.value)}/>
                    <input type="text" placeholder="Enter Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                    <input type="text" placeholder="Enter Username" value={username} onChange={(e)=>setUsername(e.target.value)}/>
                    <input type="password" placeholder="Enter Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                </div>
                <button type="submit">Submit</button>
                <h4>Have an Account? <Link to="/">Login</Link></h4>
            </form>
        </>
    )
}
export default Register;