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
        </Box>
            
    );
}


export default StartForm
