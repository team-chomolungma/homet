import {Box, Button, Stack, Typography} from '@mui/material';
import NavigationBar from '../NavigationBar.jsx';
import hohoemian from '../../../public/homeranian/hohoemian.png'
import giraranian from '../../../public/homeranian/giraranian.png'
import whiteCircle from '../../../public/whiteCircle.png'
import playIcon from '../../../public/icons/play.png'
import playAfterIcon from '../../../public/icons/playafter.png'
import playingIcon from '../../../public/icons/playing.png'
import speechBubbleBefore from '../../../public/speechBubble/before.png';
import speechBubblePlaying from '../../../public/speechBubble/playing.png';
import speechBubbleAfter from '../../../public/speechBubble/after.png';
import speechBubbleSendback from '../../../public/speechBubble/sendback.png';
import React, {useState, useRef, useEffect} from 'react';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import {useNavigate, useLocation} from 'react-router-dom';
import axiosInstance from '../../lib/axios.js';
import UserIcon from '../UserIcon.jsx';
import CustomButton from '../CustomButton.jsx';


export default function AudioListen() {

    const navigate = useNavigate();
    const location = useLocation();

    const audioRef = useRef(null);

    //'before' | 'playing' | 'after'| 'sendback'
    const [playing, setPlaying] = useState('before');

    //署名付きURL
    const [s3Url, sets3Url] = useState(null)

    const [currentTime, setCurrentTime] = useState(0);

    const [duration, setDuration] = useState(0);

    useEffect(() => {
        sets3Url(location.state.url);
    }, []);

    useEffect(() => {

        if (!s3Url || !audioRef.current) return;

        const audio = audioRef.current;

        const onLoadedMetadata = () => {
            const d = Math.floor(audio.duration);

            // durationが0またはNaNならfallback
            if (d === 0 || isNaN(d)) {
                setDuration(1);
                setPlaying('playing');

                // 1秒後に 'after' に遷移（手動）
                setTimeout(() => {
                    setPlaying('after');
                    firstPlay();
                }, 1000);
            } else {
                setDuration(d);
            }
        };

        const onEnded = () => {
            setPlaying('after');
            firstPlay();
        };

        const onTimeUpdate = () => {
            const current = Math.floor(audio.currentTime);
            setCurrentTime(current);
        };

        const firstPlay = async () => {
            try {
                const response = await axiosInstance.post('/api/homet/play-history', {
                    voice_file_id: location.state.voice_file_id,
                });
                if (response.status === 201) console.log('初回再生');
            } catch (error) {
                if (error.response.status === 409) {
                    console.log('2回目以降');
                } else if (error.response.status === 404) {
                    console.log('存在しないId');
                }
            }

        };

        audio.addEventListener('loadedmetadata', onLoadedMetadata);
        audio.addEventListener('timeupdate', onTimeUpdate);
        audio.addEventListener('ended', onEnded);

        return () => {
            audio.removeEventListener('loadedmetadata', onLoadedMetadata);
            audio.removeEventListener('timeupdate', onTimeUpdate);
            audio.removeEventListener('ended', onEnded);
        };
    }, [s3Url]);


    const handlePlay = () => {
        if (audioRef.current) {
            audioRef.current.currentTime = 0;
            setCurrentTime(0);
            audioRef.current.play();
            setPlaying('playing');
        }
    };

    useEffect(() => {
        if (playing === 'after') {
            const timeoutId = setTimeout(() => {
                setPlaying('sendback');
            }, 3000); // 1000ms = 1秒
            return () => clearTimeout(timeoutId);
        }
    }, [playing]);

    //No14　相互友達
    const mutualFriends = async () => {
        try {
            const response = await axiosInstance.post('/api/friend', {
                id: location.state.sender_id
            });
            if (response.status === 201) alert('ともだちに追加できました！');
        } catch (error) {
            if (error.response.status === 409) console.log('すでに登録済み');
        }
    }


    return (
        <>
            <Box minHeight="100vh" sx={{
                overflow: 'hidden',
            }}>
                <Stack
                    direction="row"
                    alignItems="center"
                    spacing={3}
                    sx={{width: '100%', margin: 2, marginBottom: {xs: 3, sm: 7, md: 14}}}
                >
                    <ArrowBackIosNewIcon sx={{
                        height: 24, width: 24, color: '#333333'
                    }} onClick={() => navigate('/timeline')}
                    />
                    <UserIcon displayname={location.state.displayname}/>
                </Stack>
                <Box
                    display="flex" // レイアウトモード
                    flexDirection="column" // 縦並び
                    alignItems="center" // 横中央揃え
                    justifyContent="center" // 縦中央揃え
                >
                    {/* 吹き出し（状態ごとに画像切替） */}
                    <Box sx={{width: {xs: 260, sm: 294, md: 294}, height: {xs: 119, sm: 135, md: 135}}}>
                        {playing === 'before' && (
                            <img src={speechBubbleBefore} alt="speechBubbleBefore"
                                 style={{height: '100%', width: '100%'}}/>
                        )}
                        {playing === 'playing' && (
                            <img src={speechBubblePlaying} alt="speechBubblePlaying"
                                 style={{height: '100%', width: '100%'}}/>
                        )}
                        {playing === 'after' && (
                            <img src={speechBubbleAfter} alt="speechBubbleAfter"
                                 style={{height: '100%', width: '100%'}}/>
                        )}
                        {playing === 'sendback' && (
                            <img src={speechBubbleSendback} alt="speechBubblePlaying"
                                 style={{height: '100%', width: '100%'}}/>
                        )}
                    </Box>

                    {/* 白丸とキャラ画像 */}
                    <Box sx={{
                        position: 'relative',
                        width: {xs: 230, sm: 300, md: 300},
                        height: {xs: 230, sm: 300, md: 300}
                    }}>
                        <img
                            src={whiteCircle}
                            style={{height: '100%', width: '100%', position: 'absolute'}}
                            alt="whiteCircle"
                        />
                        {playing === 'after' ? (
                            <img
                                src={hohoemian}
                                style={{height: '100%', width: '100%', position: 'relative'}}
                                alt="hohoemian"
                            />
                        ) : (
                            <img
                                src={giraranian}
                                style={{height: '100%', width: '100%', position: 'relative'}}
                                alt="giraranian"
                            />
                        )}
                    </Box>
                    <Box
                        sx={{
                            width: {xs: 135, sm: 164, md: 164},
                            height: {xs: 122, sm: 149, md: 149}
                        }}
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        gap={2}>
                        <audio src={s3Url} ref={audioRef}/>

                        {playing === 'before' && (
                            <img
                                style={{height: '100%', width: '100%'}}
                                onClick={handlePlay}
                                src={playIcon}
                                alt="playIcon"
                            />
                        )}
                        {playing === 'playing' && (
                            <img
                                style={{height: '100%', width: '100%'}}
                                src={playingIcon}
                                alt="playingIcon"
                            />
                        )}
                        {playing === 'after' && (
                            <img
                                style={{height: '100%', width: '100%'}}
                                src={playAfterIcon}
                                alt="playAfterIcon"
                            />
                        )}
                        {(location.state.frinedFlag && playing === 'sendback') ?
                            (<>
                                <Typography
                                    sx={{
                                        textAlign: 'center',
                                        width: '75vw',
                                        fontSize: 14,
                                        color: '#906D6D',
                                    }}>まだともだちになっていないユーザーです</Typography>
                                <Button sx={{
                                    bgcolor: 'white',
                                    color: '#DA63A5',
                                    border: '2px solid #DA63A5',
                                    height: 43,
                                    width: 156,
                                    borderRadius: 3,
                                    fontSize: 16
                                }}
                                        onClick={mutualFriends}
                                >ともだち追加</Button>
                            </>) : (
                                <Box sx={{marginBottom: '64px'}}></Box>
                            )
                        }
                        {playing === 'sendback' && (
                            <Box sx={{width: {xs: '121px', sm: '156px', md: '156px'}}}>
                                <CustomButton
                                    onClick={() => navigate('/voice', {
                                        state: {
                                            receiver_id: location.state.sender_id,
                                            displayname: location.state.displayname
                                        }
                                    })}
                                >ホメット</CustomButton>
                            </Box>
                        )}


                    </Box>
                    {playing !== 'sendback' && (
                        <Typography sx={{fontSize: '24px', fontWeight: 'bold'}} color="#878484">
                            {(() => {
                                const time = playing === 'playing' ? currentTime : duration;
                                if (playing === 'playing') {
                                    return time < 10 ? `0 0 : 0 ${time}` : `0 0 : ${time.toString().slice(0, 1)} ${time.toString().slice(-1)}`;
                                } else {
                                    return duration < 10 ? `0 0 : 0 ${duration}` : `0 0 : ${duration.toString().slice(0, 1)} ${duration.toString().slice(-1)}`;
                                }
                            })()}

                        </Typography>
                    )}
                </Box>
            </Box>
            <NavigationBar/>

        </>
    );
}