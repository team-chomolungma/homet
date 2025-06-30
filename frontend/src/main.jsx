import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
    <App/>

//sdk初期化二重防止でStrictMode無効にしています
// <StrictMode>
//     <App />
// </StrictMode>
)
