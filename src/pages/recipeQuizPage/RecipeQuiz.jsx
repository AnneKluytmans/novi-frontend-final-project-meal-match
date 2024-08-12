import InspirationIcon from '../../assets/icons/inspiration-icon.svg?react';
import Header from '../../components/header/Header.jsx';
import SectionDivider from '../../components/misc/sectionDivider/SectionDivider.jsx';
import './RecipeQuiz.css';



function RecipeQuiz() {
    return (
      <>
          <Header
              title="Recipe Quiz"
              subtitle="Take our recipe quiz for inspiring recipe ideas matching your mood, taste and preferences."
              icon={<InspirationIcon className="header__icon"/>}
          />
          <section className="outer-content-container">
              <div className="inner-content-container__column">
                  <SectionDivider title="Recipe Quiz"/>
                  <h3>Recipe Quiz</h3>
              </div>
          </section>
      </>
    );
}

export default RecipeQuiz;