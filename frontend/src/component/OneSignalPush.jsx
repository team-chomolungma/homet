import {useEffect, useState} from 'react';

function OneSignalPush() {
    const [enabled, setEnabled] = useState(null);
    const [userId, setUserId] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        window.OneSignalDeferred = window.OneSignalDeferred || [];
        window.OneSignalDeferred.push(function (OneSignal) {
            (async () => {
                try {
                    if (!window.OneSignalInitialized) {
                        await OneSignal.init({
                            appId: '05282da3-68ed-47b9-b3c2-1267595c8b09',
                            notifyButton: {enable: true},
                            allowLocalhostAsSecureOrigin: true,
                            autoResubscribe: true,
                            promptOptions: {
                                enableWelcomeNotification: false,
                            },
                        });
                        window.OneSignalInitialized = true;
                    }

                    // 初期取得
                    const isEnabled = await OneSignal.isPushNotificationsEnabled();
                    const uid = await OneSignal.getUserId();
                    setEnabled(isEnabled);
                    setUserId(uid);

                    // 状態変化のリスナー追加
                    OneSignal.on('notificationPermissionChange', async () => {
                        const updated = await OneSignal.isPushNotificationsEnabled();
                        setEnabled(updated);
                    });

                } catch (e) {
                    console.error('❌ OneSignal呼び出し失敗:', e);
                    setError(e.message || 'Unknown error');
                }
            })();
        });
    }, []);

    return (
        <div style={{padding: '1rem', backgroundColor: '#eee', fontFamily: 'monospace'}}>
            <div>通知許可状態: {enabled === null ? '読み込み中...' : enabled ? '✅ 許可済み' : '❌ 未許可'}</div>
            <div>User ID: {userId || '未取得'}</div>
            {error && <div style={{color: 'red'}}>エラー: {error}</div>}
        </div>
    );
}

export default OneSignalPush;
