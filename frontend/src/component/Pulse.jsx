import {motion} from 'framer-motion';
import React from 'react';

export default function Pulse() {
    return (
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
                width: 160,
                height: 160,
                borderRadius: '50%',
                backgroundColor: 'rgba(0,255,0,0.2)',
                // position: 'absolute',
                zIndex: -1,
            }}
        />
    );
}
