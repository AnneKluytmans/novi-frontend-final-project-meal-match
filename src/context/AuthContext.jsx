import { createContext, useState, useEffect, useRef } from 'react';
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
    const controllerRef = useRef(new AbortController());

    useEffect(() => {
        // Cancels ongoing Axios requests on component unmount
        return () => {
            console.log('Unmount effect is triggered. Abort ongoing axios requests');
            controllerRef.current.abort();
        };
    }, []);

    useEffect(() => {
        // Automatically hides success and error messages after a set duration
        let successTimeout;
        let errorTimeout;

        if (success) {
            successTimeout = setTimeout(() => toggleSuccess(false), 3000);
        }

        if (error) {
            errorTimeout = setTimeout(() => toggleError(false), 7000);
        }

        return function cleanup() {
            console.log('Unmount effect is triggered. Clean up timers');
            clearTimeout(successTimeout);
            clearTimeout(errorTimeout);
        };
    }, [success, error]);

    useEffect(() => {
        // Verifies a stored token on component mount and fetches user data if valid
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
        console.log("User is logged in");
    }

    async function fetchUserData(id, token, redirectUrl) {
        // Resets abort controller for every new request
        controllerRef.current.abort();
        controllerRef.current = new AbortController();
        const controller = controllerRef.current;

        toggleError(false);
        toggleLoading(true);
        toggleSuccess(false);

        try {
            const response = await axios.get(`${API_URL_AUTH}/users/${ id }`, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-Api-Key': API_KEY_AUTH,
                    'accept': '*/*',
                    'Authorization': `Bearer ${ token }`,
                },
                signal: controller.signal,
            });

            setIsAuth({
                isAuth: true,
                user: {
                    username: response.data.username,
                    email: response.data.email,
                },
                status: 'done',
            });

            console.log("User data is fetched:", response.data);
            toggleSuccess(true);

            if ( redirectUrl ) {
                setTimeout(() => {
                    navigate( redirectUrl );
                }, 2500);
            }
        } catch (e) {
            console.error("User data is not fetched:", e);
            toggleError(true);
            setIsAuth({
                isAuth: false,
                user: null,
                status: 'done',
            });
        } finally {
            toggleLoading(false);
        }
    }

    function logout( redirectUrl='/' ) {
        console.log('User is logged out');
        localStorage.clear();
        setIsAuth({
            isAuth: false,
            user: null,
            status: 'done',
        });

        navigate(redirectUrl);
    }

    const authContextData = {
        isAuth: isAuth.isAuth,
        user: isAuth.user,
        login: login,
        logout: logout,
        fetchUserData: fetchUserData,
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