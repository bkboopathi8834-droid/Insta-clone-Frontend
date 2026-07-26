import './Sidebar.css'
import instalogo from '../assets/logo/ftygttvtghv.png';
import { Link } from 'react-router-dom';
function Sidebar(){

    return(
        <>
            <div className='sidebar-page'>
                <img src={instalogo} alt="logo" className='Insta-logo'/>
                <div className='sidebar-icon'>
                    <div> <Link to="/home" className='create-link'><i className="fa-regular fa-house"></i> Home </Link></div>
                    <div><i className="fa-regular fa-circle-play"></i> Reels</div>
                    <div><i className="fa-regular fa-paper-plane"></i> Messages</div>
                    <div> <Link to="/search" className='create-link'><i className="fa-solid fa-magnifying-glass"></i> Search</Link> </div>
                    <div> <Link to="/explore" className='create-link'><i className="fa-regular fa-compass"></i> Explore</Link> </div>
                    <div><i className="fa-regular fa-heart"></i> Notifications</div>
                    <div> <Link to="/create" className='create-link'> <i className="fa-regular fa-square-plus"></i> Create</Link></div>
                    <div><i className="fa-solid fa-table-columns"></i> Dashboard</div>
                    <div > <Link to="/profile" className='create-link'> <i className="fa-regular fa-user"></i> Profile </Link></div>
                </div>

                    <div><i className="fa-solid fa-bars"></i>More</div>
                    <div><i className="fa-solid fa-boxes-stacked"></i>Also from meta</div>
            </div>

            <div className='bottom-bar'>
                <div> <Link to='/home'> <i className="fa-regular fa-house"></i></Link> </div>
                <div> <Link to='/search'> <i className="fa-solid fa-magnifying-glass"></i></Link> </div>
                <div> <Link to='/create'> <i className="fa-regular fa-square-plus"></i></Link> </div>
                <div> <Link to='/explore'> <i className="fa-regular fa-compass"></i> </Link> </div>
                <div> <Link to='/profile'> <i className="fa-regular fa-user"></i></Link> </div>

            </div>
        </>    
    );
}
export default Sidebar;