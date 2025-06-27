import {useEffect, useState} from 'react'
import axios from 'axios'
import Audio from './component/Audio.jsx';

function App() {
    const [message, setMessage] = useState('')

    useEffect(() => {
        axios.get('/api')
            .then(res => {
                setMessage(res.data)
            })
            .catch(err => {
                console.error('エラー', err)
            })
    }, [])

    return (
        <div>
            {message}
            <Audio/>
        </div>
    )
}

export default App
