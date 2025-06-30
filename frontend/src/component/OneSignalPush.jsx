import {useEffect} from 'react';
import RequestPush from './RequestPush';

function OneSignalPush() {
    useEffect(() => {
        //公式サイトコードをuseEffectで囲うだけしてます(とりま)
        window.OneSignalDeferred = window.OneSignalDeferred || [];
        window.OneSignalDeferred.push(async function (OneSignal) {
            await OneSignal.init({
                appId: '05282da3-68ed-47b9-b3c2-1267595c8b09',
            });
        });

    }, []);

    return <RequestPush></RequestPush>;
}

export default OneSignalPush;