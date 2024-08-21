import { createContext, useEffect, useState, useContext } from 'react';
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

    const controller = new AbortController();

    useEffect(() => {
        // Cancels ongoing Axios requests on component unmount
        return function cleanup() {
            console.log('Unmount effect is triggered. Abort ongoing axios requests');
            controller.abort();
        }
    }, []);

    async function updateFavoriteRecipes(updatedFavoriteRecipes) {
        console.log('Favorite recipes:', updatedFavoriteRecipes);

        if (!isAuth) {
            console.log('User is not authenticated.');
            return;
        }

        toggleError(false);
        toggleLoading(true);

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
                toggleError(true);
            }
        } finally {
            toggleLoading(false);
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

