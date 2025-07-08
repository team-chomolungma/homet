import axios from 'axios';
import React, {forwardRef, useImperativeHandle} from 'react';

const SendNotificationButton = forwardRef(({targetPlayerId}, ref) => {
    const sendNotification = async () => {
        const restApiKey = 'os_v2_app_auuc3i3i5vd3tm6ccjtvsxelbfndbus3bgzunnmscru63y6teypfumubtdhck7zzfo3z4dqs2xp5uqd7w3k4g3kdecjkzn5nwoicwwy'; // ←安全な場所に保管するべき
        const appId = '05282da3-68ed-47b9-b3c2-1267595c8b09';
        // const targetPlayerId = 'd92cb065-0f5f-4dda-8732-1893845573b6'; // ← Subscription ID に変更
        //プライベート
        // 1ea93d84-e3f8-4c0e-a4e0-1418d09aa9a2
        //会社携帯
        // 8187ac7c-b29d-4f13-a69d-ce4678ec3663
        try {
            const response = await axios.post(
                'https://onesignal.com/api/v1/notifications',
                {
                    app_id: appId,
                    include_player_ids: targetPlayerId,
                    headings: {en: '📢 お知らせ'},
                    contents: {en: '通知が届きました！'},
                    url: 'https://homet-frontend-699a294558eb.herokuapp.com/', // 通知をタップしたときのURL
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
//         const restApiKey = 'os_v2_app_auuc3i3i5vd3tm6ccjtvsxelbfndbus3bgzunnmscru63y6teypfumubtdhck7zzfo3z4dqs2xp5uqd7w3k4g3kdecjkzn5nwoicwwy'; // ←安全な場所に保管するべき
//         const appId = '05282da3-68ed-47b9-b3c2-1267595c8b09';
//         const targetPlayerId = [
//             '0fa068ed-edf9-494f-81b6-dbd27d11f8d5',
//             '69454c49-9fdb-48b3-8dd6-aa3abbd3a4a3',
//             '771a5842-c933-4bdd-b6e8-90a0f8569992',
//         ];  // ← Subscription ID に変更
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

