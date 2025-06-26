import React, {useState, useRef} from 'react'
import {Button, Container} from '@mui/material'
import MicIcon from '@mui/icons-material/Mic'
import StopCircleIcon from '@mui/icons-material/StopCircle'

import Recorder from 'recorder-js';


function Audio2() {


    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const recorder = new Recorder(audioContext);

    // await navigator.mediaDevices.getUserMedia({audio: true}).then((stream) => {
    //     recorder.init(stream);     // マイクをAudioContextに接続
    //     recorder.start();          // 録音開始
    // });
    //
    // const arrayBuffer = await blob.arrayBuffer();
    //
    // const decoded = await audioContext.decodeAudioData(arrayBuffer);
    // const float32Array = decoded.getChannelData(0); // モノラルで処理

    // Float32 → Int16
    const floatTo16BitPCM = (float32Array) => {
        const int16Array = new Int16Array(float32Array.length);
        for (let i = 0; i < float32Array.length; i++) {
            let s = Math.max(-1, Math.min(1, float32Array[i]));
            int16Array[i] = s < 0 ? s * 0x8000 : s * 0x7FFF;
        }
        return int16Array;
    };

    const int16 = floatTo16BitPCM(float32Array);

    const mp3Encoder = new lamejs.Mp3Encoder(1, audioContext.sampleRate, 128); // mono, 128kbps
    const mp3Data = [];
    const blockSize = 1152;

    for (let i = 0; i < int16.length; i += blockSize) {
        const chunk = int16.subarray(i, i + blockSize);
        const buffer = mp3Encoder.encodeBuffer(chunk);
        if (buffer.length > 0) mp3Data.push(buffer);
    }
    mp3Data.push(mp3Encoder.flush());

    const mp3Blob = new Blob(mp3Data, {type: 'audio/mp3'});


    return (
        <Container>testtesttest</Container>
        // <Container>
        //     {!isRecording && (
        //         <MicIcon onClick={startRecording} disabled={isRecording}/>
        //     )}
        //     {isRecording && (
        //         <StopCircleIcon onClick={stopRecording} disabled={!isRecording}/>
        //     )}
        //     {audioUrl && (
        //         <Container>
        //             <audio src={audioUrl} controls/>
        //             <Button>届ける</Button>
        //         </Container>
        //     )}
        // </Container>
    );
}

export default Audio2