import {AnimatePresence, motion} from 'framer-motion';
import React from 'react';
import kimeranian from '../../public/homeranian/kimeranian.png'
import {Box} from '@mui/material';
import {useNavigate} from 'react-router-dom';

export default function ZoomDog() {
    const navigate = useNavigate();
    setTimeout(() => {
        navigate('/home')
    }, 2000)
    return (

        <AnimatePresence>
            <Box display="flex" // レイアウトモード
                 flexDirection="column" // 縦並び
                 alignItems="center" // 横中央揃え
                 justifyContent="center" // 縦中央揃え
            >
                <motion.div

                    initial={{
                        position: 'fixed',
                        y: '45vh',
                        bottom: 0,
                        zIndex: 100
                    }}
                    animate={{
                        scale: [1, 0.3],
                        y: '20vh',
                    }}
                    transition={{duration: 2, delay: 0.5}}
                >
                    <Box sx={{
                        width: {xs: 700, sm: 800, md: 900},
                        height: {xs: 700, sm: 800, md: 900}
                    }}>
                        <img
                            style={{height: '100%', width: '100%'}}
                            src={kimeranian}
                            alt="kimeranian"
                        />
                    </Box>
                </motion.div>
            </Box>


        </AnimatePresence>
    );
}
