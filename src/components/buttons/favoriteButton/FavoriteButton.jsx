import { useState, useEffect, useContext } from 'react';
import { Heart } from '@phosphor-icons/react';
import { FavContext } from '../../../context/FavContext.jsx';
import Button from '../button/Button.jsx';
import Overlay from '../../misc/overlay/Overlay.jsx';
import ErrorMessage from '../../misc/errorMessage/ErrorMessage.jsx';
import './FavoriteButton.css';


function FavoriteButton( { recipeId, className } ) {
    const { favoriteRecipes, setFavoriteRecipes, updateFavoriteRecipes } = useContext(FavContext);
    const [isFavorite, toggleIsFavorite] = useState(false);
    const [showLimitWarning, toggleShowLimitWarning] = useState(false);

    useEffect(() => {
        // Automatically hides error messages after a set duration
        let limitWarningTimeout;

        if (showLimitWarning) {
            limitWarningTimeout = setTimeout(() => toggleShowLimitWarning(false), 7000);
        }

        return function cleanup() {
            console.log('Unmount effect is triggered. Clean up timers');
            clearTimeout(limitWarningTimeout);
        };
    }, [showLimitWarning]);

    useEffect(() => {
        if (favoriteRecipes.includes(recipeId)) {
            toggleIsFavorite(true);
        }
    }, [favoriteRecipes, recipeId]);

    function toggleFavorite() {
        if (isFavorite) {
            // Remove recipe from favorites
            const updatedFavoriteRecipes = favoriteRecipes.filter(id => id !== recipeId);
            setFavoriteRecipes(updatedFavoriteRecipes);
            updateFavoriteRecipes(updatedFavoriteRecipes);
            toggleIsFavorite(false);
        } else {
            if (favoriteRecipes.length >= 10) {
                toggleShowLimitWarning(true);
                return
            }

            const updatedFavoriteRecipes = [...favoriteRecipes, recipeId];
            setFavoriteRecipes(updatedFavoriteRecipes);
            updateFavoriteRecipes(updatedFavoriteRecipes);
            toggleIsFavorite(true);
        }
    }

    return (
        <>
            <Overlay show={ showLimitWarning }>
                {showLimitWarning &&
                    <ErrorMessage message="You can only have up to 10 favorite recipes. 💔🍳"/>
                }
            </Overlay>
            <Button
                onClick={toggleFavorite}
                className={`btn btn__favorite ${isFavorite ? 'favorite' : 'not-favorite'} ${className || ''}`}
            >
                <Heart weight="fill" className={`btn__favorite--heart-icon ${isFavorite ? 'favorite' : 'not-favorite'}`}/>
            </Button>
        </>
    );
}

export default FavoriteButton;