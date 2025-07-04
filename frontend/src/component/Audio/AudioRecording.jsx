import React, {useState, useRef, useEffect} from 'react';
import Recorder from 'recorder-js';
import kimeranian from '../../../public/homeranian/kimeranian.png'
import hohoemian from '../../../public/homeranian/hohoemian.png';
import recordingIcon from '../../../public/icons/recording.png'
import stopIcon from '../../../public/icons/stop.png'
import sendIcon from '../../../public/icons/send.png'
import whiteCircle from '../../../public/whiteCircle.png';
import RefreshIcon from '@mui/icons-material/Refresh';
import speechBubbleRecording from '../../../public/speechBubble/recording.png';
import speechBubbleStop from '../../../public/speechBubble/stop.png';
import speechBubbleSend from '../../../public/speechBubble/send.png';
import speechBubbleAfterSending from '../../../public/speechBubble/afterSending.png';
import {Box, Button, Container, Stack, Typography} from '@mui/material';
import NavigationBar from '../NavigationBar.jsx';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

const COUNT_MS = 15;

//props id userid senderid　ホメット
const AudioRecording = () => {
    //'idle' | 'recording' | 'recorded' | 'aftersending'
    const [recording, setRecording] = useState('idle');

    //残り時間
    const [remainingTime, setRemainingTime] = useState(COUNT_MS);


    //録音とPOST処理を分けるための引数用
    const [mp3Blob, setMp3Blob] = useState(null);

    //録音関係
    const recorderRef = useRef(null);
    const audioContextRef = useRef(null);

    const startRecording = async () => {
        setRecording('recording')
        setRemainingTime(COUNT_MS);
        //AudioContext 録音した音声をデコードして波形情報を取得するために必要
        audioContextRef.current = new window.AudioContext()

        //マイクのアクセスを取得
        const stream = await navigator.mediaDevices.getUserMedia({audio: true});

        const recorder = new Recorder(audioContextRef.current);

        //録音を初期化・開始
        await recorder.init(stream);
        recorder.start();

        recorderRef.current = recorder;
    };

    const stopRecording = async () => {
        //録音終了、WAV形式のblobを取得
        const {blob} = await recorderRef.current.stop();

        //Blob を ArrayBuffer に変換し、decodeAudioData で生の波形（PCM）を復元
        const arrayBuffer = await blob.arrayBuffer();
        const audioBuffer = await audioContextRef.current.decodeAudioData(arrayBuffer);
        const float32Array = audioBuffer.getChannelData(0);

        // Float32 → Int16 変換
        const floatTo16BitPCM = (float32) => {
            const int16 = new Int16Array(float32.length);
            for (let i = 0; i < float32.length; i++) {
                const s = Math.max(-1, Math.min(1, float32[i]));
                int16[i] = s < 0 ? s * 0x8000 : s * 0x7FFF;
            }
            return int16;
        };

        const int16Array = floatTo16BitPCM(float32Array);

        //MP3エンコード処理
        const mp3Encoder = new window.lamejs.Mp3Encoder(1, audioBuffer.sampleRate, 128);
        //mp3Dataにバイナリデータ入る
        const mp3Data = [];
        const blockSize = 1152;

        for (let i = 0; i < int16Array.length; i += blockSize) {
            const chunk = int16Array.subarray(i, i + blockSize);
            const mp3buf = mp3Encoder.encodeBuffer(chunk);
            if (mp3buf.length > 0) mp3Data.push(mp3buf);
        }
        //flush()バッファの残り出力
        const mp3buf = mp3Encoder.flush()
        if (mp3buf.length > 0) mp3Data.push(mp3buf);

        //mp3
        const mp3Blob = new Blob(mp3Data, {type: 'audio/mp3'});
        setMp3Blob(mp3Blob);

        //URL.createObjectURL()でaudioに渡すURLになる
        //const mp3URL = URL.createObjectURL(mp3Blob);

        setRecording('recorded');
    };

    const sendVoice = async () => {

        const formData = new FormData();
        formData.append('audio', mp3Blob, 'recording.mp3');
        formData.append('senderUser', 'A');
        formData.append('receiverUser', 'C');

        try {
            await fetch('/api/homet/voice', {
                method: 'POST',
                body: formData,
            }).then(data => console.log(data, 'postできた'))
        } catch (err) {
            console.error('Upload failed:', err);
        }
        setRecording('aftersending')
    }

    const reshoot = () => {
        setRecording('idle')
    }


    useEffect(() => {
        if (recording !== 'recording') return;

        if (remainingTime <= 0) {
            stopRecording(); // カウントが0になったら自動停止
            return;
        }

        const timeoutId = setTimeout(() => {
            setRemainingTime((prev) => prev - 1);
        }, 1000);

        return () => clearTimeout(timeoutId);
    }, [remainingTime, recording]);


    return (
        <>

            <Container sx={{position: 'relative'}}>
                <ArrowBackIosNewIcon sx={{
                    height: 24, width: 24, color: '#333333', top: 20, position: 'absolute'
                }}/>
                <Box
                    display="flex"//レイアウトモード
                    flexDirection="column"//縦並び
                    alignItems="center"//横中央揃え
                    justifyContent="center"//縦中央揃え
                    minHeight="100vh" // 画面縦いっぱい中央揃えしたい場合。外したら上に揃える
                >
                    {recording === 'idle' && (
                        <img
                            src={speechBubbleRecording}
                            alt="speechBubbleRecording"
                        />
                    )}
                    {recording === 'recording' && (
                        <img
                            src={speechBubbleStop}
                            alt="speechBubbleStop"
                        />
                    )}
                    {recording === 'recorded' && (
                        <img
                            src={speechBubbleSend}
                            alt="speechBubbleSend"
                        />
                    )}
                    {recording === 'aftersending' && (
                        <img
                            src={speechBubbleAfterSending}
                            alt="speechBubbleAfterSending"
                        />
                    )}
                    <Box sx={{
                        position: 'relative',
                    }}>
                        {recording === 'aftersending' ? (
                            <img
                                src={hohoemian}
                                style={{
                                    height: 300,
                                    width: 300,
                                    position: 'absolute',
                                }}
                                alt="kimeranian"
                            />
                        ) : (
                            <img
                                src={kimeranian}
                                style={{
                                    height: 300,
                                    width: 300,
                                    position: 'absolute',
                                }}
                                alt="kimeranian"
                            />
                        )}

                        <img
                            src={whiteCircle}
                            style={{
                                height: 283,
                                width: 283,
                            }}
                            alt="white circle"
                        />


                    </Box>

                    <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="center"
                        spacing={3}
                        sx={{width: '100%', margin: 2}}
                    >

                        {recording === 'recorded' ? (
                            <RefreshIcon
                                sx={{height: 50, width: 50, color: '#F24B32'}}
                                onClick={reshoot}
                            />
                        ) : (
                            <Box sx={{width: 50}}/>
                        )}

                        {recording === 'idle' && (
                            <img
                                src={recordingIcon}
                                alt="recordingIcon"
                                onClick={startRecording}
                            />
                        )}
                        {recording === 'recording' && (
                            <img
                                src={stopIcon}
                                alt="stopIcon"
                                onClick={stopRecording}
                            />
                        )}
                        {recording === 'recorded' && (
                            <img
                                src={sendIcon}
                                alt="sendIcon"
                                onClick={sendVoice}
                            />
                        )}
                        <Box sx={{width: 50}}/>
                    </Stack>
                    {recording === 'idle' && <Typography
                        color={'#B7B7B7'}>'ボタンをタップして録音してください'</Typography>}
                    {recording === 'recording' && <Typography sx={{fontSize: '24px', fontWeight: 'bold'}}
                                                              color={'#878484'}>{remainingTime < 10 ? `00:0${remainingTime}` : `00:${remainingTime}`}</Typography>}
                    {recording === 'aftersending' && (
                        <Button sx={{
                            bgcolor: '#DA63A5',
                            color: 'white',
                            height: 76,
                            width: 156,
                            borderRadius: 5,
                            fontSize: 24
                        }}>ホームへ</Button>
                    )}
                    {recording === 'aftersending' && (
                        <NavigationBar/>
                    )}
                </Box>
            </Container>
        </>

    );
};

export default AudioRecording;
