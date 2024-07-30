import { useNavigate } from 'react-router-dom';
import dishes from '../../assets/variety-of-dishes.jpg';
import SectionDivider from '../../components/misc/sectionDivider/SectionDivider.jsx';
import Button from '../../components/buttons/button/Button.jsx';
import './Home.css';


function Home() {
    const navigate = useNavigate();

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
                        <img src={dishes} alt="food photo's made by delicious nl" className="home-header__content-image"/>
                    </span>
                </div>
            </header>
            <section className="features-section outer-content-container">
                <div className="inner-content-container__column">
                    <SectionDivider title="Features"/>
                    <h3>Features</h3>
                </div>
            </section>
            <section className="quote-section outer-content-container">
                <div className="inner-content-container__row">
                    <h3>Quote</h3>
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