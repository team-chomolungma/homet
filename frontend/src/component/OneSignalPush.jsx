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
                            welcomeNotification: {
                                disable: true,
                            },
                        });
                        window.OneSignalInitialized = true;
                    }

                    const user = await OneSignal.getUserId();
                    console.log('✅ OneSignal ID:', user.id);
                    setUserId(user.id);

                    OneSignal.on('notificationPermissionChange', async () => {
                        const updated = await OneSignal.isPushNotificationsEnabled?.();
                        setEnabled(updated);
                    });
                } catch (e) {
                    console.error('OneSignal Error:', e);
                    setError(e.message || 'Unknown error');
                }
            })();
        });
    }, []);

    return null;
}

export default OneSignalPush;
