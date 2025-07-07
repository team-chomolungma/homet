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

                    OneSignal.getUserId().then(function (userId) {
                        console.log('✅ OneSignal ID:', userId);
                        setUserId(userId);
                    });

                    OneSignal.on('notificationPermissionChange', async () => {
                        const updated = await OneSignal.isPushNotificationsEnabled?.();
                        setEnabled(updated);
                    });
                } catch (e) {
                    setError(e.message || 'Unknown error');
                }
            })();
        });
    }, []);

    return null;
}

export default OneSignalPush;