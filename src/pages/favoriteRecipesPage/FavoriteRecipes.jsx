import { Heart } from '@phosphor-icons/react';
import Header from '../../components/header/Header.jsx';
import SectionDivider from '../../components/misc/sectionDivider/SectionDivider.jsx';
import './FavoriteRecipes.css'


function FavoriteRecipes() {
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
              </div>
          </section>
      </>
    );
}

export default FavoriteRecipes;