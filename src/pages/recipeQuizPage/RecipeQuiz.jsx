import { useState } from 'react';
import InspirationIcon from '../../assets/icons/inspiration-icon.svg?react';
import Header from '../../components/header/Header.jsx';
import SectionDivider from '../../components/misc/sectionDivider/SectionDivider.jsx';
import Button from '../../components/buttons/button/Button.jsx';
import './RecipeQuiz.css';
import NextButton from "../../components/buttons/nextButton/NextButton.jsx";
import PreviousButton from "../../components/buttons/previousButton/PreviousButton.jsx";


function RecipeQuiz() {
    const [quizStarted, toggleQuizStarted] = useState(false);
    const [count, setCount] = useState(0);

    return (
      <>
          <Header
              title="Recipe Quiz"
              subtitle="Take our recipe quiz for inspiring recipe ideas matching your mood, taste and preferences."
              icon={<InspirationIcon className="header__icon"/>}
          />
          <section className="outer-content-container recipe-quiz-section">
              <div className="inner-content-container__column">
                  <SectionDivider title="Recipe Quiz"/>
                  {!quizStarted ?
                    <div className="recipe-quiz__start-screen">
                        <h2 className="default-text-restrictor">Take our quiz and discover your perfect recipe match!</h2>
                        <Button
                            className="btn btn__default"
                            onClick={() => toggleQuizStarted(true)}
                        >
                            Start quiz
                        </Button>
                        <h3>{count}</h3>
                        <NextButton count={count} setCount={setCount} maxCount={6}/>
                        <PreviousButton count={count} setCount={setCount} minCount={0}/>
                    </div> :
                      <div className="recipe-quiz__end-screen">
                          <h2 className="default-text-restrictor">You&apos;ve completed the quiz. Your perfect recipe match is just a click away.</h2>
                          <Button
                              className="btn btn__default"
                              onClick={() => toggleQuizStarted(false)}
                          >
                              End quiz
                          </Button>
                      </div>
                  }
              </div>
          </section>
      </>
    );
}

export default RecipeQuiz;