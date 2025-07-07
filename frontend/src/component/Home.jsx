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
                minHeight: '100vh',
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

            {/* 背景画像1 */}
            <Box
                component="img"
                src="/ホメット星.png"
                alt="背景画像1"
                sx={{
                    width: '100%',
                    height: 'auto',
                    objectFit: 'cover',
                }}
            />

            {/* 背景画像2（適切な最大幅＋中央寄せ） */}
            <Box
                component="img"
                src="/home%20homeraniann.png"
                alt="背景画像2"
                sx={{
                    width: '80%',
                    maxWidth: '500px',
                    height: '80%',
                    objectFit: 'contain',
                    mb: 2,
                }}
            />

            {/* グラフ */}
            <Box
                ref={containerRef}
                onClick={fetchFriends}
                sx={{
                    width: '100%',
                    maxWidth: '600px',
                    height: '300px',
                    zIndex: 10,
                    mb: 4,
                }}
            />

            {/* ホメットボタン（画面に収まるサイズに） */}
            <Button
                variant="contained"
                sx={{
                    backgroundColor: '#DA63A5',
                    borderRadius: '24px',
                    width: '200px',
                    height: '56px',
                    fontWeight: 'bold',
                    fontSize: '20px',
                    textTransform: 'none',
                    mb: 8,
                }}
                onClick={() => navigate('/friendlist')}
            >
                ホメット
            </Button>

            {/* ナビゲーションバー */}
            <Box
                sx={{
                    position: 'fixed',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    zIndex: 999,
                }}
            >
                <NavigationBar/>
            </Box>
        </Box>
    );


}

export default Home;
