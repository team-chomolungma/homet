import {createContext, useContext, useState} from 'react';

const AuthContext = createContext();//空箱作成

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    
    return (
        //値と関数
        <AuthContext.Provider value={{user, setUser}}>
            {children}
        </AuthContext.Provider>
    );
};

//カスタム
export const useAuth = () => useContext(AuthContext);
