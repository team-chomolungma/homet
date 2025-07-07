import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import axiosInstance from '../lib/axios.js';
import {useNavigate} from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import {useAuth} from './safety/AuthContext.jsx';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FingerprintIcon from '@mui/icons-material/Fingerprint';

export default function AnchorTemporaryDrawer() {
    const {user} = useAuth();
    const navigate = useNavigate();
    const handleNavigate = (path) => {
        if (path === 'ログアウト') {
            const processingLogout = async () => {
                try {
                    await axiosInstance.get('/api/auth/logout');

                    alert('ログアウトしました。');
                    navigate('/'); //ログアウト後/に遷移
                } catch (err) {
                    alert('ログアウト失敗');
                    console.error(err);
                }
            };
            processingLogout();
        }

    };
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setState({...state, [anchor]: open});
    };

    const list = (anchor) => (
        <Box
            sx={{width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250}}
            role="presentation"
        >
            <List>
                {[
                    {text: `ユーザーID:\n${user?.myUserID}`, icon: <FingerprintIcon/>},
                    {text: `ユーザーネーム:\n${user?.myDisplayname}`, icon: <AccountCircleIcon/>},
                    {
                        text: 'ログアウト',
                        path: 'ログアウト',
                        icon: <LogoutIcon/>,
                    },
                ].map((obj, index) => (
                    <ListItem key={obj.text} disablePadding>
                        <ListItemButton onClick={() => handleNavigate(obj.path)}>
                            {obj.icon && <ListItemIcon>{obj.icon}</ListItemIcon>}
                            <ListItemText
                                primary={
                                    <Box sx={{whiteSpace: 'pre-line'}}>
                                        {obj.text}
                                    </Box>
                                }
                            />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <div>
            {['right'].map((anchor) => (
                <React.Fragment key={anchor}>
                    {!state[anchor] && (
                        <Button
                            variant="text"
                            sx={{
                                backgroundColor: 'transparent',
                                borderRadius: '24px',
                                px: 2,
                                py: 2,
                                minWidth: '80px',
                                height: '40px',
                                '&:hover': {
                                    backgroundColor: 'transparent',
                                },
                            }}
                            onClick={toggleDrawer(anchor, true)}
                        >
                            <MenuIcon sx={{color: 'gray'}}/>
                        </Button>
                    )}
                    <Drawer
                        anchor={anchor}
                        open={state[anchor]}
                        onClose={toggleDrawer(anchor, false)}
                    >
                        {list(anchor)}
                    </Drawer>
                </React.Fragment>
            ))}
        </div>
    );
}
