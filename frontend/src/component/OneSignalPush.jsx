import {useEffect} from 'react';

function OneSignalPush() {
    useEffect(() => {
        window.OneSignalDeferred = window.OneSignalDeferred || [];
        window.OneSignalDeferred.push(async function (OneSignal) {
            await OneSignal.init({
                appId: '05282da3-68ed-47b9-b3c2-1267595c8b09',
                notifyButton: {
                    enable: true, // 通知許可ボタンのUIを表示
                },
                allowLocalhostAsSecureOrigin: true, // ローカル環境でhttps扱いに
            });

            const userId = await OneSignal.getUserId();
            console.log('🔔 OneSignal User ID:', userId);

            const isPushEnabled = await OneSignal.isPushNotificationsEnabled();
            console.log('✅ プッシュ通知許可済み:', isPushEnabled);
        });
    }, []);

    return null;
}

export default OneSignalPush;
