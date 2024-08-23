import { createContext, useEffect, useState, useContext, useRef } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext.jsx';
import { API_KEY_AUTH, API_URL_AUTH } from '../constants/apiConfig.js';

export const FavContext = createContext({});

function FavContextProvider( { children } ) {
    const [favoriteRecipes, setFavoriteRecipes] = useState([]);
    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);

    const { isAuth, user } = useContext(AuthContext);
    const token = localStorage.getItem('token');

    const controllerRef = useRef(new AbortController());

    useEffect(() => {
        // Cancels ongoing Axios requests on component unmount
        return () => {
            console.log('Unmount effect is triggered. Abort ongoing axios requests');
            controllerRef.current.abort();
        };
    }, []);

    useEffect ( () => {
        // Fetch favorite recipes on login or refresh
        if (isAuth && user) {
            void fetchFavoriteRecipes();
        }

    }, [isAuth, user]);

    async function fetchFavoriteRecipes() {
        // Resets abort controller for every new request
        controllerRef.current.abort();
        controllerRef.current = new AbortController();
        const controller = controllerRef.current;

        toggleError(false);
        toggleLoading(true);

        try {
            const response = await axios.get(`${API_URL_AUTH}/users/${user.username}/info`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                signal: controller.signal,
            });

            console.log('fetched favorite recipes', response.data);
            const favoriteRecipesData = response.data || '';
            const favoriteRecipesArray = favoriteRecipesData.split(',');

            setFavoriteRecipes(favoriteRecipesArray);
        } catch (e) {
            if (axios.isCancel(e)) {
                console.log('Request canceled', e.message);
            } else {
                console.log('Failed to fetch favorite recipes:', e);
                toggleError(true);
            }
        } finally {
            toggleLoading(false);
        }
    }

    async function updateFavoriteRecipes(updatedFavoriteRecipes) {
        console.log('Favorite recipes:', updatedFavoriteRecipes);

        if (!isAuth || !user) {
            console.log('User is not authenticated.');
            return;
        }

        // Resets abort controller for every new request
        controllerRef.current.abort();
        controllerRef.current = new AbortController();
        const controller = controllerRef.current;
        
        const favoriteRecipesString = updatedFavoriteRecipes.join(',');

        try {
            const response = await axios.put(`${API_URL_AUTH}/users/${user.username}`, {
                info: favoriteRecipesString,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-Api-Key': API_KEY_AUTH,
                    'Authorization': `Bearer ${ token }`,
                },
                signal: controller.signal,
            });

            console.log('Favorite recipes updated successfully', response.data);
        } catch (e) {
            if (axios.isCancel(e)) {
                console.log('Request canceled', e.message);
            } else {
                console.log('Favorite recipes are not updated:', e);
            }
        }
    }

    const favContextData = {
        favoriteRecipes: favoriteRecipes,
        setFavoriteRecipes: setFavoriteRecipes,
        updateFavoriteRecipes: updateFavoriteRecipes,
        error: error,
        loading: loading,
    }

    return (
        <FavContext.Provider value={favContextData}>
            {children}
        </FavContext.Provider>
    )
}

export default FavContextProvider;

