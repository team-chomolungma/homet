import {Container, Stack, Typography} from '@mui/material';
import NavigationBar from './NavigationBar.jsx';
import UserIcon from './UserIcon.jsx'
import React, {useEffect, useState} from 'react';
import read from '../../public/icons/read.png'
import unread from '../../public/icons/unread.png'
import {useNavigate} from 'react-router-dom';
import Loading from './Loading.jsx';
import {format, isYesterday} from 'date-fns';
import {ja} from 'date-fns/locale';
import axiosInstance from '../lib/axios.js';

export default function Timeline() {

    const navigate = useNavigate();

    const [res, setRes] = useState(false);


    const [voiceList, setVoiceList] = useState()
    //No11 [{id,sender_id,displayname,sent_at,first_played_at,play_flag}...]}
    useEffect(() => {
        const fetchData = async () => {
            const response = await axiosInstance.get('/api/homet/voice-list');
            if (response.status === 200) {
                const list = response.result || [];

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


    // No12 idでurl取得
    const getUrl = async (sender_id, voice_file_id, displayname) => {
        const response = await axiosInstance.get(`/api/homet/voice-data/${voice_file_id}`);
        if (response.status === 200) {
            navigate('/voice-data', {
                state: {
                    url: response.url,
                    sender_id: sender_id,
                    voice_file_id: voice_file_id,
                    displayname: displayname
                }
            })
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
                <Typography sx={{fontSize: 24, color: '#333333'}}>タイムライン</Typography>
            </Container>

            {voiceList && Object.entries(voiceList).sort(([aKey], [bKey]) => {
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
                        <Container sx={{width: 250,}}>
                            <Typography sx={{marginBottom: '16px'}}>{groupKey}</Typography>
                        </Container>

                        {
                            posts.map((data) => {
                                return (
                                    <Container key={data.id}
                                               sx={{
                                                   width: 250,
                                                   height: 80,
                                                   bgcolor: data.play_flag ? '#AFADAD' : 'white',
                                                   borderRadius: 5,
                                                   margin: '8px auto',
                                                   alignContent: 'center'
                                               }} onClick={() => getUrl(data.sender_id, data.id, data.displayname)}>

                                        <Stack
                                            justifyContent="space-between"
                                            direction="row"
                                            spacing={3}
                                        >
                                            <UserIcon displayname={data.displayname}/>
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


            <NavigationBar/>
        </>
    )

}

