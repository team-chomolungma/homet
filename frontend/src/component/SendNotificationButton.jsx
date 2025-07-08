import React from 'react';
import axios from 'axios';

const SendNotificationButton = () => {
    const sendNotification = async () => {
        const restApiKey = 'os_v2_app_auuc3i3i5vd3tm6ccjtvsxelbfndbus3bgzunnmscru63y6teypfumubtdhck7zzfo3z4dqs2xp5uqd7w3k4g3kdecjkzn5nwoicwwy'; // ←安全な場所に保管するべき
        const appId = '05282da3-68ed-47b9-b3c2-1267595c8b09';
        const targetPlayerId = [
            '0fa068ed-edf9-494f-81b6-dbd27d11f8d5',
            '69454c49-9fdb-48b3-8dd6-aa3abbd3a4a3',
            '771a5842-c933-4bdd-b6e8-90a0f8569992',
        ];  // ← Subscription ID に変更
        try {
            const response = await axios.post(
                'https://onesignal.com/api/v1/notifications',
                {
                    app_id: appId,
                    include_player_ids: targetPlayerId,
                    headings: {en: '📢 お知らせ'},
                    contents: {en: '通知が届きました！'},
                    url: 'https://homet-onesignal-test-6a11abc942d3.herokuapp.com/', // 通知をタップしたときのURL
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
