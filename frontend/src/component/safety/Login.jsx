import React, {useEffect, useState} from 'react';
import {
    Box,
    Button,
    IconButton,
    TextField,
    Typography,
    InputAdornment,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {useNavigate} from 'react-router-dom';
import axiosInstance from '../../lib/axios.js';
import {useAuth} from './AuthContext.jsx';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Loading from '../Loading.jsx';
import Zoom from '../Zoom.jsx';

function Login() {
    const {setUser} = useAuth();
    const navigate = useNavigate();

    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [userIdError, setUserIdError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showLoading, setShowLoading] = useState(false);

    //マウント時自動ログイン処理
    useEffect(() => {
        const checkSession = async () => {
            try {
                const res = await axiosInstance.get('/api/auth/session');
                if (res.status === 200) {
                    const {userID, displayname} = res.data;
                    setUser({myUserID: userID, myDisplayname: displayname});
                    console.log('セッション有効です');

                    // ✅ Loading表示フラグをtrueにして1秒後にホーム画面へ遷移
                    setShowLoading(true);
                    setTimeout(() => {
                        navigate('/start-animation');
                    }, 1000);
                }
            } catch (err) {
                if (err.response?.status === 401) {
                    console.log('未ログイン状態')
                } else {
                    console.error('予期しないエラー', err);
                }
            }
        };
        checkSession();
    }, [navigate]);

    // フォーム送信処理
    const handleSubmit = async (e) => {
        e.preventDefault();//リロード防止
        let hasError = false;

        if (!userId.trim()) {
            setUserIdError('ユーザーIDを入力してください');
            hasError = true;
        } else {
            setUserIdError('');
        }

        if (!password.trim()) {
            setPasswordError('パスワードを入力してください');
            hasError = true;
        } else if (!/^[a-zA-Z0-9]{6}$/.test(password)) {
            setPasswordError('6文字の英数字で入力してください');
            hasError = true;
        } else {
            setPasswordError('');
        }

        if (hasError) return;

        try {
            const res = await axiosInstance.post('/api/auth/login', {
                userID: userId,
                password: password,
            });
            if (res.status === 200) {
                const {userID, displayname} = res.data;
                setUser({myUserID: userID, myDisplayname: displayname});
                navigate('/home');
            }
        } catch (err) {
            if (err.response?.status === 401) {
                setPasswordError('ユーザーIDまたはパスワードが間違っています');
            } else {
                // // ⚡️⚡️本番では削除
                // const {userID, displayname} = {userID: 123456, displayname: 'うめちゃん'}
                // setUser({myUserID: userID, myDisplayname: displayname});
                // navigate('/home');
                // //ここまで
                console.error('予期しないエラー', err);
            }
        }
    };


    return (
        <>
            {showLoading ? (
                <Box
                    sx={{
                        height: '100vh',
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',

                    }}
                >
                    <Box
                        sx={{
                            height: '100vh',
                            width: '100%',
                            position: 'relative',

                        }}
                    >

                        <Loading/>

                        <Box
                            sx={{
                                position: 'absolute',
                                top: '60%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                            }}
                        >
                            <Typography
                                sx={{
                                    fontSize: 18,
                                    color: '#555',
                                    textAlign: 'center',
                                    mt: 3,
                                }}
                            >
                                自動ログイン中...
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            ) : (
                <Box
                    sx={{
                        minHeight: '100vh',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        px: 2,
                        backgroundColor: '#FFF1F4',
                        position: 'relative',
                    }}
                >
                    {/* 戻るボタン */}
                    <IconButton
                        onClick={() => navigate(-1)}
                        sx={{
                            position: 'absolute',
                            top: {xs: 16, sm: 24},
                            left: {xs: 16, sm: 24},
                        }}
                    >
                        <ArrowBackIcon/>
                    </IconButton>

                    {/* フォーム */}
                    <Box sx={{width: '100%', maxWidth: 400, px: {xs: 2, sm: 0}}}>
                        <Box
                            component="form"
                            onSubmit={handleSubmit}
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: {xs: 2, sm: 3},
                                alignItems: 'center',
                                width: '100%',
                            }}
                        >
                            <Typography
                                sx={{
                                    fontSize: {xs: 32, sm: 40},
                                    lineHeight: '1.3',
                                    color: '#333333',
                                    mb: {xs: 1, sm: 2},
                                }}
                            >
                                Homet
                            </Typography>

                            {/* ユーザーID */}
                            <Box sx={{width: '80%'}}>
                                <Typography sx={{fontSize: 14, mb: 0.5}}>ユーザーID</Typography>
                                <TextField
                                    fullWidth
                                    value={userId}
                                    onChange={(e) => setUserId(e.target.value)}
                                    error={!!userIdError}
                                    variant="outlined"
                                    sx={{
                                        backgroundColor: '#fff',
                                        borderRadius: 1,
                                        '& .MuiOutlinedInput-root': {
                                            fontSize: 16,
                                            height: 48,
                                        },
                                    }}
                                    placeholder="英数字で入力"
                                />
                                <Typography
                                    sx={{
                                        fontSize: 12,
                                        mt: '2px',
                                        minHeight: '1.5em',
                                        color: userIdError ? '#e53935' : 'transparent',
                                        backgroundColor: userIdError ? '#fff1f3' : 'transparent',
                                        pl: 1,
                                        borderRadius: 1,
                                    }}
                                >
                                    {userIdError || '　'}
                                </Typography>
                            </Box>

                            {/* パスワード */}
                            <Box sx={{width: '80%'}}>
                                <Typography sx={{fontSize: 14, mt: 3, mb: 0.5}}>パスワード</Typography>
                                <TextField
                                    type={showPassword ? 'text' : 'password'}
                                    fullWidth
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    error={!!passwordError}
                                    variant="outlined"
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={() => setShowPassword((prev) => !prev)}
                                                    edge="end"
                                                >
                                                    {showPassword ? <VisibilityIcon/> : <VisibilityOffIcon/>}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                        sx: {
                                            fontSize: 16,
                                            height: 48,
                                            backgroundColor: '#fff',
                                            borderRadius: 1,
                                        },
                                    }}
                                    placeholder="6文字の英数字で入力"
                                />
                                <Typography
                                    sx={{
                                        fontSize: 12,
                                        mt: '2px',
                                        minHeight: '1.5em',
                                        color: passwordError ? '#e53935' : 'transparent',
                                        backgroundColor: passwordError ? '#fff1f3' : 'transparent',
                                        pl: 1,
                                        borderRadius: 1,
                                    }}
                                >
                                    {passwordError || '　'}
                                </Typography>
                            </Box>

                            {/* ログインボタン */}
                            <Button
                                type="submit"
                                variant="contained"
                                sx={{
                                    mt: {xs: 2, sm: 3},
                                    width: {xs: 140, sm: 156},
                                    height: {xs: 60, sm: 76},
                                    borderRadius: '20px',
                                    fontSize: {xs: 20, sm: 24},
                                    backgroundColor: '#DA63A5',
                                    justifyContent: 'center',
                                    textTransform: 'none',
                                }}
                            >
                                ログイン
                            </Button>
                        </Box>
                    </Box>
                </Box>
            )}
        </>

    )
}

export default Login;
