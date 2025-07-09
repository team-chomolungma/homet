import React, {useState} from 'react';
import {Box, Button, useMediaQuery, Typography, Container} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import AnchorTemporaryDrawer from './AnchorTemporaryDrawer.jsx';
import NavigationBar from './NavigationBar.jsx';
import HomeGraph from './HomeGraph.jsx';
import CustomButton from './CustomButton.jsx';

function Home() {
    const navigate = useNavigate();
    const [reloadKey, setReloadKey] = useState(0);
    const isLargeXs = useMediaQuery('(min-width:390px)');

    const handleClick = () => {
        setReloadKey((k) => k + 1);
    };

    return (
        <>
            <Box
                sx={{
                    minHeight: '100vh',
                    height: '100vh',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    overflow: 'hidden',
                    backgroundColor: '#FFF1F4',
                    position: 'relative',
                }}
            >
                {/* Drawer */}
                <Box
                    sx={{
                        position: 'fixed',
                        top: '20px',
                        right: '5px',
                        zIndex: 9999,
                    }}
                >
                    <AnchorTemporaryDrawer/>
                </Box>

                {/* 背景画像+Network */}
                <Box
                    sx={{
                        position: 'relative',
                        overflow: 'hidden',
                        width: '100%',
                    }}
                >
                    <Container sx={{
                        position: 'absolute',
                        width: 1,
                        textAlign: 'center',
                        marginTop: '10%',
                        marginBottom: '5%'
                    }}>
                        <Typography sx={{
                            color: '#333333',
                            fontSize: {xs: 20, sm: 24, md: 28},
                        }}
                        >つながり</Typography>
                    </Container>
                    <Box
                        component="img"
                        src="/ホメット星.png"
                        alt="背景画像1"
                        sx={{
                            width: '100%',
                            height: '50vh',
                            objectFit: 'cover',
                            objectPosition: 'top center',
                            display: 'block',
                            margin: '0 auto',
                        }}
                        onClick={handleClick}
                    />

                    <Box
                        sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%', // 親と同じ幅
                            height: '100%', // 親と同じ高さ（auto じゃなく、親の実サイズ）
                            pointerEvents: 'none', // 画像クリックを邪魔しない
                            zIndex: 10,
                            // mt: '10vh',
                            mt: isLargeXs ? '7vh' : '10vh'
                        }}
                    >
                        <HomeGraph key={reloadKey}/>
                    </Box>
                </Box>

                {/* 背景画像2（適切な最大幅＋中央寄せ） */}
                <Box
                    component="img"
                    src="/home%20homeraniann.png"
                    alt="背景画像2"
                    sx={{
                        width: {xs: '100%', sm: '80%'},
                        maxWidth: {xs: '300px', sm: '500px'},

                        height: '30vh',

                        objectFit: 'contain',
                        objectPosition: 'top center',

                        mb: isLargeXs ? 2 : 4

                    }}
                />

                <Box
                    sx={{
                        position: 'absolute',
                        top: {xs: '80vh', sm: '81vh', md: '82vh',},
                        //zIndex: 20,
                        width: {xs: '120px', sm: '142px'}
                    }}
                >
                    <CustomButton
                        sx={{
                            width: {xs: '120px', sm: '142px'},
                        }}
                        onClick={() => navigate('/friendlist')}
                    >
                        ホメット
                    </CustomButton>
                </Box>


                <NavigationBar
                    sx={{
                        pt: 10,
                    }}
                />
            </Box>
        </>
    );
}

export default Home;
