import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import qs from 'qs';
import { ClockCounterClockwise, CookingPot, Fire, Plant, Grains, GrainsSlash, Circle, MinusCircle, PlusCircle, CaretRight, ChefHat } from '@phosphor-icons/react';
import Header from '../../components/header/Header.jsx';
import SectionDivider from '../../components/misc/sectionDivider/SectionDivider.jsx';
import Loader from '../../components/misc/loader/Loader.jsx';
import ErrorMessage from '../../components/misc/errorMessage/ErrorMessage.jsx';
import Button from '../../components/buttons/button/Button.jsx';
import RecipeCard from '../../components/cards/recipeCard/RecipeCard.jsx';
import formatTime from '../../helpers/formatTime.js';
import formatCalories from '../../helpers/formatCalories.js';
import abbreviateIngredientUnit from '../../helpers/abbreviateIngredientUnit.js';
import adjustIngredientQuantity from '../../helpers/adjustIngredientQuantity.js';
import {API_KEY_EDAMAM, API_ID_EDAMAM, API_URL_EDAMAM, apiEdamamFieldParam} from '../../constants/apiConfig.js';
import './RecipeDetails.css';


function RecipeDetails() {
    const [recipe, setRecipe] = useState(null);
    const [similarRecipes, setSimilarRecipes] = useState(null);
    const [count, setCount] = useState(2);
    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);
    const [errorSimRecipes, toggleErrorSimRecipes] = useState(false);
    const [loadingSimRecipes, toggleLoadingSimRecipes] = useState(false);

    const { id } = useParams();
    const maxRecipesReturned = 6;

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

    }, [id]);

    useEffect ( () => {
        // Fetches similar recipes from Edamam API
        if (!recipe) return;

        const controller = new AbortController();

        async function fetchSimilarRecipes() {
            toggleErrorSimRecipes(false);
            toggleLoadingSimRecipes(true);

            const params = {
                type: 'public',
                app_id: API_ID_EDAMAM,
                app_key: API_KEY_EDAMAM,
                field: apiEdamamFieldParam,
                q: recipe.label,
                time: '5-120',
            };

            const paramsString = qs.stringify(params, { arrayFormat: 'repeat' });
            const endpoint = `${API_URL_EDAMAM}?${paramsString}`;

            try {
                const response = await axios.get(endpoint, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    signal: controller.signal,
                });

                console.log('Similar Recipes are fetched:', response.data);

                //Filter the original recipe out the response
                const filteredRecipes = response.data.hits.filter((hit) => {
                    const recipeUrlParts = hit._links.self.href.split('/');
                    const recipeUrlLastPart = recipeUrlParts[recipeUrlParts.length - 1];
                    const recipeId = recipeUrlLastPart.split('?')[0];

                    return recipeId !== id;
                });

                setSimilarRecipes(filteredRecipes.slice(0, maxRecipesReturned));
            } catch (e) {
                if (axios.isCancel(e)) {
                    console.log('Request canceled', e.message);
                } else {
                    console.log('Error during fetching similar recipes:', e);
                    toggleErrorSimRecipes(true);
                }
            } finally {
                toggleLoadingSimRecipes(false);
            }
        }

        void fetchSimilarRecipes();

        return function cleanup() {
            console.log('Unmount effect is triggered. Abort ongoing axios requests');
            controller.abort();
        }

    }, [recipe]);

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
                                  return (
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
                                          <li key={`${ingredient.foodId} ${ingredient.weight}`}
                                              className="ingredients-list__item"
                                          >
                                              <Circle size={6} weight="fill"/>
                                              <div className="ingredients-list__item--quantity-wrapper">
                                                  <strong>{adjustIngredientQuantity(ingredient.quantity, count)}</strong>
                                                  <strong>
                                                      {ingredient.measure !== "<unit>" ?
                                                          abbreviateIngredientUnit(ingredient.measure) : null
                                                      }
                                                  </strong>
                                              </div>
                                              {ingredient.food}
                                          </li>
                                      );
                                  })
                                  }
                              </ul>
                          </div>
                          <div className="recipe-details__instructions">
                              <h4 className="instructions__title">Instructions</h4>
                              <h5 className="instructions__text">
                                  Let's get cooking! Follow the link below for step-by-step instructions to create this
                                  delicious dish! 🍽️👨‍🍳
                              </h5>
                              <a href={recipe.url} target="_blank" rel="noopener noreferrer" className="go-to-link">
                                  <CaretRight size={22}/>
                                  Get the full recipe instructions here
                              </a>
                          </div>
                      </div> : null
                  }
                  {loading && <Loader text="Finding the recipe details to start cooking...🍝"/>}
                  {error && <ErrorMessage message="Something went wrong while fetching the recipe details...
                  Our chef seems to have misplaced them! 🍳💔"/>}
              </div>
          </section>
          <section className="outer-content-container">
              <div className="inner-content-container__column">
              <SectionDivider title="Similar Recipes"/>
                  {loadingSimRecipes && <Loader text="Finding similar recipes just for you...🍝"/>}
                  {errorSimRecipes && <ErrorMessage message="Something went wrong while fetching the similar recipes...
                  Our chef seems to have misplaced them! 🍳💔"/>}
                  {similarRecipes && similarRecipes.length > 0 ?
                      <div className="similar-recipes__container recipes-container">
                          {similarRecipes.map((similarRecipe) => {
                              const { image, totalTime, calories, healthLabels, label } = similarRecipe.recipe;
                              const id = similarRecipe._links.self.href.split('/').pop();
                              return (
                                  <RecipeCard
                                      key={id}
                                      id={id}
                                      image={image}
                                      cookingTime={totalTime}
                                      calories={calories}
                                      vegetarian={healthLabels.includes("Vegetarian")}
                                      vegan={healthLabels.includes("Vegan")}
                                      title={label}
                                  />
                              );
                          })
                          }
                      </div> :
                      <>
                          <h3 className="default-text-restrictor similar-recipes__not-found">
                              Hmmm, no similar recipes found... But don’t worry, we have plenty of other choices! 🍲🔍
                          </h3>
                          <Link to="/all-recipes" className="go-to-link">
                              <CaretRight size={22}/>
                              Go to our recipe collection to explore other recipes
                              <ChefHat size={22}/>
                          </Link>
                      </>
                  }
              </div>
          </section>
      </>
    );
}

export default RecipeDetails;