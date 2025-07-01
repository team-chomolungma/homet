import {useEffect, useState} from 'react'
import axios from 'axios'
import Audio from './component/Audio.jsx';
import Audio1 from './component/Audio1.jsx';

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
            {/*<Audio1/>*/}
        </div>
    )
}

export default App
