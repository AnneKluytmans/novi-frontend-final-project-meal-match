import { createContext } from 'react';
import { useState } from 'react';

export const AuthContext = createContext({});

function AuthContextProvider( { children } ) {
    const [ isAuth, setIsAuth ] = useState({
        isAuth: false,
        user: null,
    });

    const authContextData = {
        isAuth: isAuth.isAuth,
        user: isAuth.user,
    }

    return (
        <AuthContext.Provider value={authContextData}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;