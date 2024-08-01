import { useEffect, useState } from 'react';
import axios from 'axios';
import {ClockCounterClockwise, Fire, Plant} from '@phosphor-icons/react';
import Loader from '../../misc/loader/Loader.jsx';
import ErrorMessage from '../../misc/errorMessage/ErrorMessage.jsx';
import formatTime from '../../../helpers/formatTime.js';
import formatCalories from '../../../helpers/formatCalories.js';
import truncateTitle from '../../../helpers/truncateTitle.js';
import { API_KEY_SPOONACULAR, API_URL_SPOONACULAR } from '../../../constants/apiConfig.js';
import './RecipeCard.css';


function RecipeCard( { id } ) {
    const [recipe, setRecipe] = useState(null);
    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);

    useEffect( () => {
        //Fetches recipe information from spoonacular API by recipe id
        const controller = new AbortController();

        async function fetchRecipe() {
            toggleError(false);
            toggleLoading(true);

            try {
                const response = await axios.get(`${API_URL_SPOONACULAR}/${id}/information`, {
                   headers: {
                       'Content-Type': 'application/json',
                   },
                    params: {
                       includeNutrition: true,
                       apiKey: API_KEY_SPOONACULAR,
                    },
                    signal: controller.signal,
                });

                console.log('Recipe is fetched:', response.data);
                setRecipe(response.data);
            } catch (e) {
                if (axios.isCancel(e)) {
                    console.log('Request canceled', e.message);
                } else {
                    console.log('Error during fetching recipe:', e);
                    toggleError(true);
                }
            } finally {
                toggleLoading(false);
            }
        }

        fetchRecipe();

        return function cleanup() {
            console.log('Unmount effect is triggered. Abort ongoing axios request');
            controller.abort();
        }
    }, []);

    return(
        <article className="recipe-card">
            {recipe ?
                <>
                    <img className="recipe-card__image" src={recipe.image} alt="recipe image"/>
                    <div className="recipe-card__info">
                        <p><ClockCounterClockwise size={24}/> {formatTime( recipe.readyInMinutes)}</p>
                        <p><Fire size={24}/> {formatCalories(recipe.nutrition.nutrients[0].amount)}</p>
                        {recipe.vegan || recipe.vegetarian ?
                            <Plant size={24}/> : null
                        }
                    </div>
                    <h5 className="recipe-card__title">{truncateTitle(recipe.title)}</h5>
                </> : null
            }
            {loading && <Loader text="Fetching a delicious recipe just for you...🍝"/>}
            {error && <ErrorMessage message="Something went wrong while fetching the recipe... Our chef seems to have misplaced it! 🍳💔"/>}
        </article>
    );
}

export default RecipeCard;