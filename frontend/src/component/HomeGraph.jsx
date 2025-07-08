import React, { useRef, useEffect, useState } from 'react';
import { useTheme,useMediaQuery } from '@mui/material';
import ForceGraph2D from 'react-force-graph-2d';
import { forceManyBody, forceLink, forceCenter, forceCollide } from 'd3-force';
import axiosInstance from '../lib/axios';

export default function HomeGraph() {
  const fgRef = useRef();
  const [data, setData] = useState({ nodes: [], links: [] });
  const isLargeXs = useMediaQuery('(min-width:400px)');
  const graphHeight = isLargeXs ? 350 :250

  useEffect(() => {
    (async () => {
      const res = await axiosInstance.get('/api/connection');
      const resFriendsArray = res.data.result;

      if(resFriendsArray.length===0){
        return null
      }
      // 最後に送信した人を抽出し、それ以外でランダム4人を抽出する
      const lastSender = resFriendsArray
        .slice() // 元配列は汚さない
        .sort((a, b) => new Date(b.last_sent) - new Date(a.last_sent))[0];

      const others = resFriendsArray.filter((f) => f.id !== lastSender.id);
      const randomFour = others.sort(() => Math.random() - 0.5).slice(0, 4);
      const friendsArray = [...randomFour, lastSender];
      
      const nodes = [
        // meは完全に消したいのでここでは入れないか、size=0にしてもOK
        { id: 'me', name: 'me', size: 0 },
        ...friendsArray.map((f, i) => ({
          id: f.id,
          name: f.displayname,
          size: 14,
          color: f.id === lastSender.id ? '#A0E3AA' : '#D8F3DC',
        })),
      ];
      const links = friendsArray.map((f) => ({ source: 'me', target: f.id }));

      setData({ nodes, links });
    })();
  }, []);

  useEffect(() => {
    if (!fgRef.current) return;

    // 反発力（マイナスにすると離れる）
    fgRef.current.d3Force('charge', forceManyBody().strength(-50));
    // ノード同士を衝突しないようにする（forceCollide）
    fgRef.current.d3Force(
      'collision',
      forceCollide()
        .radius((d) => d.size + 5)
        .strength(1)
    );
    // リンク距離（ピクセル単位、長いほど離れる）
    fgRef.current.d3Force('link', forceLink().distance(30));

    fgRef.current.d3Force('center', forceCenter());

    fgRef.current.d3ReheatSimulation();
  }, [data]);
  return (
    <div style={{ width: '100%', height: '300px', position: 'relative' }}>
      <ForceGraph2D
        ref={fgRef}
        graphData={data}

        // エッジを完全非表示
        linkWidth={() => 0}
        linkColor={() => 'rgba(0,0,0,0)'}
        linkDirectionalParticles={0}
        enableLinkInteraction={false}

        // グラフのサイズを決める
        // Nodeはこのheight内に収まる
        style={{ width: '100%', height: graphHeight }}
        width={window.innerWidth}
        height={graphHeight}

        nodeCanvasObject={(node, ctx, globalScale) => {
          if (!node.size) return; // size=0なら描画しない

          // 円を描く
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.size, 0, 2 * Math.PI, false);
          ctx.fillStyle =  node.color;
          ctx.fill();

          // ラベル
          const fontSize = 12 / globalScale;
          ctx.font = `${fontSize}px Sans-Serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillStyle = '#000';
          ctx.fillText(node.name, node.x, node.y);
        }}
        // Canvas内ラベルは使わないので無効化
        nodeLabel={null}
      />
    </div>
  );
}
