import IngredientsIcon from '../../assets/icons/ingredients-icon.svg?react';
import Header from '../../components/header/Header.jsx';
import SectionDivider from '../../components/misc/sectionDivider/SectionDivider.jsx';
import './IngredientSearch.css';

function IngredientSearch() {
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
            </div>
        </section>
      </>
    );
}

export default IngredientSearch;

