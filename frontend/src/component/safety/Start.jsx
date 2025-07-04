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
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            {/* ✅ このBoxの構造・スタイルは絶対に変更しない */}
            <Box
                sx={{
                    height: '100vh',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
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
                <Typography
                    sx={{
                        fontSize: 40,
                        lineHeight: '53px',
                        color: '#333333',
                    }}
                >
                    Homet
                </Typography>
            </Box>


            <Box
                sx={{
                    mt: '-300px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 2,
                }}
            >
                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: '#DA63A5',
                        borderRadius: '24px',
                        px: 9,
                        py: 2,
                        fontWeight: 'bold',
                        fontSize: '16px',
                    }}
                    onClick={() => navigate('/login')}
                >
                    ログイン
                </Button>

                <Typography sx={{fontSize: 14, color: '#333333'}} onClick={() => navigate('/signup')}>
                    新規登録
                </Typography>
            </Box>
        </Box>
    );

}

export default Start;