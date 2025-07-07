import {Box} from '@mui/material';
import loading from '../../public/loading.gif'
import {useLocation, useNavigate} from 'react-router-dom';

export default function Loading() {
    const navigate = useNavigate();
    //使う時　navigate('/loading', {state: {pass: 'voice'}}) stateを取得できる
    const location = useLocation();

    //1秒後に自動で画面遷移
    setTimeout(() => {
        navigate(`/${location.state.pass}`)
    }, 1000)

    return (
        <>
            <Box
                display="flex"//レイアウトモード
                alignItems="center"//横中央揃え
                justifyContent="center"//縦中央揃え
                minHeight="100vh" // 画面縦いっぱい中央揃えしたい場合。不要なら外してOK
            >
                <img alt={'ほめらにあんgif'} src={loading} width={118} height={146}/>
            </Box>
        </>
    )

}