import React from 'react';
import axios from 'axios';

const SendNotificationButton = () => {
    const sendNotification = async () => {
        const restApiKey = 'os_v2_app_auuc3i3i5vd3tm6ccjtvsxelbfycyu6hdxjuzymgf6ecqhfusahyxwu54vz43y3hrut6ybn3dltid2vmme6o2dlptoam4xwinb2xjkq'; // ←安全な場所に保管するべき
        const appId = '05282da3-68ed-47b9-b3c2-1267595c8b09';
        const targetPlayerId = 'f64849bb-08fe-4407-a2f3-b7ce32dec667'; // ←対象ユーザーID（ダッシュボードで確認）

        try {
            const response = await axios.post(
                'https://onesignal.com/api/v1/notifications',
                {
                    app_id: appId,
                    include_player_ids: [targetPlayerId],
                    headings: {en: '📢 お知らせ'},
                    contents: {en: '通知が届きました！'},
                    url: 'https://homet-frontend-699a294558eb.herokuapp.com/', // 通知をタップしたときのURL
                },
                {
                    headers: {
                        Authorization: `Basic ${restApiKey}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            alert('通知を送信しました');
            console.log('✅ 通知レスポンス', response.data);
        } catch (error) {
            alert('通知送信に失敗しました');
            console.error('❌ 通知エラー', error);
        }
    };

    return <button onClick={sendNotification}>📨 通知を送る</button>;
};

export default SendNotificationButton;
