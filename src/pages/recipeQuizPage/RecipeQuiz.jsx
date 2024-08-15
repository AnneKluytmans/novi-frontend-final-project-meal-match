import { useEffect, useState } from 'react';
import axios from 'axios';
import qs from 'qs';
import InspirationIcon from '../../assets/icons/inspiration-icon.svg?react';
import Header from '../../components/header/Header.jsx';
import SectionDivider from '../../components/misc/sectionDivider/SectionDivider.jsx';
import Button from '../../components/buttons/button/Button.jsx';
import NextButton from '../../components/buttons/nextButton/NextButton.jsx';
import PreviousButton from '../../components/buttons/previousButton/PreviousButton.jsx';
import QuizQuestion from '../../components/misc/quizQuestion/QuizQuestion.jsx';
import RecipeCard from '../../components/cards/recipeCard/RecipeCard.jsx';
import Loader from '../../components/misc/loader/Loader.jsx';
import ErrorMessage from '../../components/misc/errorMessage/ErrorMessage.jsx';
import quizQuestions from '../../constants/quizQuestions.js';
import { API_KEY_EDAMAM, API_ID_EDAMAM, API_URL_EDAMAM, apiEdamamFieldParam } from '../../constants/apiConfig.js';
import './RecipeQuiz.css';


function RecipeQuiz() {
    const [quizStarted, toggleQuizStarted] = useState(false);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [quizAnswers, setQuizAnswers] = useState({});
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [foundRecipes, setFoundRecipes] = useState({});
    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);
    const [showResultsScreen, toggleShowResultsScreen] = useState(false);

    const currentQuestion = quizQuestions[currentQuestionIndex];
    const isAnswerSelected = selectedAnswers[currentQuestionIndex] !== undefined;
    const maxRecipesReturned = 12;

    const controller = new AbortController();

    useEffect(() => {
        // Cancels ongoing Axios requests on component unmount
        return function cleanup() {
            console.log('Unmount effect is triggered. Abort ongoing axios requests');
            controller.abort();
        }
    }, []);

    function SelectAnswer(answerValue, answerTitle) {
        setQuizAnswers(prevQuizAnswers => {
            let updatedQuizAnswers;

            if (answerValue !== null && answerValue !== undefined && answerValue !== '') {
                updatedQuizAnswers = {
                    ...prevQuizAnswers,
                    [currentQuestion.param]: answerValue,
                };
            } else {
                const { [currentQuestion.param]: _, ...rest } = prevQuizAnswers;
                updatedQuizAnswers = rest;
            }

            setSelectedAnswers(prevSelectedAnswers => ({
                ...prevSelectedAnswers,
                [currentQuestionIndex]: answerTitle,
            }));

            console.log(updatedQuizAnswers);
            return updatedQuizAnswers;
        });
    }

    function endQuiz() {
        toggleShowResultsScreen(true);
        void fetchRecipes();
    }

    async function fetchRecipes() {
        toggleError(false);
        toggleLoading(true);

        const params = {
            type: 'public',
            app_id: API_ID_EDAMAM,
            app_key: API_KEY_EDAMAM,
            field: apiEdamamFieldParam,
            random: true,
            ...quizAnswers
        };

        const paramsString = qs.stringify(params, { arrayFormat: 'repeat' });
        const endpoint = `${API_URL_EDAMAM}?${paramsString}`;

        try {
            const response = await axios.get(endpoint , {
                headers: {
                    'Content-Type': 'application/json',
                },
                signal: controller.signal,
            });

            console.log('Recipes are fetched:', response.data);
            setFoundRecipes(response.data.hits.slice(0, maxRecipesReturned));
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

    function resetQuiz() {
        toggleQuizStarted(false);
        setQuizAnswers({});
        setSelectedAnswers({});
        setCurrentQuestionIndex(0);
        toggleShowResultsScreen(false);
        setFoundRecipes({});
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
                  {!showResultsScreen &&
                      <>
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
                                      onClick={endQuiz}
                                  >
                                      Uncover recipes
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
                      </>
                  }
                  {showResultsScreen &&
                    <>
                        {loading && <Loader text="Finding your perfect recipe matches...🍝"/>}
                        {error &&
                            <>
                                <ErrorMessage message="Something went wrong while fetching your recipe results... Our chef seems to have misplaced them! 🍳💔"/>
                                <Button
                                    onClick={resetQuiz}
                                    className="btn btn__default"
                                >
                                    Try again
                                </Button>
                            </>
                        }
                        {!error && !loading &&
                            <>
                                {foundRecipes.length > 0 ?
                                    <div className="recipe-quiz__result-screen">
                                        <h3>Your recipe matches 🎉🧑‍🍳</h3>
                                        <div className="recipes-container">
                                            {foundRecipes.map((foundRecipe) => {
                                                const { image, totalTime, calories, healthLabels, label } = foundRecipe.recipe;
                                                const id = foundRecipe._links.self.href.split('/').pop();
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
                                        <Button
                                            onClick={resetQuiz}
                                            className="btn btn__dark"
                                        >
                                            Take quiz again
                                        </Button>
                                    </div>
                                    : <>
                                          <h3 className="default-text-restrictor">
                                              Hmmm, no recipes found matching your quiz answers... Please try again! 💔🍲
                                          </h3>
                                          <Button
                                              onClick={resetQuiz}
                                              className="btn btn__default"
                                          >
                                              Try again
                                          </Button>
                                      </>
                                }
                            </>
                        }
                    </>
                  }
              </div>
          </section>
      </>
    );
}

export default RecipeQuiz;