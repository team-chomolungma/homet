import {Box, Container, Stack, Typography} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import React, {useEffect, useState} from 'react';
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import axios from 'axios';
import UserIcon from '../UserIcon.jsx';
import NavigationBar from '../NavigationBar.jsx';

export default function Friendlist() {
    const navigate = useNavigate();

    const [res, setRes] = useState(false);

    //ダミー
    const [friendList, setFriendList] = useState([
        {'id': 1, 'displayname': 'うら'},
        {'id': 2, 'displayname': 'もち'},
        {'id': 3, 'displayname': 'あっきー'},
        {'id': 4, 'displayname': 'なおんちゅ'},
        {'id': 5, 'displayname': 'うめちゃん'},
        {'id': 6, 'displayname': 'きとーちゃん'},
    ])


    // const [friendList, setFriendList] = useState()
    // No13 {result: [{id,displayname}...]}
    // useEffect(() => {
    //     const fetchData = async () => {
    //         const response = await axios.get('/api/friend');
    //         if (response.status === 200) {
    //             setFriendList(response.result);
    //             setRes(true);
    //         }
    //     };
    //     fetchData();
    // }, []);

    // if (!res) return <Loading />;

    return (
        <>
            <Container>
                <Stack
                    alignItems="center"
                    justifyContent={'space-between'}
                    direction="row"
                    spacing={1}
                    sx={{margin: 2}}
                >
                    <Typography sx={{fontSize: 24, color: '#333333'}}>ともだちリスト</Typography>
                    <GroupAddOutlinedIcon sx={{color: '#333333'}} onClick={() => navigate('/addfriend')}/>
                </Stack>

                {friendList && (friendList.map((data) => {
                        return (
                            <Box key={data.id} onClick={() => navigate('/voice', {
                                state: {
                                    displayname: data.displayname,
                                    receiver_id: data.id
                                }
                            })}>
                                <UserIcon displayname={data.displayname}/>
                            </Box>
                        )
                    })
                )}
            </Container>
            <NavigationBar/>
        </>
    )

}