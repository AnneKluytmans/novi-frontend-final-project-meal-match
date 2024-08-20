import { useState, useEffect, useContext } from 'react';
import { Heart } from '@phosphor-icons/react';
import { FavContext } from '../../../context/FavContext.jsx';
import Button from '../button/Button.jsx';
import './FavoriteButton.css';


function FavoriteButton( { recipeId } ) {
    const { favoriteRecipes, setFavoriteRecipes, updateFavoriteRecipes } = useContext(FavContext);
    const [isFavorite, toggleIsFavorite] = useState(false);

    useEffect(() => {
        if (favoriteRecipes.includes(recipeId)) {
            toggleIsFavorite(true);
        }
    }, [favoriteRecipes, recipeId]);

    function toggleFavorite() {
        toggleIsFavorite(!isFavorite);

        const updatedFavoriteRecipes = isFavorite ? favoriteRecipes.filter(id => id !== recipeId)  // Remove recipeId if already favorite
            : [...favoriteRecipes, recipeId];  // Add recipeId if not favorite

        setFavoriteRecipes(updatedFavoriteRecipes);
        updateFavoriteRecipes(updatedFavoriteRecipes);
    }

    return (
        <Button
            onClick={toggleFavorite}
            className={`btn btn__favorite ${isFavorite ? 'favorite' : 'not-favorite'}`}
        >
            <Heart weight="fill" className={`btn__favorite--heart-icon ${isFavorite ? 'favorite' : 'not-favorite'}`}/>
        </Button>
    );
}

export default FavoriteButton;