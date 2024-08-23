import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import qs from 'qs';
import { MagnifyingGlass, CaretDown, CaretUp, Plus, Minus } from '@phosphor-icons/react';
import Header from '../../components/header/Header.jsx';
import SectionDivider from '../../components/misc/sectionDivider/SectionDivider.jsx';
import RecipeCard from '../../components/cards/recipeCard/RecipeCard.jsx';
import Loader from '../../components/misc/loader/Loader.jsx';
import ErrorMessage from '../../components/misc/errorMessage/ErrorMessage.jsx';
import Dropdown from '../../components/dropdowns/dropdown/Dropdown.jsx';
import Button from '../../components/buttons/button/Button.jsx';
import PreviousButton from '../../components/buttons/previousButton/PreviousButton.jsx';
import NextButton from '../../components/buttons/nextButton/NextButton.jsx';
import { API_KEY_EDAMAM, API_ID_EDAMAM, API_URL_EDAMAM, apiEdamamFieldParam } from '../../constants/apiConfig.js';
import './AllRecipes.css';


function AllRecipes() {
    const [allRecipes, setAllRecipes] = useState(null);
    const [showedRecipes, setShowedRecipes] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [filters, setFilters] = useState(null);
    const [sortOption, setSortOption] = useState(null);
    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);

    const { register, handleSubmit } = useForm();

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
                q: 'popular',
                ...filters,
            };

            let paramsString = qs.stringify(params, { arrayFormat: 'repeat' });
            let endpoint = `${API_URL_EDAMAM}?${paramsString}`;

            try {
                while (fetchedRecipes.length < 100 && endpoint) {
                    const response = await axios.get(endpoint, {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        signal: controller.signal,
                    });

                    console.log(response.data);
                    fetchedRecipes = [...fetchedRecipes, ...response.data.hits];

                    if (response.data._links && response.data._links.next && response.data._links.next.href) {
                        nextEndpoint = response.data._links.next.href;
                    } else {
                        nextEndpoint = null;
                    }

                    endpoint = nextEndpoint;
                }

                console.log('Recipes are fetched:', fetchedRecipes);

                // Filter out duplicates recipes based on recipe.uri
                const uniqueRecipes = fetchedRecipes.filter((fetchedRecipe, index, self) => {
                    return index === self.findIndex((recipe) => recipe.recipe.uri === fetchedRecipe.recipe.uri);
                })

                setAllRecipes(uniqueRecipes);
                setCurrentPage(1); // Reset to page 1 when new recipes are fetched
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

    useEffect(() => {
        if (allRecipes) {
            const sortedRecipes = sortRecipes(allRecipes, sortOption);
            const recipesPerPage = 12;
            const startIndex = (currentPage - 1) * recipesPerPage;
            const endIndex = startIndex + recipesPerPage;

            if (endIndex <= allRecipes.length) {
                setShowedRecipes(sortedRecipes.slice(startIndex, endIndex));
            } else {
                setShowedRecipes(sortedRecipes.slice(startIndex, sortedRecipes.length));
            }
        }
    }, [allRecipes, currentPage, sortOption]);


    function handleFormSubmitFilter(data) {
        const selectedDishTypes = data.dishType ? data.dishType : null;
        const selectedMealTypes = data.mealType ? data.mealType : null;
        const selectedCuisineTypes = data.cuisineType ? data.cuisineType : null;
        const selectedHealthFilters = data.health ? data.health : null;

        const newFilters = {
            ...(selectedDishTypes && {dishType: selectedDishTypes}),
            ...(selectedMealTypes && {mealType: selectedMealTypes}),
            ...(selectedCuisineTypes && {cuisineType: selectedCuisineTypes}),
            ...(selectedHealthFilters && {health: selectedHealthFilters}),
        };

        setFilters(newFilters);
    }

    function handleFormSubmitSort(data) {
        applySorting(data.sortOption);
    }

    function sortRecipes(recipes, sortOption) {
        switch (sortOption) {
            case 'cookingTimeAsc':
                return [...recipes].sort((a, b) => a.recipe.totalTime - b.recipe.totalTime);
            case 'cookingTimeDesc':
                return [...recipes].sort((a, b) => b.recipe.totalTime - a.recipe.totalTime);
            case 'caloriesAsc':
                return [...recipes].sort((a, b) => a.recipe.calories - b.recipe.calories);
            case 'caloriesDesc':
                return [...recipes].sort((a, b) => b.recipe.calories - a.recipe.calories);
            case 'ingredientsAsc':
                return [...recipes].sort((a, b) => a.recipe.ingredients.length - b.recipe.ingredients.length);
            case 'ingredientsDesc':
                return [...recipes].sort((a, b) => b.recipe.ingredients.length - a.recipe.ingredients.length);
            default:
                return recipes;
        }
    }

    function applySorting(newSortOption) {
        setCurrentPage(1);
        setSortOption(newSortOption);
    }

    return (
        <>
            <Header
                title="All Recipes"
                subtitle="Explore a world of flavors. Browse, filter, and find your perfect recipe match."
                icon={<MagnifyingGlass stroke="#D8F499" strokeWidth={4} className="header__icon"/>}
            />
            <section className="outer-content-container">
                <div className="inner-content-container__column">
                    <SectionDivider title="Explore Recipes"/>
                    <div className="filter-sort-container">
                        <Dropdown
                            title="Filters"
                            openIcon={<Minus size={28}/>}
                            closedIcon={<Plus size={28}/>}
                            closeOnContentClick={false}
                            className="dropdown__filter-sort"
                        >
                            <form className="filter-sort-container__options" onSubmit={handleSubmit(handleFormSubmitFilter)}>
                                <div className="filter-sort-container__options-wrapper">
                                    <h5>Dish Type</h5>
                                    <label>
                                        <input
                                            type="checkbox"
                                            value="Breakfast"
                                            {...register('mealType')}
                                        />
                                        Breakfast
                                    </label>
                                    <label>
                                        <input
                                            type="checkbox"
                                            value="Lunch"
                                            {...register('mealType')}
                                        />
                                        Lunch
                                    </label>
                                    <label>
                                        <input
                                            type="checkbox"
                                            value="Dinner"
                                            {...register('mealType')}
                                        />
                                        Dinner
                                    </label>
                                    <label>
                                        <input
                                            type="checkbox"
                                            value="Snack"
                                            {...register('mealType')}
                                        />
                                        Snack
                                    </label>
                                    <label>
                                        <input
                                            type="checkbox"
                                            value="Desserts"
                                            {...register('dishType')}
                                        />
                                        Dessert
                                    </label>
                                    <label>
                                        <input
                                            type="checkbox"
                                            value="Drinks"
                                            {...register('dishType')}
                                        />
                                        Drink
                                    </label>
                                    <h5>Cuisine</h5>
                                    <label>
                                        <input
                                            type="checkbox"
                                            value="American"
                                            {...register('cuisineType')}
                                        />
                                        American
                                    </label>
                                    <label>
                                        <input
                                            type="checkbox"
                                            value="Mediterranean"
                                            {...register('cuisineType')}
                                        />
                                        Mediterranean
                                    </label>
                                    <label>
                                        <input
                                            type="checkbox"
                                            value="French"
                                            {...register('cuisineType')}
                                        />
                                        European
                                    </label>
                                    <label>
                                        <input
                                            type="checkbox"
                                            value="Indian"
                                            {...register('cuisineType')}
                                        />
                                        Middle Eastern
                                    </label>
                                    <label>
                                        <input
                                            type="checkbox"
                                            value="Chinese"
                                            {...register('cuisineType')}
                                        />
                                        Asian
                                    </label>
                                    <label>
                                        <input
                                            type="checkbox"
                                            value="South American"
                                            {...register('cuisineType')}
                                        />
                                        South American
                                    </label>
                                    <h5>Diet</h5>
                                    <label>
                                        <input
                                            type="checkbox"
                                            value="gluten-free"
                                            {...register('health')}
                                        />
                                        Gluten free
                                    </label>
                                    <label>
                                        <input
                                            type="checkbox"
                                            value="tree-nut-free"
                                            {...register('health')}
                                        />
                                        Nut free
                                    </label>
                                    <label>
                                        <input
                                            type="checkbox"
                                            value="dairy-free"
                                            {...register('health')}
                                        />
                                        Dairy free
                                    </label>
                                    <label>
                                        <input
                                            type="checkbox"
                                            value="alcohol-free"
                                            {...register('health')}
                                        />
                                        Alcohol free
                                    </label>
                                    <label>
                                        <input
                                            type="checkbox"
                                            value="vegetarian"
                                            {...register('health')}
                                        />
                                        Vegetarian
                                    </label>
                                    <label>
                                        <input
                                            type="checkbox"
                                            value="vegan"
                                            {...register('health')}
                                        />
                                        Vegan
                                    </label>
                                </div>
                                <Button
                                    type="submit"
                                    className="btn btn__filter-sort"
                                >
                                    Filter recipes
                                </Button>
                            </form>
                        </Dropdown>
                        <Dropdown
                            title="Sort"
                            openIcon={<CaretUp size={28}/>}
                            closedIcon={<CaretDown size={28}/>}
                            closeOnContentClick={false}
                            className="dropdown__filter-sort"
                        >
                            <form className="filter-sort-container__options"
                                  onSubmit={handleSubmit(handleFormSubmitSort)}>
                                <h5>Cooking Time</h5>
                                <label>
                                    <input
                                        type="radio"
                                        value="cookingTimeAsc"
                                        {...register('sortOption')}
                                    />
                                    Cooking Time (short to long)
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        value="cookingTimeDesc"
                                        {...register('sortOption')}
                                    />
                                    Cooking Time (long to short)
                                </label>
                                <h5>Calories</h5>
                                <label>
                                    <input
                                        type="radio"
                                        value="caloriesAsc"
                                        {...register('sortOption')}
                                    />
                                    Calories (low to high)
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        value="caloriesDesc"
                                        {...register('sortOption')}
                                    />
                                    Calories (high to low)
                                </label>
                                <h5>Ingredients</h5>
                                <label>
                                    <input
                                        type="radio"
                                        value="ingredientsAsc"
                                        {...register('sortOption')}
                                    />
                                    Ingredients (few to many)
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        value="ingredientsDesc"
                                        {...register('sortOption')}
                                    />
                                    Ingredients (many to few)
                                </label>
                                <h5>No sorting</h5>
                                <label>
                                    <input
                                        type="radio"
                                        value="default"
                                        {...register('sortOption')}
                                    />
                                    Default
                                </label>
                                <Button
                                    type="submit"
                                    className="btn btn__filter-sort"
                                >
                                    Sort recipes
                                </Button>
                            </form>
                        </Dropdown>
                    </div>
                    {loading && <Loader text="Finding delicious recipes just for you...🍝"/>}
                    {error && <ErrorMessage
                        message="Something went wrong while fetching the recipes... Our chef seems to have misplaced them! 🍳💔"/>}
                    {!loading && !error && allRecipes && showedRecipes &&
                        <>
                        {allRecipes.length > 0 ?
                                <div className="recipe-results-container">
                                    <div className="recipes-container">
                                        {showedRecipes.map((showedRecipe) => {
                                            const {
                                                image,
                                                totalTime,
                                                calories,
                                                healthLabels,
                                                label
                                            } = showedRecipe.recipe;
                                            const id = showedRecipe._links.self.href.split('/').pop();
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
                                    <div className="nav-btn-container">
                                        <PreviousButton
                                            count={currentPage}
                                            setCount={setCurrentPage}
                                            disabled={currentPage === 1}
                                        />
                                        <p>Page</p>
                                        <p>{currentPage}</p>
                                        <NextButton
                                            count={currentPage}
                                            setCount={setCurrentPage}
                                            disabled={currentPage >= allRecipes.length / 12}
                                        />
                                    </div>
                                </div> :
                                <div className="recipe-results-container">
                                    <h4 className="default-text-restrictor">
                                        Hmmm, no recipes found matching your filters...
                                        <br/>
                                        Please try again! 💔🍲
                                    </h4>
                                </div>
                            }
                        </>
                    }
                </div>
            </section>
        </>
    );
}

export default AllRecipes;
