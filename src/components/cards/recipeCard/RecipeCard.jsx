import { useNavigate } from 'react-router-dom';
import { ClockCounterClockwise, Fire, Plant } from '@phosphor-icons/react';
import { AuthContext } from '../../../context/AuthContext.jsx';
import FavoriteButton from '../../buttons/favoriteButton/FavoriteButton.jsx';
import formatTime from '../../../helpers/formatTime.js';
import formatCalories from '../../../helpers/formatCalories.js';
import truncateTitle from '../../../helpers/truncateTitle.js';
import './RecipeCard.css';
import {useContext} from "react";

function RecipeCard( { image, cookingTime, calories, vegetarian, vegan, title, id } ) {
    const navigate = useNavigate();
    const { isAuth } = useContext(AuthContext);

    return(
        <>
        {id ?
            <article className="recipe-card">
                    <img className="recipe-card__image" src={image} alt="recipe image" onClick={ () => navigate(`/recipe-details/${id}`) }/>
                    {isAuth ?
                        <FavoriteButton recipeId={id.split('?')[0]}/> : null
                    }
                    <div className="recipe-card__content" onClick={ () => navigate(`/recipe-details/${id}`) }>
                        <div className="recipe-card__info">
                            <p><ClockCounterClockwise size={24}/> {formatTime(cookingTime)}</p>
                            <p><Fire size={24}/> {formatCalories(calories)}</p>
                            {vegetarian || vegan ?
                                <Plant size={24}/> : null
                            }
                        </div>
                        <h5 className="recipe-card__title">{truncateTitle(title)}</h5>
                    </div>
            </article> : null
        }
        </>
    );
}

export default RecipeCard;