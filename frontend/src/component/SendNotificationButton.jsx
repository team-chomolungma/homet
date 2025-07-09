import axios from 'axios';
import React, {forwardRef, useImperativeHandle} from 'react';

const SendNotificationButton = forwardRef(({targetPlayerId}, ref) => {
    const sendNotification = async () => {
        const restApiKey = import.meta.env.VITE_ONESIGNAL_API_KEY; // ←安全な場所に保管するべき
        const appId = '05282da3-68ed-47b9-b3c2-1267595c8b09';
        try {
            const response = await axios.post(
                'https://onesignal.com/api/v1/notifications',
                {
                    app_id: appId,
                    include_player_ids: targetPlayerId,
                    headings: {en: '📢 通知が届きました!'},
                    contents: {en: 'さっそくホメットを確認してみよう！'},
                    url: 'https://homet-frontend-699a294558eb.herokuapp.com/timeline', // 通知をタップしたときのURL
                    priority: 10, // Android用優先度（即時通知）
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
    useImperativeHandle(ref, () => ({
        sendNotification,
    }));

    return null; // 表示はしない
})

export default SendNotificationButton;


// import React from 'react';
// import axios from 'axios';
//
// const SendNotificationButton = () => {
//     const sendNotification = async () => {
//         const appId = '05282da3-68ed-47b9-b3c2-1267595c8b09';
//         try {
//             const response = await axios.post(
//                 'https://onesignal.com/api/v1/notifications',
//                 {
//                     app_id: appId,
//                     include_player_ids: targetPlayerId,
//                     headings: {en: '📢 お知らせ'},
//                     contents: {en: '通知が届きました！'},
//                     url: 'https://homet-onesignal-test-6a11abc942d3.herokuapp.com/', // 通知をタップしたときのURL
//                 },
//                 {
//                     headers: {
//                         Authorization: `Basic ${restApiKey}`,
//                         'Content-Type': 'application/json',
//                     },
//                 }
//             );
//             alert('通知を送信しました');
//             console.log('✅ 通知レスポンス', response.data);
//         } catch (error) {
//             alert('通知送信に失敗しました');
//             console.error('❌ 通知エラー', error);
//         }
//     };
//
//     return <button onClick={sendNotification}>📨 通知を送る</button>;
// };
//
// export default SendNotificationButton;

