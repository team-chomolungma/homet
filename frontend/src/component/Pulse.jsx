import {motion} from 'framer-motion';
import React from 'react';
import {Box} from '@mui/material';

export default function Pulse() {
    return (
        <Box sx={{
            width: {xs: 135, sm: 164, md: 164},
            height: {xs: 135, sm: 164, md: 164},
        }}>
            <motion.div
                animate={{
                    scale: [1, 1.4, 1],
                    opacity: [1, 0.6, 1],
                }}
                transition={{
                    duration: 1.5,
                    repeat: Infinity,
                }}
                style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(0,255,0,0.2)',
                    // position: 'absolute',
                    zIndex: -1,
                }}
            />
        </Box>
    );
}
