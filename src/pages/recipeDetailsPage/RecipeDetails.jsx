import { useParams } from 'react-router-dom';
import { CookingPot } from '@phosphor-icons/react';
import Header from '../../components/header/Header.jsx';
import SectionDivider from '../../components/misc/sectionDivider/SectionDivider.jsx';
import './RecipeDetails.css';


function RecipeDetails() {
    const { id } = useParams();

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
                  <h2>Recipe Details</h2>
                  <p>Recipe ID = {id}</p>
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