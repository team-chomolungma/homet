import {useEffect, useState} from 'react'
import Audio from './component/Audio.jsx';
import axiosInstance from './lib/axios';
import OneSignalPush from './component/OneSignalPush.jsx';
import SendNotificationButton from './component/SendNotificationButton.jsx';


// import OneSignalPush from './component/OneSignalPush.jsx';

function App() {
    const [message, setMessage] = useState('')

    useEffect(() => {
        axiosInstance.get('/api')
            .then(res => {
                setMessage(res.data)
            })
            .catch(err => {
                console.error('エラー', err)
            })
    }, [])

    return (
        <div>
            <OneSignalPush/>
            <SendNotificationButton/>
            {message}
            <Audio/>
        </div>
    )
}

export default App
