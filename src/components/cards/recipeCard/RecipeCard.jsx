import { useNavigate } from 'react-router-dom';
import {ClockCounterClockwise, Fire, Plant} from '@phosphor-icons/react';
import FavoriteButton from '../../buttons/favoriteButton/FavoriteButton.jsx';
import formatTime from '../../../helpers/formatTime.js';
import formatCalories from '../../../helpers/formatCalories.js';
import truncateTitle from '../../../helpers/truncateTitle.js';
import './RecipeCard.css';

function RecipeCard( { image, cookingTime, calories, vegetarian, vegan, title, id } ) {
    const navigate = useNavigate();

    return(
        <>
        {id ?
            <article className="recipe-card" onClick={ () => navigate(`/recipe-details/${id}`) }>
                    <img className="recipe-card__image" src={image} alt="recipe image"/>
                    <FavoriteButton recipeId={id}/>
                    <div className="recipe-card__content">
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