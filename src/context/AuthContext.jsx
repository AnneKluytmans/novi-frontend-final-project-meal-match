import { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { API_KEY_AUTH, API_URL_AUTH } from '../constants/apiConfig.js';


export const AuthContext = createContext({});

function AuthContextProvider( { children } ) {
    const [ isAuth, setIsAuth ] = useState({
        isAuth: false,
        user: null,
    });

    const navigate = useNavigate();

    function login(JWT) {
        console.log(JWT);
        localStorage.setItem('token', JWT);

        const decodedToken = jwtDecode(JWT);
        console.log(decodedToken);

        void fetchUserData(decodedToken.sub, JWT, '/');
    }

    async function fetchUserData(id, token, redirectUrl) {
        try {
            const response = await axios.get(`${API_URL_AUTH}/users/${ id }`, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-Api-Key': API_KEY_AUTH,
                    Authorization: `Bearer ${ token }`,
                },
            });

            console.log(response.data);
            setIsAuth({
                isAuth: true,
                user: {
                    username: response.data.username,
                    email: response.data.email,
                }
            });

            if ( redirectUrl ) {
                setTimeout(() => {
                    navigate( redirectUrl );
                }, 3000);
            }
        } catch (e) {
            console.error(e);
            setIsAuth({
                isAuth: false,
                user: null,
            });
        }
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