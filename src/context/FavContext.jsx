import { createContext, useState } from 'react';

export const FavContext = createContext({});

function FavContextProvider( { children } ) {
    const [favoriteRecipes, setFavoriteRecipes] = useState(null);

    const favContextData = {
        favoriteRecipes: favoriteRecipes,
        setFavoriteRecipes: setFavoriteRecipes,
    }

    return (
        <FavContext.Provider value={favContextData}>
            {children}
        </FavContext.Provider>
    )
}

export default FavContextProvider;

