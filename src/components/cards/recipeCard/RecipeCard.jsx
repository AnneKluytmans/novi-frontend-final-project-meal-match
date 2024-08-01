import {ClockCounterClockwise, Fire, Plant} from '@phosphor-icons/react';
import formatTime from '../../../helpers/formatTime.js';
import formatCalories from '../../../helpers/formatCalories.js';
import truncateTitle from '../../../helpers/truncateTitle.js';
import './RecipeCard.css';

function RecipeCard( { recipe } ) {
    return(
        <article className="recipe-card">
            {recipe ?
                <>
                    <img className="recipe-card__image" src={recipe.image} alt="recipe image"/>
                    <div className="recipe-card__info">
                        <p><ClockCounterClockwise size={24}/> {formatTime( recipe.totalTime)}</p>
                        <p><Fire size={24}/> {formatCalories(recipe.calories)}</p>
                        {recipe.healthLabels.includes("Vegetarian") || recipe.healthLabels.includes("Vegan") ?
                            <Plant size={24}/> : null
                        }
                    </div>
                    <h5 className="recipe-card__title">{truncateTitle(recipe.label)}</h5>
                </> : null
            }
        </article>
    );
}

export default RecipeCard;