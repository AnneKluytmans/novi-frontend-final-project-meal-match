import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MagnifyingGlass, Quotes } from '@phosphor-icons/react';
import InspirationIcon from '../../assets/icons/inspiration-icon.svg?react';
import IngredientsIcon from '../../assets/icons/ingredients-icon.svg?react';
import headerImage from '../../assets/variety-of-dishes.jpg';
import mexicanTacos from '../../assets/mexican-tacos.jpg';
import gadoGado from '../../assets/gado-gado.jpg';
import SectionDivider from '../../components/misc/sectionDivider/SectionDivider.jsx';
import Button from '../../components/buttons/button/Button.jsx';
import FeatureCard from '../../components/cards/featureCard/FeatureCard.jsx';
import './Home.css';


function Home() {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const navigate = useNavigate();

    const images = [mexicanTacos, gadoGado];

    // Timer to switch images in quote-section every 3 seconds
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000); // Change image every 3 seconds

        return () => clearInterval(timer); // Clean up the timer on component unmount
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
            <section className="quote-section outer-content-container">
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
                    <h3>Popular recipes</h3>
                </div>
            </section>
            <section className="testimonials-section outer-content-container">
                <div className="inner-content-container__column">
                    <SectionDivider title="What users say"/>
                    <h3>What users say</h3>
                </div>
            </section>
        </>
    );
}

export default Home;