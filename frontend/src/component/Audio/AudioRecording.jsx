import React, {useState, useRef, useEffect, useContext} from 'react';
import Recorder from 'recorder-js';
import kimeranian from '../../../public/homeranian/kimeranian.png'
import recordingIcon from '../../../public/icons/recording.png'
import stopIcon from '../../../public/icons/stop.png'
import sendIcon from '../../../public/icons/send.png'
import retakeIcon from '../../../public/icons/retake.png'
import whiteCircle from '../../../public/whiteCircle.png';
import speechBubbleRecording from '../../../public/speechBubble/recording.png';
import speechBubbleStop from '../../../public/speechBubble/stop.png';
import speechBubbleSend from '../../../public/speechBubble/send.png';
import support1 from '../../../public/speechBubble/support1.png';
import support2 from '../../../public/speechBubble/support2.png';
import support3 from '../../../public/speechBubble/support3.png';
import support4 from '../../../public/speechBubble/support4.png';
import {Box, Container, Stack, Typography} from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import {useNavigate, useLocation} from 'react-router-dom';
import UserIcon from '../UserIcon.jsx';
import Loading from '../Loading.jsx';
import Pulse from '../Pulse.jsx';
import axiosInstance from '../../lib/axios.js';
import SendNotificationButton from '../SendNotificationButton.jsx';

const COUNT_MS = 15;

