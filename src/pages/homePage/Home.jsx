import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { MagnifyingGlass, Quotes } from '@phosphor-icons/react';
import InspirationIcon from '../../assets/icons/inspiration-icon.svg?react';
import IngredientsIcon from '../../assets/icons/ingredients-icon.svg?react';
import headerImage from '../../assets/variety-of-dishes.jpg';
import mexicanTacos from '../../assets/mexican-tacos.jpg';
import gadoGado from '../../assets/gado-gado.jpg';
import avatarEvie from '../../assets/avatars/avatar-evie-van-vliet.jpg';
import avatarDavide from '../../assets/avatars/avatar-davide-gallo.jpg';
import avatarOlly from '../../assets/avatars/avatar-olly-hawthorne.jpg';
import SectionDivider from '../../components/misc/sectionDivider/SectionDivider.jsx';
import Button from '../../components/buttons/button/Button.jsx';
import Loader from '../../components/misc/loader/Loader.jsx';
import ErrorMessage from '../../components/misc/errorMessage/ErrorMessage.jsx';
import FeatureCard from '../../components/cards/featureCard/FeatureCard.jsx';
import TestimonialCard from '../../components/cards/testimonialCard/TestimonialCard.jsx';
import RecipeCard from '../../components/cards/recipeCard/RecipeCard.jsx';
import { API_KEY_EDAMAM, API_ID_EDAMAM, API_URL_EDAMAM } from '../../constants/apiConfig.js';
import './Home.css';


