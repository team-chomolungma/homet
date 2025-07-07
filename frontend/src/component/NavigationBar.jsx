import {BottomNavigation, BottomNavigationAction} from '@mui/material';
import homeIcon from '../../public/icons/home.png';
import pawsIcon from '../../public/icons/paws.png';
import friendIcon from '../../public/icons/friend.png';
import {useNavigate} from 'react-router-dom';

export default function NavigationBar() {
    const navigate = useNavigate();

    return (
        <BottomNavigation
            sx={{bgcolor: '#F5E6D3', height: 81, position: 'fixed', bottom: 0, width: 1}}
        >
            <BottomNavigationAction label="home" icon={<img
                src={homeIcon}
                alt="home icon"
                style={{width: 60, height: 43}}
                onClick={() => navigate('/home')}
            />}/>
            <BottomNavigationAction label="timeline" icon={<img
                src={pawsIcon}
                alt="paws icon"
                style={{width: 60, height: 43}}
                onClick={() => navigate('/timeline')}
            />}/>
            <BottomNavigationAction label="friend" icon={<img
                src={friendIcon}
                alt="friend icon"
                style={{width: 60, height: 43}}
                onClick={() => navigate('/friendlist')}
            />}/>
        </BottomNavigation>
    );
}