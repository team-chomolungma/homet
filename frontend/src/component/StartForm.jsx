import React, {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {Box, Button, Typography} from '@mui/material';

export default function StartForm() {
    const navigate = useNavigate();

    useEffect(() => {
        // const timer = setTimeout(() => {
        //         navigate('/login');
        //     },
        //     1000);
        //
        // // クリーンアップ関数でタイマー解除
        // return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <Box
            sx={{
                height: '100vh',
            }}
        >
            <Box
                component="img"
                src="/run.png"
                alt="Homet logo"
                sx={{
                    width: 180,
                    height: 180,
                    // objectFit: 'contain',
                }}
            />
            <Typography
                sx={{
                    fontSize: 48,
                    lineHeight: '54px',
                    color: '#333333',
                }}
            >
                Homet
            </Typography>
        </Box>
    );
}