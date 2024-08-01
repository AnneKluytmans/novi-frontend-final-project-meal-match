import { useEffect, useState } from 'react';
import axios from 'axios';
import { Plant } from '@phosphor-icons/react';
import { API_KEY_SPOONACULAR, API_URL_SPOONACULAR } from '../../../constants/apiConfig.js';
import './RecipeCard.css';
import Loader from "../../misc/loader/Loader.jsx";
import ErrorMessage from "../../misc/errorMessage/ErrorMessage.jsx";


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
                    <p>{recipe.readyInMinutes} min</p>
                    <p>{recipe.nutrition.nutrients[0].amount} kCal</p>
                    {recipe.vegan || recipe.vegetarian ?
                        <Plant size={24}/> : null
                    }
                    <h5 className="recipe-card__title">{recipe.title}</h5>
                </> : null
            }
            {loading && <Loader text="Fetching a delicious recipe just for you...🍝"/>}
            {error && <ErrorMessage message="Something went wrong while fetching the recipe... Our chef seems to have misplaced it! 🍳💔"/>}
        </article>
    );
}

export default RecipeCard;