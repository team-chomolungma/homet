import hohoemian from '../../../public/homeranian/hohoemian.png';
import whiteCircle from '../../../public/whiteCircle.png';
import speechBubbleAfterSending from '../../../public/speechBubble/afterSending.png';
import {Box, Button, Container} from '@mui/material';
import NavigationBar from '../NavigationBar.jsx';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import {useNavigate} from 'react-router-dom';
import React from 'react';
import CustomButton from '../CustomButton.jsx';


const AudioSendAfter = () => {
    const navigate = useNavigate();


    return (
        <>
            <Container sx={{position: 'relative'}}>
                <ArrowBackIosNewIcon sx={{
                    height: 24, width: 24, color: '#333333', top: 20, position: 'absolute'
                }} onClick={() => navigate(-1)}
                />
                <Box
                    display="flex"//レイアウトモード
                    flexDirection="column"//縦並び
                    alignItems="center"//横中央揃え
                    justifyContent="center"//縦中央揃え
                    minHeight="100vh" // 画面縦いっぱい中央揃えしたい場合。外したら上に揃える
                >
                    <img
                        src={speechBubbleAfterSending}
                        alt="speechBubbleAfterSending"
                    />
                    <Box sx={{
                        position: 'relative',
                    }}>

                        <img
                            src={hohoemian}
                            style={{
                                height: 300,
                                width: 300,
                                position: 'absolute',
                            }}
                            alt="hohoemian"
                        />
                        <img
                            src={whiteCircle}
                            style={{
                                height: 283,
                                width: 283,
                            }}
                            alt="white circle"
                        />
                    </Box>
                    <Box sx={{width: {xs: '121px', sm: '156px', md: '156px', fontFamily: '"Rounded Mplus 1c"',}}}>
                        <CustomButton
                            onClick={() => navigate('/home')}
                        >ホームへ</CustomButton>
                    </Box>
                </Box>

            </Container>
            <NavigationBar/>
        </>

    );
};

export default AudioSendAfter;
