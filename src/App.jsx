import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import Profile from './Pages/Profile';
import Suggestion from "./Components/Suggestion";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginUser from "./Context/LoginUser";
import Mainlayout from "./Layout/Mainlayout";
import Create from "./Pages/Create";
import Editprofile from "./Pages/Editprofile";
import Postcard from "./Components/Postcard";
import Search from "./Pages/Search";
import Explore from "./Pages/Explore";
function App() {
  
  return (
    <>
    <LoginUser>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route element={<Mainlayout/>}>
              <Route path="/home" element={<Home/>}/>
              <Route path="/profile" element={<Profile/>}/>
              <Route path="/profile/:id" element={<Profile/>}/>
              <Route path="/create" element={<Create/>}/>
              <Route path="/editprofile" element={<Editprofile/>}/>
              <Route path="/create/:id" element={<Create/>}/>
              <Route path="/post/:id" element={<Postcard/>}/>
              <Route path="/search" element={<Search/>}/>
              <Route path="/explore" element={<Explore/>}/>
            </Route>
        </Routes>
      </BrowserRouter>
    </LoginUser>  
    </>
  )
}

export default App
