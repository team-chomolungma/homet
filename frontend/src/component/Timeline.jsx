import {Container, Stack, Typography} from '@mui/material';
import NavigationBar from './NavigationBar.jsx';
import UserIcon from './UserIcon.jsx'
import React, {useEffect, useState} from 'react';
import read from '../../public/icons/read.png'
import unread from '../../public/icons/unread.png'
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import Loading from './Loading.jsx';
import {format, isYesterday} from 'date-fns';
import {ja} from 'date-fns/locale';

export default function Timeline() {

    const navigate = useNavigate();

    const [res, setRes] = useState(false);

    //ダミー
    const [voiceList, setVoiceList] = useState(() => {
        const list = [
            {
                'id': 1,
                'displayname': 'うら',
                'sender_id': 1,
                'sent_at': '2025-06-03T11:14:00Z',
                'play_flag': false,
                'first_played_at': null
            },
            {
                'id': 27,
                'displayname': 'あっきー',
                'sender_id': 2,
                'sent_at': '2025-06-04T18:15:00Z',
                'play_flag': false,
                'first_played_at': null
            },
            {
                'id': 5,
                'displayname': 'うめちゃん',
                'sender_id': 5,
                'sent_at': '2025-06-05T13:33:00Z',
                'play_flag': false,
                'first_played_at': null
            },
            {
                'id': 13,
                'displayname': 'うら',
                'sender_id': 1,
                'sent_at': '2025-06-06T08:10:00Z',
                'play_flag': false,
                'first_played_at': null
            },
            {
                'id': 28,
                'displayname': 'なおんちゅ',
                'sender_id': 4,
                'sent_at': '2025-06-07T20:17:00Z',
                'play_flag': false,
                'first_played_at': null
            },
            {
                'id': 14,
                'displayname': 'もち',
                'sender_id': 2,
                'sent_at': '2025-06-08T16:24:00Z',
                'play_flag': false,
                'first_played_at': '2025-06-09T09:00:00Z'
            },
            {
                'id': 7,
                'displayname': 'うら',
                'sender_id': 1,
                'sent_at': '2025-06-09T08:48:00Z',
                'play_flag': true,
                'first_played_at': '2025-06-10T09:00:00Z'
            },
            {
                'id': 2,
                'displayname': 'もち',
                'sender_id': 2,
                'sent_at': '2025-06-10T09:01:00Z',
                'play_flag': true,
                'first_played_at': '2025-06-12T15:00:00Z'
            },
            {
                'id': 22,
                'displayname': 'なおんちゅ',
                'sender_id': 4,
                'sent_at': '2025-06-11T09:09:00Z',
                'play_flag': false,
                'first_played_at': '2025-06-11T18:00:00Z'
            },
            {
                'id': 8,
                'displayname': 'もち',
                'sender_id': 1,
                'sent_at': '2025-06-12T19:47:00Z',
                'play_flag': false,
                'first_played_at': null
            },
            {
                'id': 24,
                'displayname': 'きとーちゃん',
                'sender_id': 6,
                'sent_at': '2025-06-13T11:11:00Z',
                'play_flag': false,
                'first_played_at': null
            },
            {
                'id': 9,
                'displayname': 'あっきー',
                'sender_id': 3,
                'sent_at': '2025-06-14T07:50:00Z',
                'play_flag': true,
                'first_played_at': '2025-06-15T07:30:00Z'
            },
            {
                'id': 3,
                'displayname': 'あっきー',
                'sender_id': 3,
                'sent_at': '2025-06-15T17:42:00Z',
                'play_flag': false,
                'first_played_at': null
            },
            {
                'id': 19,
                'displayname': 'うら',
                'sender_id': 1,
                'sent_at': '2025-06-16T18:22:00Z',
                'play_flag': false,
                'first_played_at': '2025-06-17T20:00:00Z'
            },
            {
                'id': 29,
                'displayname': 'うめちゃん',
                'sender_id': 5,
                'sent_at': '2025-06-17T08:30:00Z',
                'play_flag': false,
                'first_played_at': '2025-06-17T09:00:00Z'
            },
            {
                'id': 15,
                'displayname': 'あっきー',
                'sender_id': 3,
                'sent_at': '2025-07-05T10:00:00Z',
                'play_flag': false,
                'first_played_at': null
            },
            {
                'id': 11,
                'displayname': 'うめちゃん',
                'sender_id': 5,
                'sent_at': '2025-07-05T21:12:00Z',
                'play_flag': true,
                'first_played_at': '2025-06-20T10:00:00Z'
            },
            {
                'id': 23,
                'displayname': 'うめちゃん',
                'sender_id': 5,
                'sent_at': '2025-07-07T15:00:00Z',
                'play_flag': false,
                'first_played_at': null
            },
            {
                'id': 4,
                'displayname': 'なおんちゅ',
                'sender_id': 4,
                'sent_at': '2025-07-06T10:25:00Z',
                'play_flag': true,
                'first_played_at': '2025-06-23T10:00:00Z'
            },
            {
                'id': 18,
                'displayname': 'きとーちゃん',
                'sender_id': 6,
                'sent_at': '2025-07-06T13:59:00Z',
                'play_flag': false,
                'first_played_at': null
            },
            {
                'id': 26,
                'displayname': 'もち',
                'sender_id': 2,
                'sent_at': '2025-06-25T14:00:00Z',
                'play_flag': false,
                'first_played_at': null
            },
            {
                'id': 16,
                'displayname': 'なおんちゅ',
                'sender_id': 4,
                'sent_at': '2025-06-27T14:45:00Z',
                'play_flag': false,
                'first_played_at': null
            },
            {
                'id': 6,
                'displayname': 'きとーちゃん',
                'sender_id': 6,
                'sent_at': '2025-06-30T15:12:00Z',
                'play_flag': false,
                'first_played_at': '2025-06-29T08:10:00Z'
            },
            {
                'id': 25,
                'displayname': 'うら',
                'sender_id': 1,
                'sent_at': '2025-06-30T23:00:00Z',
                'play_flag': false,
                'first_played_at': '2025-06-30T00:00:00Z'
            },
            {
                'id': 21,
                'displayname': 'あっきー',
                'sender_id': 3,
                'sent_at': '2025-06-30T22:41:00Z',
                'play_flag': false,
                'first_played_at': null
            },
            {
                'id': 12,
                'displayname': 'きとーちゃん',
                'sender_id': 6,
                'sent_at': '2025-07-02T20:14:00Z',
                'play_flag': true,
                'first_played_at': '2025-07-02T21:00:00Z'
            },
            {
                'id': 20,
                'displayname': 'もち',
                'sender_id': 2,
                'sent_at': '2025-07-03T06:18:00Z',
                'play_flag': false,
                'first_played_at': null
            },
            {
                'id': 30,
                'displayname': 'きとーちゃん',
                'sender_id': 6,
                'sent_at': '2025-07-04T10:10:00Z',
                'play_flag': false,
                'first_played_at': null
            }
        ]

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
        return groupList;
    });


    //const [voiceList, setVoiceList] = useState()
    //No11 [{id,sender_id,displayname,sent_at,first_played_at,play_flag}...]}
    // useEffect(() => {
    //     const fetchData = async () => {
    //         const response = await axios.get('/api/homet/voice-list');
    //         if (response.status === 200) {
    //             setVoiceList(response.result);
    //             setRes(true);
    //         }
    //     };
    //     fetchData();
    // }, []);


    //ダミー
    const getUrl = async (sender_id, voice_file_id, displayname) => {
        navigate('/voice-data', {state: {url: 'test_url', receiver_id: 6, voice_file_id: 6, displayname: 'もち'}})
    }

    // No12 idでurl取得
    // const getUrl = async (sender_id, voice_file_id, displayname) => {
    //     const response = await axios.get(`/api/homet/voice-data/${voice_file_id}`);
    //     if (response.status === 200) {
    //         navigate('/voice-data', {state: {url: response.url, sender_id:sender_id, voice_file_id:voice_file_id, displayname:displayname}})
    //     }
    // }

    // if (!res) return <Loading />;


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

