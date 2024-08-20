import { createContext, useState } from 'react';

export const FavContext = createContext({});

function FavContextProvider( { children } ) {
    const [favoriteRecipes, setFavoriteRecipes] = useState([]);

    function updateFavoriteRecipes(updatedFavoriteRecipes) {
        console.log('Favorite recipes updated successfully.', updatedFavoriteRecipes);
    }

    const favContextData = {
        favoriteRecipes: favoriteRecipes,
        setFavoriteRecipes: setFavoriteRecipes,
        updateFavoriteRecipes: updateFavoriteRecipes,
    }

    return (
        <FavContext.Provider value={favContextData}>
            {children}
        </FavContext.Provider>
    )
}

export default FavContextProvider;

