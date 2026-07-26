import axios from "axios";
import { useContext, useState } from "react";
import {Link , useNavigate} from 'react-router-dom';
import { userContext } from "../Context/LoginUser";
import toast from "react-hot-toast";
function Login(){
const {getuser} = useContext(userContext)

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const Handlesubmit= async(e)=>{
        e.preventDefault();
        try{
            if(username === ""){
                toast.error("username is required");
                return;
            }
            if(password === ""){
                toast.error("password is required");
                return;
            }
            else if(password.length <= 10){
                toast.error("password should contain atleast 10 characters");
                return;
            }
            const res = await axios.post('https://insta-clone-serverside.onrender.com/api/login',{
                username,
                password
            });
            toast.success(res.data.message);
            const token = res.data.token;
            localStorage.setItem("token",token);
            setUsername("");
            setPassword("");
            await getuser();
            navigate('/home');
        }
        catch(error){
            toast.error(error.response.data.message);
            setUsername("");
            setPassword("");
        }
    }
    return(
        <form className="login-page" onSubmit={Handlesubmit}>
            <h1>Instagram</h1>
            <div className="login-value">
                <input type="text" placeholder="Enter Username" value={username} onChange={(e)=>setUsername(e.target.value)}/>
                <input type="password" placeholder="Enter Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
            </div>
            <button type="submit">Login</button>
            <h4>Don't Have an Account? <Link to="/register">Sign up</Link> </h4>
        </form>
    );
}
export default Login;