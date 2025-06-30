// import React from 'react';
//
// function Notify() {
//     //通知出す関数
//     async function simpleNotify() {
//         console.log('通知関数が呼ばれました');
//
//         const permission = await Notification.requestPermission();
//
//         //通知許可で判定(ブラウザの)
//         if (permission === 'granted') {
//             //okだったら通知
//             new Notification('Homet', {
//                 body: '褒めてよーーー',
//                 icon: '/icon-192.png',
//                 tag: 'Homet',//何かしらのtagは必要
//                 renotify: true,
//                 requireInteraction: true
//             });
//         } else if (permission === 'denied') {
//             alert('通知が拒否されています。設定から許可にすると通知が届きます');
//         } else {
//             alert('通知が許可されていません（まだ選択されていない状態）');
//         }
//     }
//
//     return (
//         <div>
//             <button onClick={simpleNotify}>通知出す</button>
//         </div>
//     );
// }
//
// export default Notify;