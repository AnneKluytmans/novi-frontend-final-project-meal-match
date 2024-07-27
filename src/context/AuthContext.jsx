import { createContext, useState } from 'react';
import { jwtDecode } from 'jwt-decode';


export const AuthContext = createContext({});

function AuthContextProvider( { children } ) {
    const [ isAuth, setIsAuth ] = useState({
        isAuth: false,
        user: null,
    });

    function login(JWT) {
        console.log(JWT);
        localStorage.setItem('token', JWT);

        const decodedToken = jwtDecode(JWT);
        console.log(decodedToken);
    }

    const authContextData = {
        isAuth: isAuth.isAuth,
        user: isAuth.user,
        login: login,
    }

    return (
        <AuthContext.Provider value={authContextData}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;