//props id userid receiver_id ホメット
const AudioRecording = () => {
    const navigate = useNavigate();
    const location = useLocation();

    //褒めサポ
    const [currentImage, setCurrentImage] = useState(speechBubbleRecording);
    const support = [support1, support2, support3, support4];
    const handleClick = () => {
        const filterSupport = support.filter(image => image !== currentImage);
        const randomIndex = Math.floor(Math.random() * filterSupport.length);
        setCurrentImage(filterSupport[randomIndex]);
    };

    const [req, setReq] = useState(false);

    //'idle' | 'recording' | 'recorded'
    const [recording, setRecording] = useState('idle');

    //残り時間
    const [remainingTime, setRemainingTime] = useState(COUNT_MS);


    //録音とPOST処理を分けるための引数用
    const [mp3Blob, setMp3Blob] = useState(null);

    //録音関係
    const recorderRef = useRef(null);
    const audioContextRef = useRef(null);

    //通知
    const [playerId, setPlayerId] = useState(null);
    const notificationRef = useRef();

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


    //No8 Header: Content-Type:multiport/form-data
    // Body:{file,receiver_id}
    const sendVoice = async () => {
        setReq(true)
        try {
            const formData = new FormData();
            const receiverId = location.state.receiver_id;
            formData.append('file', mp3Blob, 'recording.mp3');
            formData.append('receiver_id', receiverId.toString());
            const response = await axiosInstance.post('/api/homet/voice', formData)
            if (response.status === 200) {
                // console.log('送信成功')
                const playerId = response.data.playerID;
                setPlayerId(playerId);
                notificationRef.current?.sendNotification(); //通知送信発火
            }
        } catch (err) {
            console.error('送信失敗', err)
        } finally {
            setReq(false)
            navigate('/voice-after')
        }
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

    if (req) return <Loading/>;

    return (
        <>
            <Box
                sx={{
                    height: '100vh',        // ← 明確に高さを指定
                    overflow: 'hidden',     // ← スクロール禁止
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <Container sx={{position: 'relative'}}>
                    <Stack
                        direction="row"
                        alignItems="center"
                        spacing={3}
                        sx={{width: '100%', margin: 2}}
                    >
                        <ArrowBackIosNewIcon sx={{
                            height: 24, width: 24, color: '#333333'
                        }} onClick={() => navigate(-1)}
                        />
                        <UserIcon displayname={location.state.displayname}/>
                    </Stack>
                    <Box
                        display="flex"//レイアウトモード
                        flexDirection="column"//縦並び
                        alignItems="center"//横中央揃え
                        justifyContent="center"//縦中央揃え
                        sx={{marginTop: {xs: 0, sm: 5, md: 7}}}
                        // minHeight="100vh" // 画面縦いっぱい中央揃えしたい場合。外したら上に揃える
                    >
                        <Box sx={{width: {xs: 260, sm: 294, md: 294}, height: {xs: 119, sm: 135, md: 135}}}>
                            {recording === 'idle' && (
                                <img
                                    onClick={handleClick}
                                    src={currentImage}
                                    alt="speechBubbleRecording"
                                    style={{height: '100%', width: '100%'}}
                                />
                            )}
                            {recording === 'recording' && (
                                <img
                                    src={speechBubbleStop}
                                    alt="speechBubbleStop"
                                    style={{height: '100%', width: '100%'}}
                                />
                            )}
                            {recording === 'recorded' && (
                                <img
                                    src={speechBubbleSend}
                                    alt="speechBubbleSend"
                                    style={{height: '100%', width: '100%'}}
                                />
                            )}
                        </Box>

                        <Box sx={{
                            position: 'relative',
                            width: {xs: 230, sm: 300, md: 300},
                            height: {xs: 230, sm: 300, md: 300}
                        }}>

                            <img
                                src={kimeranian}
                                style={{height: '100%', width: '100%', position: 'absolute'}}
                                alt="kimeranian"
                            />


                            <img
                                src={whiteCircle}
                                style={{height: '100%', width: '100%'}}
                                alt="white circle"
                            />
                        </Box>


                        <Stack
                            direction="row"
                            alignItems="center"
                            justifyContent="center"
                            spacing={3}
                            sx={{width: '100%', margin: 2, marginTop: 2}}

                        >
                            <Box sx={{
                                position: 'relative',
                            }}>

                                <Box sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                }}>
                                    {recording === 'recorded' &&
                                        <>
                                            <Box
                                                sx={{
                                                    marginRight: 4,
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    width: {xs: 57, sm: 64, md: 64},
                                                    height: {xs: 57, sm: 64, md: 64}
                                                }}>
                                                <img
                                                    style={{height: '100%', width: '100%'}}
                                                    src={retakeIcon}
                                                    alt="retakeIcon"
                                                    onClick={reshoot}
                                                />
                                            </Box>
                                            <Box

                                                sx={{
                                                    width: {xs: 135, sm: 164, md: 164},
                                                    height: {xs: 109, sm: 133, md: 133}

                                                }}>
                                                <img
                                                    style={{height: '100%', width: '100%'}}
                                                    src={sendIcon}
                                                    alt="sendIcon"
                                                    onClick={() => {
                                                        sendVoice();
                                                        // navigate('/loading', {state: {pass: 'voice-after'}})
                                                    }}/>
                                            </Box>
                                            <Box sx={{width: 50, marginLeft: 4}}></Box>
                                        </>
                                    }

                                    {recording === 'idle' && (
                                        <Box

                                            sx={{
                                                width: {xs: 135, sm: 164, md: 164},
                                                height: {xs: 122, sm: 149, md: 149}

                                            }}>
                                            <img
                                                style={{height: '100%', width: '100%'}}
                                                src={recordingIcon}
                                                alt="recordingIcon"
                                                onClick={startRecording}
                                            />
                                        </Box>
                                    )}

                                    {recording === 'recording' && (
                                        <Box>
                                            <img
                                                src={stopIcon}
                                                alt="stopIcon"
                                                onClick={stopRecording}
                                                style={{
                                                    position: 'absolute',
                                                    zIndex: 1,
                                                    height: '100%',
                                                    width: '100%'
                                                }}
                                            />
                                            <Pulse/>
                                        </Box>
                                    )}
                                </Box>
                            </Box>
                        </Stack>


                        {recording === 'idle' && <Typography sx={{height: 36, fontSize: 14}}
                                                             color={'#896464'}>マイクをタップして録音してください</Typography>}
                        {recording === 'recording' && <Typography sx={{fontSize: '24px', fontWeight: 'bold'}}
                                                                  color={'#878484'}>{remainingTime < 10 ? `0 0 : 0 ${remainingTime}` : `0 0 : ${remainingTime.toString().slice(0, 1)} ${remainingTime.toString().slice(-1)}`}</Typography>}

                    </Box>
                </Container>
                <SendNotificationButton
                    ref={notificationRef}
                    targetPlayerId={playerId}
                />
            </Box>
        </>

    );
};

export default AudioRecording;
