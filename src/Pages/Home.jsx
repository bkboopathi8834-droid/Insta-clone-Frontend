import './Home.css';
import Postcard from '../Components/Postcard';
import Suggestion from '../Components/Suggestion';
function Home(){
    
    return(
        <div className='home-page'>
            <Postcard/>
            <Suggestion/>
        </div>
    );
}
export default Home;