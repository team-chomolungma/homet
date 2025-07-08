import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import StartForm from './component/safety/StartForm.jsx';
import Signup from './component/safety/Signup.jsx';
import Login from './component/safety/Login.jsx';
import Start from './component/safety/Start.jsx';
import AudioRecording from './component/Audio/AudioRecording.jsx';
import AudioListen from './component/Audio/AudioListen.jsx';
import Timeline from './component/Timeline.jsx'
import './global.css';
import Home from './component/Home.jsx';
import {AuthProvider} from './component/safety/AuthContext.jsx'
import SessionChecker from './component/safety/SessionChecker.jsx';
import OneSignalPush from './component/OneSignalPush.jsx';
import AddFriend from './component/friend/AddFriend.jsx';
import Friendlist from './component/friend/Friendlist.jsx';
import AudioSendAfter from './component/Audio/AudioSendAfter.jsx';
import {createTheme} from '@mui/material';
import {ThemeProvider} from '@mui/material/styles';

const theme = createTheme({
    breakpoints: {
        values: {
            xs: 0,
            sm: 390,
            md: 430,
        },
    },
});

window.global = window;
createRoot(document.getElementById('root')).render(
    <StrictMode>
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <AuthProvider>
                    <SessionChecker>
                        <OneSignalPush/>
                        <Routes>
                            <Route path="/" element={<StartForm/>}/> {/* 最初 */}
                            <Route path="/start" element={<Start/>}/> {/* start */}
                            <Route path="/login" element={<Login/>}/> {/* login */}
                            <Route path="/signup" element={<Signup/>}/> {/* 新規作成 */}
                            <Route path="/home" element={<Home/>}/> {/* 新規作成 */}
                            <Route path="/voice" element={<AudioRecording/>}/> {/* 新規作成 */}
                            <Route path="/voice-data" element={<AudioListen/>}/>
                            <Route path="/voice-after" element={<AudioSendAfter/>}/>
                            <Route path="/timeline" element={<Timeline/>}/>
                            <Route path="/friendlist" element={<Friendlist/>}/>
                            <Route path="/addfriend" element={<AddFriend/>}/>
                        </Routes>
                    </SessionChecker>
                </AuthProvider>
            </BrowserRouter>
        </ThemeProvider>
    </StrictMode>
)