import { useState } from 'react';
import InspirationIcon from '../../assets/icons/inspiration-icon.svg?react';
import Header from '../../components/header/Header.jsx';
import SectionDivider from '../../components/misc/sectionDivider/SectionDivider.jsx';
import Button from '../../components/buttons/button/Button.jsx';
import NextButton from '../../components/buttons/nextButton/NextButton.jsx';
import PreviousButton from '../../components/buttons/previousButton/PreviousButton.jsx';
import QuizQuestion from '../../components/misc/quizQuestion/QuizQuestion.jsx';
import quizQuestions from '../../constants/quizQuestions.js';
import './RecipeQuiz.css';



function RecipeQuiz() {
    const [quizStarted, toggleQuizStarted] = useState(false);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [quizAnswers, setQuizAnswers] = useState({});
    const [selectedAnswers, setSelectedAnswers] = useState({});

    const currentQuestion = quizQuestions[currentQuestionIndex];
    const isAnswerSelected = selectedAnswers[currentQuestionIndex] !== undefined;

    function SelectAnswer(answerValue, answerTitle) {
        setQuizAnswers(prevQuizAnswers => {
            const updatedQuizAnswers = {
                ...prevQuizAnswers,
                [currentQuestion.param]: answerValue,
            }

            setSelectedAnswers(prevSelectedAnswers => ({
                ...prevSelectedAnswers,
                [currentQuestionIndex]: answerTitle,
            }));

            console.log(updatedQuizAnswers);
            return updatedQuizAnswers;
        });
    }

    function resetQuiz() {
        console.log(quizAnswers);
        toggleQuizStarted(false);
        setQuizAnswers({});
        setSelectedAnswers({});
        setCurrentQuestionIndex(0);
    }

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
                    </div> :
                      currentQuestionIndex < quizQuestions.length ?
                          <div className="recipe-quiz__question">
                            <QuizQuestion
                                count={currentQuestionIndex + 1}
                                question={currentQuestion.question}
                                options={currentQuestion.answerOptions}
                                onSelect={SelectAnswer}
                                selectedAnswer={selectedAnswers[currentQuestionIndex]}
                            />
                            <div className="recipe-quiz__nav-btn-container">
                                <NextButton
                                    count={currentQuestionIndex}
                                    setCount={setCurrentQuestionIndex}
                                    disabled={!isAnswerSelected || currentQuestionIndex === quizQuestions.length}
                                />
                                <PreviousButton
                                    count={currentQuestionIndex}
                                    setCount={setCurrentQuestionIndex}
                                    disabled={currentQuestionIndex === 0}
                                />
                            </div>
                          </div>
                          :
                          <div className="recipe-quiz__end-screen">
                              <h2 className="default-text-restrictor">You&apos;ve completed the quiz. Your perfect
                                  recipe match is just a click away.</h2>
                              <Button
                                  className="btn btn__default"
                                  onClick={resetQuiz}
                              >
                                  End quiz
                              </Button>
                              <div className="recipe-quiz__nav-btn-container">
                                  <NextButton
                                      count={currentQuestionIndex}
                                      setCount={setCurrentQuestionIndex}
                                      disabled={!isAnswerSelected || currentQuestionIndex === quizQuestions.length}
                                  />
                                  <PreviousButton
                                      count={currentQuestionIndex}
                                      setCount={setCurrentQuestionIndex}
                                      disabled={currentQuestionIndex === 0}
                                  />
                              </div>
                          </div>
                  }
              </div>
          </section>
      </>
    );
}

export default RecipeQuiz;