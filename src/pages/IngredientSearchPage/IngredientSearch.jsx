import { useEffect, useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import qs from 'qs';
import { MagnifyingGlass } from '@phosphor-icons/react';
import IngredientsIcon from '../../assets/icons/ingredients-icon.svg?react';
import Header from '../../components/header/Header.jsx';
import SectionDivider from '../../components/misc/sectionDivider/SectionDivider.jsx';
import InputField from '../../components/form/inputField/InputField.jsx';
import Button from '../../components/buttons/button/Button.jsx';
import RecipeCard from '../../components/cards/recipeCard/RecipeCard.jsx';
import Loader from '../../components/misc/loader/Loader.jsx';
import ErrorMessage from '../../components/misc/errorMessage/ErrorMessage.jsx';
import isQueryValid from '../../helpers/isQueryValid.js';
import { API_KEY_EDAMAM, API_ID_EDAMAM, API_URL_EDAMAM, apiEdamamFieldParam } from '../../constants/apiConfig.js';
import './IngredientSearch.css';


function IngredientSearch() {
    const [showRecipes, toggleShowRecipes] = useState(null);
    const [foundRecipes, setFoundRecipes] = useState({});
    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);

    const { register, handleSubmit, formState: {errors} } = useForm({
        mode: 'onTouched',
    });

    const maxQueryLength = 150;
    const controllerRef = useRef(new AbortController());

    useEffect(() => {
        // Cancels ongoing Axios requests on component unmount
        return () => {
            console.log('Unmount effect is triggered. Abort ongoing axios requests');
            controllerRef.current.abort();
        };
    }, []);

    async function handleFormSubmit(data) {
        // Resets abort controller for every new request
        controllerRef.current.abort();
        controllerRef.current = new AbortController();
        const controller = controllerRef.current;

        console.log(data);
        toggleError(false);
        toggleLoading(true);
        toggleShowRecipes(true);

        const params = {
            type: 'public',
            app_id: API_ID_EDAMAM,
            app_key: API_KEY_EDAMAM,
            field: apiEdamamFieldParam,
            random: true,
            time: '1-120',
            q: data.ingredients,
        };

        const paramsString = qs.stringify(params, { arrayFormat: 'repeat' });
        const endpoint = `${API_URL_EDAMAM}?${paramsString}`;

        try {
            const response = await axios.get(endpoint , {
                headers: {
                    'Content-Type': 'application/json',
                },
                signal: controller.signal,
            });

            console.log('Recipes are fetched:', response.data);
            setFoundRecipes(response.data.hits);
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

    return (
      <>
        <Header
            title="Ingredient Search"
            subtitle="Discover delicious recipes with what you have on hand. Just enter your ingredients."
            icon={<IngredientsIcon className="header__icon"/>}
        />
        <section className="outer-content-container">
            <div className="inner-content-container__column">
                <SectionDivider title="Search by ingredients" />
                <form className="ingredient-search__query" onSubmit={handleSubmit(handleFormSubmit)}>
                    <InputField
                        id="ingredients-field"
                        type="text"
                        name="ingredients"
                        placeholder="tomato, cheese, carrot"
                        register={register}
                        validation={{
                            required: 'Ingredients are required',
                            validate: isQueryValid,
                            maxLength: { value: maxQueryLength, message: `Ingredients query cannot exceed ${maxQueryLength} characters` },
                        }}
                        error={errors.ingredients}
                        className="ingredient-search__query--input"
                    />
                    <Button
                        type="submit"
                        className="btn btn__search"
                    >
                        <MagnifyingGlass size={32} stroke="#EBFACC" strokeWidth={6}/>
                    </Button>
                </form>
                {showRecipes &&
                    <>
                        {loading && <Loader text="Finding your perfect recipe matches...🍝"/>}
                        {error && <ErrorMessage message="Something went wrong while fetching your recipe results... Our chef seems to have misplaced them! 🍳💔"/>}
                        {!error && !loading &&
                            <>
                                {foundRecipes.length > 0 ?
                                    <div className="recipe-results-container">
                                        <h3>Your recipe matches 🎉🧑‍🍳</h3>
                                        <div className="recipes-container">
                                            {foundRecipes.map((foundRecipe) => {
                                                const { image, totalTime, calories, healthLabels, label } = foundRecipe.recipe;
                                                const id = foundRecipe._links.self.href.split('/').pop();
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
                                    </div> :
                                    <div className="recipe-results-container">
                                        <h4 className="default-text-restrictor">
                                            Hmmm, no recipes found matching your ingredients...
                                            <br/>
                                            Please check the ingredients and try again! 💔🍲
                                        </h4>
                                    </div>
                                }
                            </>
                        }
                    </>
                }
            </div>
        </section>
      </>
    );
}

export default IngredientSearch;

