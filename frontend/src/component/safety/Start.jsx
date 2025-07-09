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
                minHeight: '100vh',
                backgroundColor: '#FFF1F4',
                position: 'relative',
                overflow: 'hidden',
                pt: {xs: '60vh', sm: '65vh'},
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <Box
                sx={{
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 1,
                }}
            >
                <Box
                    component="img"
                    src="/run.png"
                    alt="ホメラニアンの画像"
                    sx={{
                        width: {xs: 140, sm: 180},
                        height: {xs: 140, sm: 180},
                    }}
                />
            </Box>

            <Typography
                sx={{
                    fontSize: {xs: 28, sm: 40},
                    lineHeight: 1.2,
                    color: '#333333',
                    zIndex: 2,
                    mb: 5,
                }}
            >
                Homet
            </Typography>

            <Button
                variant="contained"
                sx={{
                    width: {xs: 140, sm: 156},
                    height: {xs: 60, sm: 76},
                    borderRadius: '20px',
                    fontSize: {xs: 20, sm: 24},
                    backgroundColor: '#DA63A5',
                    textTransform: 'none',
                    zIndex: 2,
                    mb: 5,
                }}
                onClick={() => navigate('/login')}
            >
                ログイン
            </Button>

            <Typography
                sx={{
                    fontSize: {xs: 18, sm: 24},
                    color: '#333333',
                    cursor: 'pointer',
                }}
                onClick={() => navigate('/signup')}
            >
                新規登録
            </Typography>
        </Box>

    );


}

export default Start;