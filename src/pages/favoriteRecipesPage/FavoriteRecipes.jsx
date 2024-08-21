import { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { CaretRight, ChefHat, Heart } from '@phosphor-icons/react';
import { FavContext } from '../../context/FavContext.jsx';
import Header from '../../components/header/Header.jsx';
import SectionDivider from '../../components/misc/sectionDivider/SectionDivider.jsx';
import RecipeCard from '../../components/cards/recipeCard/RecipeCard.jsx';
import Loader from '../../components/misc/loader/Loader.jsx';
import ErrorMessage from '../../components/misc/errorMessage/ErrorMessage.jsx';
import { API_KEY_EDAMAM, API_ID_EDAMAM, API_URL_EDAMAM } from '../../constants/apiConfig.js';
import './FavoriteRecipes.css'


function FavoriteRecipes() {
    const [recipes, setRecipes] = useState(null);
    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);

    const { favoriteRecipes, error: contextError, loading: contextLoading } = useContext(FavContext);

    useEffect( () => {
        // Fetches favorite recipes on component mount or updated favoriteRecipes
        const controller = new AbortController();

        async function fetchFavoriteRecipes() {
            toggleError(false);
            toggleLoading(true);

            try {
                const response = favoriteRecipes.map(id =>
                    axios.get(`${API_URL_EDAMAM}/${id}`, {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        params: {
                            type: 'public',
                            app_id: API_ID_EDAMAM,
                            app_key: API_KEY_EDAMAM,
                        },
                        signal: controller.signal,
                    })
                );

                const responses = await Promise.all(response);
                const fetchedRecipes = responses.map(response => response.data);

                console.log('Favorite Recipes are fetched:', fetchedRecipes);
                setRecipes(fetchedRecipes);
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

        if (favoriteRecipes.length > 0) {
            void fetchFavoriteRecipes();
        } else {
            setRecipes(null);
        }

        // Cancels ongoing Axios requests on component unmount
        return function cleanup() {
            console.log('Unmount effect is triggered. Abort ongoing axios requests');
            controller.abort();
        }
    }, [favoriteRecipes]);


    return (
      <>
          <Header
              title="Favorite Recipes"
              subtitle="All your favorite recipes all in one place."
              icon={<Heart className="header__icon"/>}
          />
          <section className="outer-content-container">
              <div className="inner-content-container__column">
                  <SectionDivider title="Favorite Recipes"/>
                  {loading || contextLoading && <Loader text="Fetching your favorite recipes...🍝🧡 Hang Tight!"/>}
                  {error || contextError &&
                      <ErrorMessage message="Something went wrong while fetching your favorite recipes... Our chef seems to have misplaced them! 🍳💔"/>
                  }
                  {!loading && !error && !contextLoading && !contextError && recipes &&
                      <div className="recipes-container">
                          {recipes.map((recipe) => {
                              const {
                                  image,
                                  totalTime,
                                  calories,
                                  healthLabels,
                                  label
                              } = recipe.recipe;
                              const id = recipe._links.self.href.split('/').pop();
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
                      </div>
                  }
                  {!loading && !error && !contextLoading && !contextError && !recipes &&
                      <div className="recipe-results-container">
                          <h4 className="default-text-restrictor">
                              No favorite recipes yet... But don’t worry. Browse through our recipe collection to uncover delicious recipes! 🍔🧡
                          </h4>
                          <Link to="/all-recipes" className="go-to-link">
                              <CaretRight size={22}/>
                              Go to our recipe collection to uncover your favorite recipes
                              <ChefHat size={22}/>
                          </Link>
                      </div>
                  }
              </div>
          </section>
      </>
    );
}

export default FavoriteRecipes;