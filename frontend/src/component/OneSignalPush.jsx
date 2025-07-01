import {useEffect} from 'react';

function OneSignalPush() {
    useEffect(() => {
        window.OneSignalDeferred = window.OneSignalDeferred || [];
        window.OneSignalDeferred.push(function (OneSignal) {
            (async () => {
                try {
                    //OneSignal初期化
                    await OneSignal.init({
                        appId: '05282da3-68ed-47b9-b3c2-1267595c8b09',
                        notifyButton: {enable: true},
                        allowLocalhostAsSecureOrigin: true,
                        autoResubscribe: true,
                        promptOptions: {
                            enableWelcomeNotification: false,
                        },
                    });

                    //状態チェック
                    const enabled = await OneSignal.isPushNotificationsEnabled();
                    console.log('🔔 通知許可状態:', enabled);

                    const userId = await OneSignal.getUserId();
                    console.log('🆔 OneSignal User ID:', userId);
                } catch (e) {
                    console.error('❌ OneSignal呼び出し失敗:', e);
                }
            })();
        });
    }, []);

    return null;
}

export default OneSignalPush;
