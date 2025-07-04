import React, {useEffect, useRef} from 'react';
import Graph from 'graphology';
import Sigma from 'sigma';
import {
    Box,
    Button,
    IconButton,
    TextField,
    Typography,
    InputAdornment
} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import AnchorTemporaryDrawer from './AnchorTemporaryDrawer.jsx';


function Home() {
    const navigate = useNavigate();
    const containerRef = useRef(null);

    useEffect(() => {
        //グラフ初期化
        const graph = new Graph();

        //中心にわたし
        graph.addNode('me', {
            label: '',
            x: 0,
            y: 0,
            size: 40,
            // color: '#FFBBB1', // 円を透明にする
            color: 'rgba(0,0,0,0)', // 完全に透明にする
        });


        //仮データ(エンドポイント叩いて帰ってきたと想定しています なおんちゅが作ってくれたfigma参照)
        const friends = [
            {
                user_id: 1,
                displayname: 'なおんちゅ',
                sent_count: 20,
                received_count: 2,
            },
            {
                user_id: 2,
                displayname: 'きとーちゃん',
                sent_count: 15,
                received_count: 3,
            },
            {
                user_id: 3,
                displayname: 'うらちゃん',
                sent_count: 12,
                received_count: 3,
            },
            {
                user_id: 4,
                displayname: 'もちちゃん',
                sent_count: 5,
                received_count: 2,
            },
            {
                user_id: 5,
                displayname: 'ハニー🐈',
                sent_count: 3,
                received_count: 2,
            },
        ];

        //
        const maxIntimacy = Math.max(...friends.map(f => f.sent_count + f.received_count));

        friends.forEach((friend, index) => {
            const total = friend.sent_count + friend.received_count + 10;
            const intimacyRatio = 1 - total / maxIntimacy;

            const baseRadius = 0.1; // 最も親密
            const maxRadius = 0.2;  // 疎遠
            const radius = baseRadius + intimacyRatio * (maxRadius - baseRadius);

            const angle = (2 * Math.PI * index) / friends.length;
            const x = radius * Math.cos(angle);
            const y = radius * Math.sin(angle);

            //デフォルトはこれ
            let color = '#D8F3DC';
            //総合受信数で色を変化したい時
            // if (total >= 12) {
            //     color = '#FF1E00'; // 濃い赤
            // } else if (total >= 9) {
            //     color = '#FF5733'; // 赤オレンジ
            // } else if (total >= 6) {
            //     color = '#FF9900'; // オレンジ
            // } else if (total >= 3) {
            //     color = '#FFD700'; // 黄
            // } else {
            //     color = '#A0E7E5'; // 水色系
            // }
            //ここでグラフに追加
            graph.addNode(`friend-${friend.user_id}`, {
                label: friend.displayname,
                x,
                y,
                size: Math.max(40, total),
                color,
            });
            //線
            // graph.addEdge('me', `friend-${friend.user_id}`);
        });
        //ここでref={containerRef}に表示
        const renderer = new Sigma(graph, containerRef.current);
        renderer.getCamera().setState({
            x: 0,
            y: 0.2,
            ratio: 2.0, // 小さくするとズームイン
        });
        //これはお決まりらしい
        return () => renderer.kill();
    }, []);

    return (
        <Box sx={{
            position: 'relative',
            width: '100%',
            height: '100vh', // ← 画面全体に固定
            overflow: 'hidden', // ← スクロール防止
        }}>
            <Box
                sx={{
                    position: 'fixed',
                    top: '20px',
                    right: '5px',
                    // left: '340px',
                    zIndex: 9999, // ← どの要素よりも上に
                }}
            >
                <AnchorTemporaryDrawer/>
            </Box>

            <Box>
                {/* ここから下は元のまま */}
                <div style={{position: 'relative', width: '100%', maxWidth: '800px', height: '600px'}}>
                    <img
                        src="/planet.png"
                        alt="Love画像"
                        style={{
                            display: 'block',
                            margin: '60px auto 0',
                            width: '100%',
                            height: 'auto',
                        }}
                    />

                    <div
                        ref={containerRef}
                        onClick={() => {
                            console.log('グラフ領域がクリックされた！');
                        }}
                        style={{
                            position: 'absolute',
                            top: '70px',
                            left: '50%',
                            transform: 'translateX(-66%)',
                            width: '900px',
                            height: '500px',
                            zIndex: 0,
                            // pointerEvents: 'none', //操作不可能
                            pointerEvents: 'auto', //操作可能に
                        }}
                    />
                </div>

                <Button
                    variant="contained"
                    sx={{
                        position: 'absolute',
                        bottom: '100px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        backgroundColor: '#DA63A5',
                        borderRadius: '24px',
                        px: 0,
                        py: 0,
                        width: '142px',
                        height: '67px',
                        fontWeight: 'bold',
                        fontSize: '24px',
                        textTransform: 'none',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                    onClick={() => navigate('/voice')}
                >
                    ホメット
                </Button>
            </Box>
        </Box>
    );

}

export default Home;
