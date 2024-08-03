import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {ClockCounterClockwise, CookingPot, Fire, Plant, Grains, GrainsSlash, Circle, MinusCircle, PlusCircle } from '@phosphor-icons/react';
import Header from '../../components/header/Header.jsx';
import SectionDivider from '../../components/misc/sectionDivider/SectionDivider.jsx';
import Loader from '../../components/misc/loader/Loader.jsx';
import ErrorMessage from '../../components/misc/errorMessage/ErrorMessage.jsx';
import formatTime from '../../helpers/formatTime.js';
import formatCalories from '../../helpers/formatCalories.js';
import abbreviateIngredientUnit from '../../helpers/abbreviateIngredientUnit.js';
import { API_KEY_EDAMAM, API_ID_EDAMAM, API_URL_EDAMAM } from '../../constants/apiConfig.js';
import './RecipeDetails.css';
import Button from "../../components/buttons/button/Button.jsx";
import adjustIngredientQuantity from "../../helpers/adjustIngredientQuantity.js";


function RecipeDetails() {
    const [recipe, setRecipe] = useState(null);
    const [count, setCount] = useState(2);
    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);

    const { id } = useParams();

    useEffect ( () => {
        // Fetches popular recipes from Edamam API
        const controller = new AbortController();

        async function fetchRecipeDetails() {
            toggleError(false);
            toggleLoading(true);

            try {
                const response = await axios.get(`${API_URL_EDAMAM}/${id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    params: {
                        type: 'public',
                        app_id: API_ID_EDAMAM,
                        app_key: API_KEY_EDAMAM,
                    },
                    signal: controller.signal,
                });

                console.log('Recipe Details are fetched:', response.data);
                setRecipe(response.data.recipe);
            } catch (e) {
                if (axios.isCancel(e)) {
                    console.log('Request canceled', e.message);
                } else {
                    console.log('Error during fetching recipe details:', e);
                    toggleError(true);
                }
            } finally {
                toggleLoading(false);
            }
        }

        void fetchRecipeDetails();

        return function cleanup() {
            console.log('Unmount effect is triggered. Abort ongoing axios requests');
            controller.abort();
        }

    }, []);

    function incrementCount() {
        setCount(count + 1);
    }

    function decrementCount() {
        setCount(count - 1);
    }


    return (
      <>
          <Header
              title="Recipe Details"
              subtitle="Everything you need to cook this delicious dish: ingredients, instructions and more."
              icon={<CookingPot className="header__icon recipe-details__header-icon"/>}
          />
          <section className="outer-content-container">
              <div className="inner-content-container__column">
                  <SectionDivider title="Uncover Recipe"/>
                  {recipe ?
                      <div className="recipe-details__container">
                          <h2>{recipe.label}</h2>
                          <div className="recipe-details__info">
                              <p><ClockCounterClockwise size={24}/> {formatTime(recipe.totalTime)}</p>
                              <p><Fire size={24}/> {formatCalories(recipe.calories)}</p>
                              {recipe.healthLabels.includes("Vegetarian") && !recipe.healthLabels.includes("Vegan") &&
                                  <p><Plant size={24}/> vegetarian</p>
                              }
                              {recipe.healthLabels.includes("Vegan") &&
                                  <p><Plant size={24}/> vegan</p>
                              }
                              {recipe.healthLabels.includes("Gluten-Free") ?
                                  <p><Grains size={24}/> gluten free</p> : <p><GrainsSlash size={24}/> gluten</p>
                              }
                          </div>
                          <img className="recipe-details__image" src={recipe.image} alt="recipe image"/>
                          <div className="recipe-details__categories">
                              {recipe.cuisineType.map((cuisine) => {
                                    return(
                                        <p key={cuisine} className="recipe-details__categorie">
                                            <strong>{cuisine}</strong>
                                        </p>
                                    );
                                })
                              }
                              {recipe.dishType.map((dish) => {
                                  return (
                                      <p key={dish} className="recipe-details__categorie">
                                          <strong>{dish}</strong>
                                      </p>
                              )
                                  ;
                              })
                              }
                              {recipe.mealType.map((meal) => {
                                  return (
                                      <p key={meal} className="recipe-details__categorie">
                                          <strong>{meal}</strong>
                                      </p>
                                  );
                              })
                              }
                          </div>
                          <div className="recipe-details__ingredients">
                              <h4 className="ingredients__title">Ingredients</h4>
                              <div className="ingredients__servings">
                                  <p><strong>{count} servings</strong></p>
                                  <div className="ingredients__servings-buttons">
                                       <Button onClick={decrementCount} disabled={count <= 1}>
                                            <MinusCircle size={24}/>
                                        </Button>
                                        <Button onClick={incrementCount} disabled={count >= 20}>
                                            <PlusCircle size={24}/>
                                        </Button>
                                   </div>
                              </div>
                              <ul className="ingredients__ingredients-list">
                                  {recipe.ingredients.map((ingredient) => {
                                      return (
                                          <li key={ingredient.foodId} className="ingredients-list__item">
                                              <Circle size={6} weight="fill"/>
                                              <div className="ingredients-list__item--quantity-wrapper">
                                                  <strong>{adjustIngredientQuantity(ingredient.quantity, count)}</strong>
                                                  <strong>
                                                      {ingredient.measure !== "<unit>"  ? abbreviateIngredientUnit(ingredient.measure) : null }
                                                  </strong>
                                              </div>
                                              {ingredient.food}
                                          </li>
                                      );
                                  })
                                  }
                              </ul>
                          </div>
                      </div> : null
                  }
                  {loading && <Loader text="Finding the recipe details to start cooking...🍝"/>}
                  {error && <ErrorMessage message="Something went wrong while fetching the recipe details... Our chef seems to have misplaced them! 🍳💔"/>}
              </div>
          </section>
          <section className="outer-content-container">
              <div className="inner-content-container__column">
                  <SectionDivider title="Similar Recipes"/>
                  <h2>Similar Recipes</h2>
              </div>
          </section>
      </>
    );
}

export default RecipeDetails;