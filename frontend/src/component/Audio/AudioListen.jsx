import {Box, Typography} from '@mui/material';
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


//getUrl()の実行タイミング　

export default function AudioListen() {
    const audioRef = useRef(null);

    //'before' | 'playing' | 'after'
    const [playing, setPlaying] = useState('before');

    //署名付きURL
    const [s3Url, sets3Url] = useState(null)

    const [currentTime, setCurrentTime] = useState(0);

    const [duration, setDuration] = useState(0);

    const getUrl = () => {
        try {
            fetch('/api/homet/voice-data/6')
                .then(res => res.json())
                .then(data => {
                    sets3Url(data.url)
                    console.log(data.url)
                })

        } catch (err) {
            console.error('Get failed:', err);
        }

    }

    //手紙をクリック→getUrlして音声が読み込まれたら再生する
    useEffect(() => {
        if (!s3Url || !audioRef.current) return;

        const audio = audioRef.current;

        const onLoadedMetadata = () => {
            setDuration(Math.floor(audio.duration))
            setPlaying('playing')
        };

        const onTimeUpdate = () => {
            const current = Math.floor(audio.currentTime);
            setCurrentTime(current);        // 再生終了時に after に移行
            if (audio.ended) {
                setPlaying('after');
            }

        };


        audioRef.current.addEventListener('loadedmetadata', onLoadedMetadata);
        audioRef.current.addEventListener('timeupdate', onTimeUpdate);

        return () => {
            audioRef.current.removeEventListener('loadedmetadata', onLoadedMetadata);
            audioRef.current.removeEventListener('timeupdate', onTimeUpdate);
        };
    }, [s3Url]);

    const handlePlay = () => {
        getUrl()
        if (audioRef.current) {
            audioRef.current.currentTime = 0;
            setCurrentTime(0);
            audioRef.current.play();
            setPlaying('playing');
        }
    };


    return (
        <>
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
                    <audio src={s3Url} ref={audioRef}/>

                    {(playing === 'before' || playing === 'after') ? (
                        <img
                            onClick={handlePlay}
                            src={playIcon}
                            alt="playIcon"
                        />
                    ) : (
                        <img
                            src={playingIcon}
                            alt="playingIcon"
                        />
                    )}
                </Box>
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

            </Box>

            <NavigationBar/>

        </>
    );
}