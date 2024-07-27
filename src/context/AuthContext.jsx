import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import Loader from '../components/misc/loader/Loader.jsx';
import isTokenValid from '../helpers/isTokenValid.js';
import { API_KEY_AUTH, API_URL_AUTH } from '../constants/apiConfig.js';


export const AuthContext = createContext({});

function AuthContextProvider( { children } ) {
    const [ isAuth, setIsAuth ] = useState({
        isAuth: false,
        user: null,
        status: 'pending',
    });

    const [loading, toggleLoading] = useState(false);
    const [error, toggleError] = useState(false);
    const [success, toggleSuccess] = useState(false);

    const navigate = useNavigate();


    useEffect(() => {
        const token = localStorage.getItem('token');

        if(token && isTokenValid(token)) {
            console.log("Token valid");
            const decodedToken = jwtDecode(token);
            void fetchUserData(decodedToken.sub, token);
        } else {
            console.log("Token not valid");
            setIsAuth({
                isAuth: false,
                user: null,
                status: 'done',
            });
        }
    }, []);

    function login(JWT) {
        console.log(JWT);
        localStorage.setItem('token', JWT);

        const decodedToken = jwtDecode(JWT);
        console.log(decodedToken);

        void fetchUserData(decodedToken.sub, JWT, '/');
    }

    async function fetchUserData(id, token, redirectUrl) {
        toggleError(false);
        toggleLoading(true);
        toggleSuccess(false);

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
                },
                status: 'done',
            });

            console.log("User is logged in");
            toggleSuccess(true);

            if ( redirectUrl ) {
                setTimeout(() => {
                    navigate( redirectUrl );
                }, 3000);
            }
        } catch (e) {
            console.error(e);
            toggleError(true);
            setIsAuth({
                isAuth: false,
                user: null,
                status: 'done',
            });

            setTimeout(() => {
                toggleError(false);
            }, 7000);
        } finally {
            toggleLoading(false);
        }
    }

    function logout() {
        console.log('User is logged out');
        localStorage.clear();
        setIsAuth({
            isAuth: false,
            user: null,
            status: 'done',
        });

        navigate('/');
    }

    const authContextData = {
        isAuth: isAuth.isAuth,
        user: isAuth.user,
        login: login,
        logout: logout,
        loading: loading,
        error: error,
        success: success,
    }

    return (
        <AuthContext.Provider value={authContextData}>
            { isAuth.status === 'done' ? children : <Loader text="Getting your account details ready... 🍰⏳" /> }
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;