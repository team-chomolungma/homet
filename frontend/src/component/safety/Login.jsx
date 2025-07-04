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
import axios from 'axios';

function Login() {
    const navigate = useNavigate();

    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [userIdError, setUserIdError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    //自動ログイン処理
    useEffect(() => {
        axios
            .get('/api/auth/session', {withCredentials: true})
            .then((res) => {
                navigate('/home'); //セッション有効ならログインスキップ
            })
            .catch(() => {
                // セッション無効なら何もしない
            });
    }, [navigate]);

    // フォーム送信処理
    const handleSubmit = (e) => {
        e.preventDefault();
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
        } else {
            setPasswordError('');
        }

        if (!hasError) {
            axios
                .post(
                    '/api/auth/login',
                    {userID: userId, password},
                    {withCredentials: true}
                ).then((res) => {
                navigate('/home');
            })
                .catch((err) => {
                    if (err.response?.status === 401) {
                        setPasswordError('ユーザーIDまたはパスワードが間違っています');
                    }
                });
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
                    <Typography
                        sx={{
                            fontSize: 40,
                            lineHeight: '53px',
                            color: '#333333',
                        }}
                    >
                        Homet
                    </Typography>

                    {/* ユーザーID */}
                    <Box sx={{width: 300}}>
                        <Typography sx={{fontSize: 16, mb: 0.5}}>ユーザーID</Typography>
                        <TextField
                            fullWidth
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                            error={!!userIdError}
                            placeholder="英数字"
                            variant="outlined"
                            sx={{
                                backgroundColor: '#fff',
                                borderRadius: 1,
                                '& .MuiOutlinedInput-root': {
                                    fontSize: 18,
                                    height: 48,
                                },
                            }}
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

                    {/* パスワード */}
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

                    {/* ログインボタン */}
                    <Box sx={{width: '100%', display: 'flex', justifyContent: 'center'}}>
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{
                                mt: 4,
                                width: 228,
                                height: 76,
                                borderRadius: '999px',
                                fontSize: 18,
                                backgroundColor: '#e94e8a',
                            }}
                        >
                            ログイン
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

export default Login;
