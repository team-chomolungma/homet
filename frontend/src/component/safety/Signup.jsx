import React, {useEffect, useState} from 'react';
import {
    Box,
    Button,
    IconButton,
    TextField,
    Typography,
    InputAdornment
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {useNavigate} from 'react-router-dom';
import axiosInstance from '../../lib/axios.js';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import OneSignal from 'react-onesignal';
import SendNotificationButton from '../SendNotificationButton.jsx';

function Signup() {
    const navigate = useNavigate();

    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [userName, setUserName] = useState('');
    const [userIdError, setUserIdError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [passwordError, setPasswordError] = useState('');
    const [userNameError, setUserNameError] = useState('');
    const [playerId, setplayerId] = useState(null)
    const [security, setSecurity] = useState(false);

    // ユーザーIDの重複チェック（入力欄からフォーカスが外れたタイミングしてます）
    const checkUserIdDuplicate = async () => {
        if (!userId.trim()) return;
        try {
            const res = await axiosInstance.get(`/api/users/search?userID=${userId}`);
            const data = res.data;

            if (data.result && data.result.length > 0) {
                setUserIdError('このユーザーIDはすでに使われています');
            } else {
                setUserIdError('');
            }
        } catch (err) {
            console.error('重複チェック失敗', err);
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        let hasError = false;

        if (!playerId) {
            alert('OneSignalの初期化中です。少し待ってからもう一度お試しください。');
            return;
        }

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

        if (!userName.trim()) {
            setUserNameError('ユーザー名を入力してください');
            hasError = true;
        } else if (!/^[^\x01-\x7E]+$/.test(userName)) {
            setUserNameError('全角文字のみで入力してください');
            hasError = true;
        } else if (Array.from(userName).length >= 6) {
            setUserNameError('全角6文字以下で入力してください');
            hasError = true;
        } else {
            setUserNameError('');
        }

        if (!security) {
            return
        }

        if (!hasError) {
            try {
                const res = await axiosInstance.post('/api/auth/signup', {
                    userID: userId,
                    password: password,
                    displayname: userName,
                    playerID: playerId
                });

                if (res.status === 200) {
                    navigate('/home');
                } else {
                    alert('予期せぬエラー');
                }
            } catch (err) {
                if (err.response?.status === 409) {
                    alert('新規アカウント作成失敗　　時間をあけてもう一度お試しください');
                } else {
                    console.error('サインアップ失敗', err);
                    alert('予期せぬエラー');
                }
            }
        }
    };

    useEffect(() => {
        const fetchPlayerId = async () => {
            let retries = 5;
            while (retries > 0) {
                try {
                    const playerId = window.OneSignal?.User?._currentUser?.onesignalId;
                    // const playerId = '1a71c458-c4fb-49d7-b02e-9d1e901f1ff2'


                    if (playerId) {
                        console.log('✅ Player ID:', playerId);
                        setplayerId(playerId);
                        return;
                    }
                } catch (e) {
                    console.error(`Player ID 取得エラー（残り${retries}回）:`, e);
                }

                await new Promise((r) => setTimeout(r, 1000));
                retries--;
            }
            console.warn('Player ID を取得できませんでした');
        };

        fetchPlayerId();
    }, []);


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
                            onBlur={checkUserIdDuplicate}
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

                    <Box sx={{width: 300}}>
                        <Typography sx={{fontSize: 16, color: '#333', mt: 4}}>
                            ユーザー名
                        </Typography>
                        <TextField
                            fullWidth
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            error={!!userNameError}
                            variant="outlined"
                            sx={{
                                backgroundColor: '#fff',
                                borderRadius: 1,
                                '& .MuiOutlinedInput-root': {
                                    fontSize: 18,
                                    height: 48,
                                },
                            }}
                            placeholder="全角6文字以下で入力"
                        />
                        <Typography
                            sx={{
                                fontSize: 12,
                                mt: '2px',
                                minHeight: '1.5em',
                                color: userNameError ? '#e53935' : 'transparent',
                                backgroundColor: '#fff1f3',
                                pl: 1,
                                borderRadius: 1,
                            }}

                        >
                            {userNameError || '　'}
                        </Typography>
                    </Box>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={security}
                                onChange={(e) => setSecurity(e.target.checked)}
                            />
                        }
                        label="個人情報の取り扱いに同意します"
                    />
                    <Button
                        disabled={!security || !playerId}
                        type="submit"
                        variant="contained"
                        sx={{
                            width: 228,
                            height: 76,
                            borderRadius: '20px',
                            fontSize: 24,
                            backgroundColor: '#DA63A5',
                            justifyContent: 'center',
                        }}
                    >
                        {playerId ? 'アカウント作成' : '情報取得...'}
                    </Button>
                    <SendNotificationButton/>
                </Box>

            </Box>
        </Box>
    );
}

export default Signup;