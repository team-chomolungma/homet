import React, {useState} from 'react';
import {
    Box,
    Button,
    IconButton,
    TextField,
    Typography,
    InputAdornment
} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import Login from './Login.jsx';

function Start() {
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                height: '100vh',
                position: 'relative',
            }}
        >
            {/* ✅ 画像だけ中央に配置 */}
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                }}
            >
                <Box
                    component="img"
                    src="/run.png"
                    alt="ホメラニアンの画像"
                    sx={{
                        width: 180,
                        height: 180,
                    }}
                />
            </Box>

            {/* ✅ ボタン群を画像の下に一定距離で配置 */}
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, 0)', // 画像と中央を基準にY方向のみズラす
                    mt: 10, // ← 画像からの距離（px単位）
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 5,
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

                <Button
                    variant="contained"
                    sx={{
                        width: 156,
                        height: 76,
                        borderRadius: '20px',
                        fontSize: 24,
                        backgroundColor: '#DA63A5',
                    }}
                    onClick={() => navigate('/login')}
                >
                    ログイン
                </Button>

                <Typography
                    sx={{fontSize: 24, color: '#333333', cursor: 'pointer'}}
                    onClick={() => navigate('/signup')}
                >
                    新規登録
                </Typography>
            </Box>
        </Box>
    );


}

export default Start;