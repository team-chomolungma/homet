import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import StartForm from './component/safety/StartForm.jsx';
import Signup from './component/safety/Signup.jsx';
import Login from './component/safety/Login.jsx';
import Start from './component/safety/Start.jsx';


import './global.css';
import Home from './component/Home.jsx';

window.global = window;
createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<StartForm/>}/> {/* 最初 */}
                <Route path="/start" element={<Start/>}/> {/* start */}
                <Route path="/login" element={<Login/>}/> {/* login */}
                <Route path="/signup" element={<Signup/>}/> {/* 新規作成 */}
                <Route path="/home" element={<Home/>}/> {/* 新規作成 */}
            </Routes>
        </BrowserRouter>
    </StrictMode>
)
