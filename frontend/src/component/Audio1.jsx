// ReactベースのMP3録音・変換・POSTコード（Safari / Chrome 対応）
// 必要ライブラリ：recorder-js, lamejs

import React, {useState, useRef} from 'react';
import Recorder from 'recorder-js';
//import lamejs from 'lamejs';
//import {Mp3Encoder} from 'lamejs';


import {Button, Container} from '@mui/material';

const Audio1 = () => {

    // const [recording, setRecording] = useState(false)
    //
    // //MP3の再生URLを保存
    // const [audioUrl, setAudioUrl] = useState(null)
    //
    // //録音関係
    // const recorderRef = useRef(null)
    // const audioContextRef = useRef(null)
    //
    // const startRecording = async () => {
    //     //AudioContext 録音した音声をデコードして波形情報を取得するために必要
    //     audioContextRef.current = new window.AudioContext()
    //
    //     //マイクのアクセスを取得
    //     const stream = await navigator.mediaDevices.getUserMedia({audio: true});
    //
    //     const recorder = new Recorder(audioContextRef.current);
    //
    //     //録音を初期化・開始
    //     await recorder.init(stream);
    //     recorder.start();
    //
    //     recorderRef.current = recorder;
    //     setRecording(true);
    // };
    //
    // const stopRecording = async () => {
    //     //録音終了、WAV形式のblobを取得
    //     const {blob} = await recorderRef.current.stop();
    //
    //     //Blob を ArrayBuffer に変換し、decodeAudioData で生の波形（PCM）を復元
    //     const arrayBuffer = await blob.arrayBuffer();
    //     const audioBuffer = await audioContextRef.current.decodeAudioData(arrayBuffer);
    //     const float32Array = audioBuffer.getChannelData(0);
    //
    //     // Float32 → Int16 変換
    //     const floatTo16BitPCM = (float32) => {
    //         const int16 = new Int16Array(float32.length);
    //         for (let i = 0; i < float32.length; i++) {
    //             const s = Math.max(-1, Math.min(1, float32[i]));
    //             int16[i] = s < 0 ? s * 0x8000 : s * 0x7FFF;
    //         }
    //         return int16;
    //     };
    //
    //     const int16Array = floatTo16BitPCM(float32Array);
    //
    //     //MP3エンコード処理
    //     const mp3Encoder = new window.lamejs.Mp3Encoder(1, audioBuffer.sampleRate, 128);
    //     //mp3Dataにバイナリデータ入る
    //     const mp3Data = [];
    //     const blockSize = 1152;
    //
    //     for (let i = 0; i < int16Array.length; i += blockSize) {
    //         const chunk = int16Array.subarray(i, i + blockSize);
    //         const mp3buf = mp3Encoder.encodeBuffer(chunk);
    //         if (mp3buf.length > 0) mp3Data.push(mp3buf);
    //     }
    //     //flush()バッファの残り出力
    //     const mp3buf = mp3Encoder.flush()
    //     if (mp3buf.length > 0) mp3Data.push(mp3buf);
    //
    //     //mp3
    //     const mp3Blob = new Blob(mp3Data, {type: 'audio/mp3'});
    //
    //     //URL.createObjectURL()でaudioに渡すURLになる
    //     const mp3URL = URL.createObjectURL(mp3Blob);
    //     setAudioUrl(mp3URL)
    //
    //
    //     const formData = new FormData();
    //     formData.append('audio', mp3Blob, 'recording.mp3');
    //
    //     try {
    //         await fetch('/api/upload', {
    //             method: 'POST',
    //             body: formData,
    //         });
    //     } catch (err) {
    //         console.error('Upload failed:', err);
    //     }
    //
    //     setRecording(false);
    // };


    const [isRecording, setIsRecording] = useState(false)
    const [audioId, setAudioId] = useState(null)
    const [audioUrl, setAudioUrl] = useState(null)
    const mediaRecorderRef = useRef(null)
    const audioChunksRef = useRef([])

    const startRecording = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({audio: true})

        const mediaRecorder = new MediaRecorder(stream, {
            mimeType: 'audio/webm;codecs=opus'
        })
        mediaRecorderRef.current = mediaRecorder
        audioChunksRef.current = []

        mediaRecorder.ondataavailable = event => {
            audioChunksRef.current.push(event.data)
        }

        mediaRecorder.onstop = () => {
            const audioBlob = new Blob(audioChunksRef.current, {type: 'audio/m4a'})
            uploadAudio(audioBlob)
        }

        mediaRecorder.start()
        setIsRecording(true)
    }

    const stopRecording = () => {
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop()
            setIsRecording(false)
        }
    }

    //受け取ったデータ　blobを加工していこうここからやる
    const uploadAudio = async blob => {


        const formData = new FormData()
        //server側でaudioというnameで受け取る blob渡すデータ ファイル名
        formData.append('audio', blob, 'recording.m4a')

        try {
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData
            })

            if (!response.ok) {
                console.error('レスポンスエラー:', response.status)
                alert('アップロードに失敗しました')
                return
            }

            const result = await response.json()
            console.log('アップロード成功:', result)
            setAudioId(result.id)
        } catch (error) {
            console.error('JSON 解析エラー or 通信失敗:', error)
            alert('サーバーとの通信に失敗しました')
        }
    }


    return (
        <>
            <p>Audio2</p>
            <Container>
                <Button
                    onClick={isRecording ? stopRecording : startRecording}
                >
                    {isRecording ? 'STOP' : 'START'}
                </Button>
            </Container>
            {audioUrl && (
                <>
                    <p>撮りたて</p>
                    <audio src={audioUrl} controls/>
                    <Button>届ける</Button>
                </>
            )}
            <p>publicフォルダ</p>
            <audio src={'../public/recording.mp3'} controls/>
        </>

    );
};

export default Audio1;
