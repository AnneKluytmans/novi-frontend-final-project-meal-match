import { useEffect, useState } from 'react';
import axios from 'axios';
import qs from 'qs';
import { MagnifyingGlass } from '@phosphor-icons/react';
import Header from '../../components/header/Header.jsx';
import SectionDivider from '../../components/misc/sectionDivider/SectionDivider.jsx';
import { API_KEY_EDAMAM, API_ID_EDAMAM, API_URL_EDAMAM, apiEdamamFieldParam } from '../../constants/apiConfig.js';
import './AllRecipes.css';
import RecipeCard from "../../components/cards/recipeCard/RecipeCard.jsx";
import Loader from "../../components/misc/loader/Loader.jsx";
import ErrorMessage from "../../components/misc/errorMessage/ErrorMessage.jsx";


function AllRecipes() {
    const [allRecipes, setAllRecipes] = useState(null);
    const [filters, setFilters] = useState(null);
    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);

    useEffect ( () => {
        // Fetches recipes from Edamam API on component mount or update of filters and cancels ongoing Axios requests on component unmount
        const controller = new AbortController();

        async function fetchRecipes() {
            toggleError(false);
            toggleLoading(true);

            let fetchedRecipes = [];
            let nextEndpoint = null;

            const params = {
                type: 'public',
                app_id: API_ID_EDAMAM,
                app_key: API_KEY_EDAMAM,
                field: apiEdamamFieldParam,
                time: '1-120',
                ...filters,
            };

            let paramsString = qs.stringify(params, { arrayFormat: 'repeat' });
            let endpoint = `${API_URL_EDAMAM}?${paramsString}`;

            try {
                while (fetchedRecipes.length < 120 && endpoint) {
                    const response = await axios.get(endpoint, {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        signal: controller.signal,
                    });

                    fetchedRecipes = [...fetchedRecipes, ...response.data.hits];

                    if (response.data._links && response.data._links.next && response.data._links.next.href) {
                        nextEndpoint = response.data._links.next.href;
                    } else {
                        nextEndpoint = null;
                    }

                    endpoint = nextEndpoint;
                }

                console.log('Recipes are fetched:', fetchedRecipes);
                setAllRecipes(fetchedRecipes);

            } catch (e) {
                if (axios.isCancel(e)) {
                    console.log('Request canceled', e.message);
                } else {
                    console.log('Error during fetching recipes:', e);
                    toggleError(true);
                }
            } finally {
                toggleLoading(false);
            }
        }

        void fetchRecipes();

        return function cleanup() {
            console.log('Unmount effect is triggered. Abort ongoing axios requests');
            controller.abort();
        }
    }, [filters]);

    return (
        <>
            <Header
                title="All Recipes"
                subtitle="Explore a world of flavors. Browse, filter, and find your perfect recipe match."
                icon={<MagnifyingGlass stroke="#D8F499" strokeWidth={4} className="header__icon"/>}
            />
            <section className="outer-content-container">
                <div className="inner-content-container__column">
                    <SectionDivider title="Explore Recipes" />
                    { allRecipes ?
                        <div className="recipes-container">
                            {allRecipes.map((allRecipe) => {
                                const { image, totalTime, calories, healthLabels, label } = allRecipe.recipe;
                                const id = allRecipe._links.self.href.split('/').pop();
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
                        </div> : null
                    }
                    {loading && <Loader text="Finding delicious recipes just for you...🍝"/>}
                    {error && <ErrorMessage message="Something went wrong while fetching the recipes... Our chef seems to have misplaced them! 🍳💔"/>}
                </div>
            </section>
        </>
    );
}

export default AllRecipes;
