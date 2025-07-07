import React, {useEffect, useRef} from 'react';
import Graph from 'graphology';
import Sigma from 'sigma';
import {
    Box,
    Button
} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import AnchorTemporaryDrawer from './AnchorTemporaryDrawer.jsx';
import NavigationBar from './NavigationBar.jsx';
import axiosInstance from '../lib/axios.js';

function Home() {
    const navigate = useNavigate();
    const containerRef = useRef(null);
    const rendererRef = useRef(null); // ✅ 追加

    const fetchFriends = async () => {
        const graph = new Graph();

        graph.addNode('me', {
            label: '',
            x: 0,
            y: 0,
            size: 40,
            color: 'rgba(0,0,0,0)',
        });

        try {
            const res = await axiosInstance.get('/api/connection');
            const resFriendsArray = res.data;

            const sorted = [...resFriendsArray].sort((a, b) => new Date(b.last_sent) - new Date(a.last_sent));
            const friendsArray = sorted.slice(0, 5);

            const maxIntimacy = Math.max(...friendsArray.map(f => f.sent_count + f.received_count));

            friendsArray.forEach((friend, index) => {
                const total = friend.sent_count + friend.received_count + 10;
                const intimacyRatio = 1 - total / maxIntimacy;
                const baseRadius = 0.5;
                const maxRadius = 1;
                const radius = baseRadius + intimacyRatio * (maxRadius - baseRadius);
                const angle = (2 * Math.PI * index) / friendsArray.length;
                const x = radius * Math.cos(angle);
                const y = radius * Math.sin(angle);

                graph.addNode(`friend-${friend.id}`, {
                    label: friend.displayname,
                    x,
                    y,
                    size: Math.max(40, total),
                    color: '#D8F3DC',
                });
            });

            if (rendererRef.current) {
                rendererRef.current.kill();
            }

            const renderer = new Sigma(graph, containerRef.current);
            renderer.getCamera().setState({
                x: 0,
                y: 0.2,
                ratio: 2.6,
            });
            rendererRef.current = renderer;

        } catch (err) {
            console.error('API取得エラー:', err);
        }
    };

    useEffect(() => {
        fetchFriends(); // 初回表示

        return () => {
            if (rendererRef.current) {
                rendererRef.current.kill();
            }
        };
    }, []);
    
    return (
        <Box
            sx={{
                position: 'relative',
                width: '100%',
                height: '100vh',
                overflow: 'hidden',
            }}
        >
            {/* Drawer固定 */}
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

            {/* メイン表示エリア */}
            <Box sx={{position: 'relative', zIndex: 1, lineHeight: 0}}>
                {/* 背景画像1 */}
                <Box
                    component="img"
                    src="/ホメット星.png"
                    alt="背景画像1"
                    sx={{
                        display: 'block',
                        width: '100%',
                        height: 'auto',
                        margin: 0,
                        padding: 0,
                    }}
                />
                <Box
                    component="img"
                    src="/home%20homeraniann.png"
                    alt="背景画像2"
                    sx={{
                        display: 'block',
                        width: '90%',
                        height: 'auto',
                        margin: 0,
                        padding: 0,
                    }}
                />

                {/* グラフ */}
                <Box
                    ref={containerRef}
                    onClick={fetchFriends}
                    sx={{
                        position: 'absolute',
                        top: '8px',
                        left: '50%',
                        transform: 'translateX(-61%)',
                        width: '900px',
                        height: '500px',
                        zIndex: 10,
                        pointerEvents: 'auto',
                    }}
                />


            </Box>

            <Button
                variant="contained"
                sx={{
                    position: 'absolute',
                    bottom: '100px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    backgroundColor: '#DA63A5',
                    borderRadius: '24px',
                    width: '142px',
                    height: '67px',
                    fontWeight: 'bold',
                    fontSize: '24px',
                    textTransform: 'none',
                    zIndex: 20,
                }}
                onClick={() => navigate('/friendlist')}
            >
                ホメット
            </Button>

            {/* ナビゲーションバー */}
            <NavigationBar/>
        </Box>
    );

}

export default Home;
