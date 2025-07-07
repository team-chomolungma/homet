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

function Login() {
    const {setUser} = useAuth();
    const navigate = useNavigate();

    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [userIdError, setUserIdError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    //マウント時自動ログイン処理
    useEffect(() => {
        const checkSession = async () => {
            try {
                const res = await axiosInstance.get('/api/auth/session');
                if (res.status === 200) {
                    const {userID, displayname} = res.data; // レスポンスされるオブジェクトをセット{ userID, displayname }
                    setUser({myUserID: userID, myDisplayname: displayname});
                    console.log('セッション有効です');
                    navigate('/home');
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
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                px: 2,
            }}
        >
            <IconButton
                onClick={() => navigate(-1)}
                sx={{position: 'absolute', top: 24, left: 24}}
            >
                <ArrowBackIcon/>
            </IconButton>
            <Box
                sx={{
                    width: '100%',
                    maxWidth: 400,
                    position: 'relative',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        alignItems: 'center',
                        width: '100%',
                    }}
                >
                    <Typography sx={{fontSize: 40, lineHeight: '53px', color: '#333333'}}>
                        Homet
                    </Typography>

                    <Box sx={{width: 300}}>
                        <Typography sx={{fontSize: 16, mb: 0.5}}>ユーザーID</Typography>
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
                                    fontSize: 18,
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
                                backgroundColor: '#fff1f3',
                                pl: 1,
                                borderRadius: 1,
                            }}
                        >
                            {userIdError || '　'}
                        </Typography>
                    </Box>

                    <Box sx={{width: 300}}>
                        <Typography sx={{fontSize: 16, color: '#333', mt: 3}}>
                            パスワード
                        </Typography>
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
                                    fontSize: 18,
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
                                backgroundColor: '#fff1f3',
                                pl: 1,
                                borderRadius: 1,
                            }}
                        >
                            {passwordError || '　'}
                        </Typography>
                    </Box>


                    <Button
                        type="submit"
                        variant="contained"
                        sx={{
                            // mt: 2,
                            width: 156,
                            height: 76,
                            borderRadius: '20px',
                            fontSize: 24,
                            backgroundColor: '#DA63A5',
                            justifyContent: 'center',
                        }}
                    >
                        ログイン
                    </Button>

                </Box>

            </Box>
        </Box>
    );
}

export default Login;