function Home() {
    const [popularRecipes, setPopularRecipes] = useState(null);
    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const maxRecipesReturned = 6;
    const images = [mexicanTacos, gadoGado];

    const quoteSectionRef = useRef(null);
    const navigate = useNavigate();

    useEffect ( () => {
        // Fetches popular recipes from spoonacular API
        const controller = new AbortController();

        async function fetchPopularRecipes() {
            toggleError(false);
            toggleLoading(true);

            try {
                const response = await axios.get(`${API_URL_EDAMAM}`, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    params: {
                        type: 'public',
                        app_id: API_ID_EDAMAM,
                        app_key: API_KEY_EDAMAM,
                        q: 'popular',
                    },
                    signal: controller.signal,
                });

                console.log('Popular Recipes are fetched:', response.data);
                setPopularRecipes(response.data.hits.slice(0, maxRecipesReturned));
            } catch (e) {
                if (axios.isCancel(e)) {
                    console.log('Request canceled', e.message);
                } else {
                    console.log('Error during fetching popular recipes:', e);
                    toggleError(true);
                }
            } finally {
                toggleLoading(false);
            }
        }

        fetchPopularRecipes();

        return function cleanup() {
            console.log('Unmount effect is triggered. Abort ongoing axios requests');
            controller.abort();
        }

    }, []);


    useEffect(() => {
        //Set up IntersectionObserver to check if the quote section is visible
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    quoteSectionRef.current.classList.add('visible');
                    observer.unobserve(quoteSectionRef.current); // Stop observing when quote section is visible
                }
            },
            { threshold: 0.3 }
        );

        if (quoteSectionRef.current) {
            observer.observe(quoteSectionRef.current);
        }

        return function cleanup() {
            console.log('Unmount effect is triggered. Clean up timer');
            observer.disconnect();
        }
    }, []);


    useEffect(() => {
        // Automatically switches images in quote-section every 3 seconds
        const timer = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000); // Change image every 3 seconds

        return function cleanup() {
            console.log('Unmount effect is triggered. Clean up interval');
            clearInterval(timer);
        }
    }, [images.length]);

    return (
        <>
            <header className="home-header outer-content-container">
                <div className="inner-content-container__row">
                    <div className="home-header__content-text">
                        <h1>Uncover your perfect <span>recipes</span></h1>
                        <h3>Lacking cooking inspiration? Let Meal Match spark your culinary creativity with recipe ideas
                            tailored to your mood, cooking style or pantry ingredients.</h3>
                        <Button className="btn btn__default" onClick={() => navigate('/recipe-quiz')}>
                            Try it now
                        </Button>
                    </div>
                    <span className="home-header__content-image-wrapper">
                        <img src={headerImage} alt="Colourful dishes made by Delicious NL" className="home-header__content-image"/>
                    </span>
                </div>
            </header>
            <section className="features-section outer-content-container">
                <div className="inner-content-container__column">
                    <SectionDivider title="Features"/>
                    <div className="features__container">
                        <FeatureCard
                            icon={<InspirationIcon className="feature-card__icon"/>}
                            title="Recipe Quiz"
                            description="Answer a few quick questions to receive personalized recipe suggestions tailored
                            to your tastes and preferences."
                            buttonText="Start quiz"
                            redirectUrl="/recipe-quiz"
                        />
                        <FeatureCard
                            icon={<IngredientsIcon className="feature-card__icon"/>}
                            title="Ingredient Search"
                            description="Use the ingredient search feature to find recipes based on what you have in your
                            pantry and fridge."
                            buttonText="Search recipes"
                            redirectUrl="/ingredient-search"
                        />
                        <FeatureCard
                            icon={<MagnifyingGlass className="feature-card__icon" weight="bold"/>}
                            title="All recipes"
                            description="Browse through our delightful recipe collection to discover the perfect dish
                            for any mood or occasion."
                            buttonText="Explore recipes"
                            redirectUrl="/all-recipes"
                        />
                    </div>
                </div>
            </section>
            <section className="quote-section outer-content-container" ref={quoteSectionRef}>
                <div className="inner-content-container__row">
                    <span className="quote__image-wrapper">
                        <img
                            src={images[currentImageIndex]}
                            alt="Colourful plate made by Delicious NL"
                            className="quote__image"
                            key={currentImageIndex}
                        />
                    </span>
                    <div className="quote__quote-wrapper">
                        <h2 className="quote__text">
                            Transform everyday cooking with Meal Match. Discover new flavors,
                            enjoy simple recipes, and make every meal an adventure!
                        </h2>
                        <Quotes size={56} weight="fill" className="quote__quote-icon"/>
                    </div>
                </div>
            </section>
            <section className="popular-recipes-section outer-content-container">
                <div className="inner-content-container__column">
                    <SectionDivider title="Popular Recipes"/>
                    { popularRecipes ?
                        <div className="popular-recipes__container">
                            {popularRecipes.map((popularRecipe) => {
                                return (
                                    <RecipeCard key={popularRecipe.recipe.label} recipe={popularRecipe.recipe}/>
                                );
                            })
                            }
                        </div> : null
                    }
                    {loading && <Loader text="Finding delicious recipes just for you...🍝"/>}
                    {error && <ErrorMessage message="Something went wrong while fetching the popular recipes... Our chef seems to have misplaced them! 🍳💔"/>}
                </div>
            </section>
            <section className="testimonials-section outer-content-container">
                <div className="inner-content-container__column">
                    <SectionDivider title="What users say"/>
                    <TestimonialCard
                        avatar={avatarEvie}
                        name="Evie van Vliet"
                        profession="Corporate lawyer"
                        review="Meal Match is a lifesaver! It offers a fantastic range of vegetarian recipes and makes
                        it simple to find and save my favorites. Perfect for anyone who loves cooking!"
                    />
                    <TestimonialCard
                        avatar={avatarDavide}
                        name="Davide Gallo"
                        profession="High school teacher"
                        review="Meal Match is a game-changer. It’s so easy to find recipes based on what I have at home,
                        adding much-needed variety to my meals. A must-have for anyone stuck in a cooking rut!"
                    />
                    <TestimonialCard
                        avatar={avatarOlly}
                        name="Olly Hawthorne"
                        profession="Graphic designer"
                        review="Meal Match has made cooking fun again! It’s like having a personal chef in my pocket,
                        helping me find recipes that perfectly match my mood and ingredients. Highly recommended!"
                    />
                </div>
            </section>
        </>
    );
}

export default Home;