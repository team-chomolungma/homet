import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import StartForm from './component/StartForm.jsx';
import LoginForm from './component/safety/LoginForm.jsx';
import Signup from './component/safety/Signup.jsx';
import './global.css';

window.global = window;
createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<StartForm/>}/> {/* 最初 */}
                <Route path="/login" element={<LoginForm/>}/> {/* ログイン */}
                <Route path="/signup" element={<Signup/>}/> {/* 新規作成 */}
            </Routes>
        </BrowserRouter>
    </StrictMode>
)
