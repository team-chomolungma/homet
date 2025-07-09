// SessionChecker.jsx
import {useEffect} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import axiosInstance from '../../lib/axios.js';
import {useAuth} from './AuthContext.jsx';

//Reactが自動で小要素をpropsとして渡す
const SessionChecker = ({children}) => {
    const {setUser} = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const checkSession = async () => {
            if (['/', '/start', '/login', '/signup'].includes(location.pathname)) return;//画面スキップ
            try {
                const res = await axiosInstance.get('/api/auth/session');
                if (res.status === 200) {
                    const {userID, displayname} = res.data;
                    //myUserID,myDisplaynameでセット
                    setUser({myUserID: userID, myDisplayname: displayname});
                    //有効なセッションだったらそのまま表示させる
                }
            } catch (err) {
                if (err.response?.status === 401) {
                    console.log('未ログイン、またはセッション切れ');
                    localStorage.removeItem('SESSION_TOKEN')
                    navigate('/'); //トップページへリダイレクト
                } else {
                    console.error('予期しないエラー', err);
                }
            }
        };
        checkSession();
    }, [location.pathname]);//パスが変わるたびに実行

    return children;
};

export default SessionChecker;
