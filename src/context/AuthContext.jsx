import { createContext } from 'react';

export const AuthContext = createContext({});

function AuthContextProvider( { children } ) {
    const authContextData = {
        isAuth: false,
    }

    return (
        <AuthContext.Provider value={authContextData}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;