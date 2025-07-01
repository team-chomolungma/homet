import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import App from './App.jsx'

window.global = window;
createRoot(document.getElementById('root')).render(
    <StrictMode>
        <App/>
    </StrictMode>,
    <App/>

//sdk初期化二重防止でStrictMode無効にしています
// <StrictMode>
//     <App />
// </StrictMode>
)
