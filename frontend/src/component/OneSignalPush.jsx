import {useEffect} from 'react';

function OneSignalPush() {
    useEffect(() => {
        // OneSignal初期化（windowオブジェクト経由）
        window.OneSignalDeferred = window.OneSignalDeferred || [];
        window.OneSignalDeferred.push(function (OneSignal) {
            OneSignal.init({
                appId: 'あなたのApp ID',
                notifyButton: {
                    enable: true // 通知ボタンをON（任意）
                },
            });
        });
    }, []);

    return null; // UI不要
}

export default OneSignalPush;