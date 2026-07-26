import Sidebar from "../Components/Sidebar";
import { Outlet } from "react-router-dom";
import './Mainlayout.css'
function Mainlayout(){
    return(
        <div className="main-page">
            <Sidebar/>
            <div className="outlet-page">
                <Outlet/>
            </div>
        </div>
    );
}
export default Mainlayout;