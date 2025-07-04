import {Container, Stack, Typography} from '@mui/material';
import NavigationBar from './NavigationBar.jsx';
import UserIcon from './UserIcon.jsx'
import React, {useState} from 'react';
import read from '../../public/icons/read.png'
import unread from '../../public/icons/unread.png'


export default function Timeline() {


    const [voiceList, setVoiceList] = useState(() => {
        const list = [
            {
                'id': 1,
                'displayname': 'うら',
                'sender_id': 1,
                'sent_at': '2025-06-03T11:14:00',
                'play_flag': false,
                'first_played_at': null
            },
            {
                'id': 27,
                'displayname': 'あっきー',
                'sender_id': 2,
                'sent_at': '2025-06-04T18:15:00',
                'play_flag': false,
                'first_played_at': null
            },
            {
                'id': 5,
                'displayname': 'うめちゃん',
                'sender_id': 5,
                'sent_at': '2025-06-05T13:33:00',
                'play_flag': false,
                'first_played_at': null
            },
            {
                'id': 13,
                'displayname': 'うら',
                'sender_id': 1,
                'sent_at': '2025-06-06T08:10:00',
                'play_flag': false,
                'first_played_at': null
            },
            {
                'id': 28,
                'displayname': 'なおんちゅ',
                'sender_id': 4,
                'sent_at': '2025-06-07T20:17:00',
                'play_flag': false,
                'first_played_at': null
            },
            {
                'id': 14,
                'displayname': 'もち',
                'sender_id': 2,
                'sent_at': '2025-06-08T16:24:00',
                'play_flag': false,
                'first_played_at': '2025-06-09T09:00:00'
            },
            {
                'id': 7,
                'displayname': 'うら',
                'sender_id': 1,
                'sent_at': '2025-06-09T08:48:00',
                'play_flag': true,
                'first_played_at': '2025-06-10T09:00:00'
            },
            {
                'id': 2,
                'displayname': 'もち',
                'sender_id': 2,
                'sent_at': '2025-06-10T09:01:00',
                'play_flag': true,
                'first_played_at': '2025-06-12T15:00:00'
            },
            {
                'id': 22,
                'displayname': 'なおんちゅ',
                'sender_id': 4,
                'sent_at': '2025-06-11T09:09:00',
                'play_flag': false,
                'first_played_at': '2025-06-11T18:00:00'
            },
            {
                'id': 8,
                'displayname': 'もち',
                'sender_id': 1,
                'sent_at': '2025-06-12T19:47:00',
                'play_flag': false,
                'first_played_at': null
            },
            {
                'id': 24,
                'displayname': 'きとーちゃん',
                'sender_id': 6,
                'sent_at': '2025-06-13T11:11:00',
                'play_flag': false,
                'first_played_at': null
            },
            {
                'id': 9,
                'displayname': 'あっきー',
                'sender_id': 3,
                'sent_at': '2025-06-14T07:50:00',
                'play_flag': true,
                'first_played_at': '2025-06-15T07:30:00'
            },
            {
                'id': 3,
                'displayname': 'あっきー',
                'sender_id': 3,
                'sent_at': '2025-06-15T17:42:00',
                'play_flag': false,
                'first_played_at': null
            },
            {
                'id': 19,
                'displayname': 'うら',
                'sender_id': 1,
                'sent_at': '2025-06-16T18:22:00',
                'play_flag': false,
                'first_played_at': '2025-06-17T20:00:00'
            },
            {
                'id': 29,
                'displayname': 'うめちゃん',
                'sender_id': 5,
                'sent_at': '2025-06-17T08:30:00',
                'play_flag': false,
                'first_played_at': '2025-06-17T09:00:00'
            },
            {
                'id': 15,
                'displayname': 'あっきー',
                'sender_id': 3,
                'sent_at': '2025-06-18T10:00:00',
                'play_flag': false,
                'first_played_at': null
            },
            {
                'id': 11,
                'displayname': 'うめちゃん',
                'sender_id': 5,
                'sent_at': '2025-06-19T21:12:00',
                'play_flag': true,
                'first_played_at': '2025-06-20T10:00:00'
            },
            {
                'id': 23,
                'displayname': 'うめちゃん',
                'sender_id': 5,
                'sent_at': '2025-06-20T15:00:00',
                'play_flag': false,
                'first_played_at': null
            },
            {
                'id': 4,
                'displayname': 'なおんちゅ',
                'sender_id': 4,
                'sent_at': '2025-06-21T10:25:00',
                'play_flag': true,
                'first_played_at': '2025-06-23T10:00:00'
            },
            {
                'id': 18,
                'displayname': 'きとーちゃん',
                'sender_id': 6,
                'sent_at': '2025-06-24T13:59:00',
                'play_flag': false,
                'first_played_at': null
            },
            {
                'id': 26,
                'displayname': 'もち',
                'sender_id': 2,
                'sent_at': '2025-06-25T14:00:00',
                'play_flag': false,
                'first_played_at': null
            },
            {
                'id': 16,
                'displayname': 'なおんちゅ',
                'sender_id': 4,
                'sent_at': '2025-06-27T14:45:00',
                'play_flag': false,
                'first_played_at': null
            },
            {
                'id': 6,
                'displayname': 'きとーちゃん',
                'sender_id': 6,
                'sent_at': '2025-06-30T15:12:00',
                'play_flag': false,
                'first_played_at': '2025-06-29T08:10:00'
            },
            {
                'id': 25,
                'displayname': 'うら',
                'sender_id': 1,
                'sent_at': '2025-06-30T23:00:00',
                'play_flag': false,
                'first_played_at': '2025-06-30T00:00:00'
            },
            {
                'id': 21,
                'displayname': 'あっきー',
                'sender_id': 3,
                'sent_at': '2025-06-30T22:41:00',
                'play_flag': false,
                'first_played_at': null
            },
            {
                'id': 12,
                'displayname': 'きとーちゃん',
                'sender_id': 6,
                'sent_at': '2025-07-02T20:14:00',
                'play_flag': true,
                'first_played_at': '2025-07-02T21:00:00'
            },
            {
                'id': 20,
                'displayname': 'もち',
                'sender_id': 2,
                'sent_at': '2025-07-03T06:18:00',
                'play_flag': false,
                'first_played_at': null
            },
            {
                'id': 30,
                'displayname': 'きとーちゃん',
                'sender_id': 6,
                'sent_at': '2025-07-04T10:10:00',
                'play_flag': false,
                'first_played_at': null
            }
        ]

        const groupList = {};

        const today = new Date();
        const yesterday = new Date(today.getTime() - 86400000); // 1日前

        list.forEach((post) => {
            const sentDate = new Date(post.sent_at);

            let groupKey;
            if (sentDate.toDateString() === today.toDateString()) {
                groupKey = '今日';
            } else if (sentDate.toDateString() === yesterday.toDateString()) {
                groupKey = '昨日';
            } else {
                groupKey = sentDate.toLocaleDateString('ja-JP', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                }); //YYYY/MM/DDの形式
            }

            if (!groupList[groupKey]) {
                groupList[groupKey] = [];
            }
            groupList[groupKey].push(post);
        });
        console.log(groupList)
        return groupList;
    });


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
                    <>
                        <Container sx={{width: 250,}} key={groupKey}>
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
                                               }}>

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
                    </>
                )

            })}


            <NavigationBar/>
        </>
    )

}

