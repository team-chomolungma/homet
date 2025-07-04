import React, {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {Box, Typography} from '@mui/material';

function StartForm() {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/start');
        }, 1000);

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <Box
            sx={{
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',//横中央
                flexDirection: 'column',//縦中央
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
    );
}


export default StartForm
