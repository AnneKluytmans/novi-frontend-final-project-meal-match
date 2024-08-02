import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { CookingPot } from '@phosphor-icons/react';
import Header from '../../components/header/Header.jsx';
import SectionDivider from '../../components/misc/sectionDivider/SectionDivider.jsx';
import Loader from '../../components/misc/loader/Loader.jsx';
import ErrorMessage from '../../components/misc/errorMessage/ErrorMessage.jsx';
import { API_KEY_EDAMAM, API_ID_EDAMAM, API_URL_EDAMAM } from '../../constants/apiConfig.js';
import './RecipeDetails.css';


function RecipeDetails() {
    const [recipe, setRecipe] = useState(null);
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

        fetchRecipeDetails();

        return function cleanup() {
            console.log('Unmount effect is triggered. Abort ongoing axios requests');
            controller.abort();
        }

    }, []);

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
                    <h2>{recipe.label}</h2>
                      : null
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