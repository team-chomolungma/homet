import React from 'react';

function RequestPush() {
    const handleClick = () => {
        if (window.OneSignal && typeof window.OneSignal.showSlidedownPrompt === 'function') {
            window.OneSignal.showSlidedownPrompt();
        } else {
            console.warn('OneSignalがまだ初期化されていません');
            alert('通知機能の準備中です。少し待ってから再度お試しください。');
        }

    };

    return <button onClick={handleClick}>🙇通知を許可する🙇</button>;
}

export default RequestPush;