import {Box, Container, Stack, Typography} from '@mui/material';
import NavigationBar from './NavigationBar.jsx';
import UserIcon from './UserIcon.jsx'
import React, {useEffect, useState} from 'react';
import read from '../../public/icons/read.png'
import unread from '../../public/icons/unread.png'
import addfriend from '../../public/icons/addfriend.png'
import {useNavigate} from 'react-router-dom';
import Loading from './Loading.jsx';
import {format, isYesterday} from 'date-fns';
import {ja} from 'date-fns/locale';
import axiosInstance from '../lib/axios.js';

export default function Timeline() {

    const navigate = useNavigate();

    const [res, setRes] = useState(false);

    const [voiceList, setVoiceList] = useState()
    const [friendList, setFriendList] = useState()

    //No11 [{id,sender_id,displayname,sent_at,first_played_at,play_flag}...]}
    //タイムライン用データ取得
    useEffect(() => {
        const fetchData = async () => {
            const response = await axiosInstance.get('/api/homet/voice-list');
            if (response.status === 200) {
                const list = response.data.result;

                const groupList = {};

                const today = format(new Date(), 'yyyy/MM/dd', {locale: ja});

                list.forEach((post) => {
                    const sentDate = format(new Date(post.sent_at), 'yyyy/MM/dd', {locale: ja});

                    let groupKey;
                    if (sentDate === today) {
                        groupKey = '今日';
                    } else if (isYesterday(sentDate)) {
                        groupKey = '昨日';
                    } else {
                        groupKey = sentDate
                    }

                    if (!groupList[groupKey]) {
                        groupList[groupKey] = [];
                    }
                    groupList[groupKey].push(post);
                });
                setVoiceList(groupList);
                setRes(true);
            }
        };
        fetchData();
    }, []);

    //No13 友達取得
    useEffect(() => {
        const fetchData = async () => {
            const response = await axiosInstance.get('/api/friend');
            if (response.status === 200) {
                const idArray = response.data.result.map(user => user.id)
                setFriendList(idArray)
            }
        }
        fetchData();
    }, []);


    // No12 idでurl取得
    const getUrl = async (sender_id, voice_file_id, displayname) => {
        const response = await axiosInstance.get(`/api/homet/voice-data/${voice_file_id}`);
        const frinedFlag = !friendList.includes(sender_id)
        if (response.status === 200) {
            navigate('/voice-data', {
                state: {
                    url: response.data.url,
                    sender_id: sender_id,
                    voice_file_id: voice_file_id,
                    displayname: displayname,
                    frinedFlag: frinedFlag,
                }
            })
        }
    }

    //No14　相互友達
    const mutualFriends = async (sender_id) => {
        try {
            const response = await axiosInstance.post('/api/friend', {
                id: sender_id
            });
            if (response.status === 201) alert('ともだちに追加できました！');
        } catch (error) {
            if (error.response.status === 409) console.log('すでに登録済み');
        }
    }

    if (!res) return <Loading/>;

    return (
        <>
            <Container sx={{
                width: 1,
                textAlign: 'center',
                marginTop: '10%',
                marginBottom: '5%'
            }}>
                <Typography sx={{
                    color: '#333333',
                    fontSize: {xs: 24, sm: 24, md: 26},
                    fontFamily: '"Rounded Mplus 1c"',
                }}
                >タイムライン</Typography>
            </Container>

            {(voiceList && friendList) && Object.entries(voiceList).sort(([aKey], [bKey]) => {
                // カスタム並び順を定義
                const order = ['今日', '昨日'];

                const aIndex = order.indexOf(aKey);
                const bIndex = order.indexOf(bKey);

                // 「今日」「昨日」は order 配列の順
                if (aIndex !== -1 && bIndex !== -1) {
                    return aIndex - bIndex;
                }
                // 「今日」や「昨日」どちらかが含まれていればそれを優先
                if (aIndex !== -1) return -1;
                if (bIndex !== -1) return 1;

                // それ以外は日付（文字列）を新しい順にソート
                return new Date(bKey) - new Date(aKey);
            }).map(([groupKey, posts]) => {
                return (
                    <React.Fragment key={groupKey}>
                        <Container sx={{width: '75vw'}}>
                            <Typography sx={{
                                marginBottom: '16px',
                                fontSize: {xs: 14, sm: 14, md: 14}
                            }}>{groupKey}</Typography>

                        </Container>

                        {
                            posts.map((data) => {

                                return (

                                    <Container key={data.id}
                                               sx={{
                                                   width: '75vw',
                                                   bgcolor: data.play_flag ? 'white' : '#AFADAD',
                                                   borderRadius: 5,
                                                   margin: '8px auto',
                                                   alignContent: 'center',
                                                   height: {xs: 80, sm: 80, md: 90}

                                               }}
                                               onClick={() => data.play_flag && getUrl(data.sender_id, data.id, data.displayname)}>

                                        <Stack
                                            justifyContent="space-between"
                                            direction="row"
                                            spacing={3}
                                        >

                                            <UserIcon displayname={data.displayname}/>
                                            {!friendList.includes(data.sender_id) &&
                                                <Box style={{width: 44, height: 45, alignContent: 'center'}}>
                                                    <img
                                                        onClick={() => mutualFriends(data.sender_id)}
                                                        src={addfriend}
                                                        alt="addfriend"
                                                        style={{width: 35, height: 24}}
                                                    />
                                                </Box>
                                            }

                                            {data.first_played_at ? (
                                                <img
                                                    src={read}
                                                    alt="read"
                                                />
                                            ) : (
                                                <img
                                                    src={unread}
                                                    alt="unread"
                                                />
                                            )}

                                        </Stack>

                                    </Container>
                                )

                            })

                        }
                    </React.Fragment>
                )

            })}


            {/*NavigationBarとの要素被り防止*/}
            <Box sx={{height: {xs: 65, sm: 80, md: 90}}}/>
            <NavigationBar/>
        </>
    )

}

