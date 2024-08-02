import {ClockCounterClockwise, Fire, Plant} from '@phosphor-icons/react';
import formatTime from '../../../helpers/formatTime.js';
import formatCalories from '../../../helpers/formatCalories.js';
import truncateTitle from '../../../helpers/truncateTitle.js';
import './RecipeCard.css';

function RecipeCard( { image, cookingTime, calories, vegatarian, vegan, title, id } ) {
    return(
        <article className="recipe-card">
            {id ?
                <>
                    <img className="recipe-card__image" src={image} alt="recipe image"/>
                    <div className="recipe-card__content">
                        <div className="recipe-card__info">
                            <p><ClockCounterClockwise size={24}/> {formatTime(cookingTime)}</p>
                            <p><Fire size={24}/> {formatCalories(calories)}</p>
                            {vegatarian || vegan ?
                                <Plant size={24}/> : null
                            }
                        </div>
                        <h5 className="recipe-card__title">{truncateTitle(title)}</h5>
                    </div>
                </> : null
            }
        </article>
    );
}

export default RecipeCard;