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
        console.log('🔵 アカウント作成ボタン押下');

        let hasError = false;

        if (!playerId) {
            alert('OneSignalの初期化中です。少し待ってからもう一度お試しください。');
            console.warn('⛔ playerId が null。OneSignal未初期化');
            return;
        }
        console.log('2');

        if (!userId.trim()) {
            setUserIdError('ユーザーIDを入力してください');
            hasError = true;
        } else {
            setUserIdError('');
        }
        console.log('3');

        if (!password.trim()) {
            setPasswordError('パスワードを入力してください');
            hasError = true;
        } else if (!/^[a-zA-Z0-9]{6}$/.test(password)) {
            setPasswordError('6文字の英数字で入力してください');
            hasError = true;
        } else {
            setPasswordError('');
        }

        console.log('4');
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
        console.log('5');

        if (!security) {
            console.warn('⛔ 同意チェックがされていません');
            return;
        }
        console.log('6');

        if (hasError) {
            console.warn('⛔ バリデーションエラーあり');
            return;
        }
        console.log('7');

        try {
            console.log('✅ サインアップリクエスト送信中...');
            const res = await axiosInstance.post('/api/auth/signup', {
                userID: userId,
                displayname: userName,
                password: password,
                playerID: playerId
            });

            console.log('🟢 サーバーからのレスポンス:', res);
            if (res.status === 201) {
                console.log('🟢成功');
                const {userID, displayname,token} = res.data;
                localStorage.setItem('SESSION_TOKEN',token);
                navigate('/start-animation');
            } else {
                alert(`予期せぬエラーが発生しました（status: ${res.status}）`);
            }
        } catch (err) {
            console.error('❌ サインアップ通信失敗:', err);

            const status = err.response?.status;
            if (status === 409) {
                alert('このユーザーIDはすでに使われています');
            } else if (status) {
                alert(`サーバーエラー（${status}）が発生しました`);
            } else {
                alert('ネットワークまたは予期せぬエラーが発生しました');
            }
        }
    };

    useEffect(() => {
        let retryCount = 0;
        const maxRetries = 5;//とりま５回
        const interval = 1000;

        const intervalId = setInterval(() => {
            const playerId = window.OneSignal?.User?._currentUser?.onesignalId;
            console.log('✅ OneSignal ID:', playerId);

            if (playerId) {
                setplayerId(playerId);
                clearInterval(intervalId);
            }

            retryCount++;
            if (retryCount >= maxRetries) {
                console.warn('⚠️ OneSignal ID取得リトライ終了');
                clearInterval(intervalId);
            }
        }, interval);

        return () => clearInterval(intervalId); // クリーンアップ
    }, []);

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                px: 2,
                position: 'relative',
                backgroundColor: '#FFF1F4',
            }}
        >
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

            <Box
                sx={{
                    width: '100%',
                    maxWidth: 400,
                    px: 2,
                }}
            >
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
                    {/* タイトル */}
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

                    {/* ===== ユーザーID ===== */}
                    <Box sx={{width: '80%', maxWidth: 300}}>
                        <Typography sx={{fontSize: 14, mb: 0.5}}>ユーザーID</Typography>
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

                    {/* ===== パスワード ===== */}
                    <Box sx={{width: '80%', maxWidth: 300}}>
                        <Typography sx={{fontSize: 14, mt: 2, mb: 0.5}}>パスワード</Typography>
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

                    {/* ===== ユーザー名 ===== */}
                    <Box sx={{width: '80%', maxWidth: 300}}>
                        <Typography sx={{fontSize: 14, mt: 2, mb: 0.5}}>ユーザー名</Typography>
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
                                    fontSize: 16,
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
                                backgroundColor: userNameError ? '#fff1f3' : 'transparent',
                                pl: 1,
                                borderRadius: 1,
                            }}
                        >
                            {userNameError || '　'}
                        </Typography>
                    </Box>

                    {/* ===== 注意書き + チェック ===== */}
                    <Box sx={{width: '80%', maxWidth: 300, mt: 1, mb: 1}}>
                        <Typography
                            variant="body2"
                            sx={{
                                fontSize: 12,
                                mb: 1,
                                color: '#666',
                                lineHeight: 1.4,
                            }}
                        >
                            ユーザー名にはニックネームなど、<br/>
                            個人を特定できない情報を使用ください
                        </Typography>

                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={security}
                                    onChange={(e) => setSecurity(e.target.checked)}
                                />
                            }
                            label="個人情報の取り扱いに同意します"
                        />
                    </Box>

                    {/* ===== 送信ボタン ===== */}
                    <Button
                        disabled={!security || !playerId}
                        type="submit"
                        variant="contained"
                        sx={{
                            width: {xs: 200, sm: 228},
                            height: 64,
                            borderRadius: '20px',
                            fontSize: 20,
                            backgroundColor: '#DA63A5',
                            justifyContent: 'center',
                            textTransform: 'none',
                        }}
                    >
                        {playerId ? 'アカウント作成' : '情報取得中...'}
                    </Button>
                </Box>
            </Box>
        </Box>


    );
}

export default Signup;