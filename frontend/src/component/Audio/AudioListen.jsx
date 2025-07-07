import {Box, Button, Typography} from '@mui/material';
import NavigationBar from '../NavigationBar.jsx';
import hohoemian from '../../../public/homeranian/hohoemian.png'
import giraranian from '../../../public/homeranian/giraranian.png'
import whiteCircle from '../../../public/whiteCircle.png'
import playIcon from '../../../public/icons/play.png'
import playingIcon from '../../../public/icons/playing.png'
import speechBubbleBefore from '../../../public/speechBubble/before.png';
import speechBubblePlaying from '../../../public/speechBubble/playing.png';
import speechBubbleAfter from '../../../public/speechBubble/after.png';
import React, {useState, useRef, useEffect} from 'react';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import {useNavigate, useLocation} from 'react-router-dom';
import axios from 'axios';


//getUrl()の実行タイミング　

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


    //手紙をクリック→getUrlして音声が読み込まれたら再生する
    useEffect(() => {
        if (!s3Url || !audioRef.current) return;

        const audio = audioRef.current;

        const onLoadedMetadata = () => {
            setDuration(Math.floor(audio.duration))
            setPlaying('playing')
        };

        //初回再生 No10
        const firstPlay = async () => {
            const response = axios.post('/api/homet/play-history',
                {
                    voice_file_id: location.state.voice_file_id
                })
            if ((await response).status === 201) {
                console.log('初回再生')
            } else if ((await response).status === 409) {
                console.log('2回目以降')
            } else if (response.status === 404) {
                console.log('存在しないId')
            }
        }

        const onTimeUpdate = () => {
            const current = Math.floor(audio.currentTime);
            setCurrentTime(current);        // 再生終了時に after に移行
            //duration　全体の長さ  currentTime　現在の再生位置    =>duration　再生位置が全体の長さまで到達したか
            //再生終了したか？
            if (audio.duration && audio.currentTime >= audio.duration) {
                setPlaying('after');
                firstPlay()
            }

        };


        audioRef.current.addEventListener('loadedmetadata', onLoadedMetadata);
        audioRef.current.addEventListener('timeupdate', onTimeUpdate);

        return () => {
            if (audioRef.current) {
                audioRef.current.removeEventListener('loadedmetadata', onLoadedMetadata);
                audioRef.current.removeEventListener('timeupdate', onTimeUpdate);
            }
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


    return (
        <>
            <ArrowBackIosNewIcon sx={{
                height: 24, width: 24, color: '#333333', top: 20, position: 'absolute'
            }} onClick={() => navigate('/timeline')}
            />
            <Box
                display="flex"//レイアウトモード
                flexDirection="column"//縦並び
                alignItems="center"//横中央揃え
                justifyContent="center"//縦中央揃え
                minHeight="100vh" // 画面縦いっぱい中央揃えしたい場合。不要なら外してOK
            >
                {playing === 'before' &&
                    <img
                        src={speechBubbleBefore}
                        alt="speechBubbleBefore"
                    />}
                {playing === 'playing' && (
                    <img
                        src={speechBubblePlaying}
                        alt="speechBubblePlaying"
                    />
                )}
                {playing === 'after' && (
                    <img
                        src={speechBubbleAfter}
                        alt="speechBubbleAfter"
                    />
                )}
                {playing === 'sendback' && (
                    <img
                        src={speechBubblePlaying}
                        alt="speechBubblePlaying"
                    />
                )}


                <Box>
                    <img src={whiteCircle} style={{height: 283, width: 283, position: 'absolute'}} alt="whiteCircle"/>
                    {playing === 'after' ? (
                        <img src={hohoemian} style={{height: 300, width: 300, position: 'relative'}}
                             alt="giraranian"/>
                    ) : (
                        <img src={giraranian} style={{height: 300, width: 300, position: 'relative'}}
                             alt="giraranian"/>
                    )}


                </Box>

                <Box>
                    <audio src={location.state.url} ref={audioRef}/>

                    {playing === 'before' && (
                        <img
                            onClick={handlePlay}
                            src={playIcon}
                            alt="playIcon"
                        />
                    )}
                    {playing === 'playing' && (
                        <img
                            src={playingIcon}
                            alt="playingIcon"
                        />
                    )}
                    {playing === 'after' && (
                        <img
                            src={playingIcon}
                            alt="playingIcon"
                        />
                    )}
                    {playing === 'sendback' && (
                        <Button sx={{
                            bgcolor: '#DA63A5',
                            color: 'white',
                            height: 76,
                            width: 156,
                            borderRadius: 5,
                            fontSize: 24
                        }}
                                onClick={() => navigate('/voice', {
                                    state: {
                                        receiver_id: location.state.receiver_id,
                                        displayname: location.state.displayname
                                    }
                                })}>ホメット</Button>
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
            <NavigationBar/>

        </>
    );
}