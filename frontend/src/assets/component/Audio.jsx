import React, { useState, useRef } from 'react'
import {Button, Container} from "@mui/material"
import MicIcon from '@mui/icons-material/Mic'
import StopCircleIcon from '@mui/icons-material/StopCircle'

function Audio() {
    //録音中か
    const [isRecording, setIsRecording] = useState(false)
    //再生用の音声URL
    const [audioUrl, setAudioUrl] = useState(null)
    const mediaRecorderRef = useRef(null)
    //音声を保存しておく配列
    const audioChunksRef = useRef([])

    const startRecording = async () => {
        //マイクの使用許可をユーザーに求める
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        //インスタンスを作成、保存
        //メディアを収録する機能
        //MIMEタイプの設定
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;
        //配列初期化
        audioChunksRef.current = [];

        //ondataavailableイベントでデータを配列にpush
        //MediaRecorder がメディアデータをアプリで使用するために引き渡すときに発生
        mediaRecorder.ondataavailable = event => {
            audioChunksRef.current.push(event.data);
        };

        mediaRecorder.onstop = () => {
            const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
            const url = URL.createObjectURL(audioBlob);
            setAudioUrl(url);
        };

        mediaRecorder.start();
        setIsRecording(true);
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
        }
    };

    return (
        <Container>
            {!isRecording && (
                <MicIcon onClick={startRecording} disabled={isRecording} />
            )}
            {isRecording && (
                <StopCircleIcon onClick={stopRecording} disabled={!isRecording} />
            )}
            {audioUrl && (
                <Container>
                    <audio src={audioUrl} controls />
                    <Button>届ける</Button>
                </Container>
            )}
        </Container>
    );
}

export default Audio