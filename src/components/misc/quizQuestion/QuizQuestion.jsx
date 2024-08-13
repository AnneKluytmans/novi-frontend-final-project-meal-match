import QuizAnswerCard from '../../cards/quizAnswerCard/QuizAnswerCard.jsx';
import './QuizQuestion.css';

function QuizQuestion({ question, options, onSelect, selectedAnswer } ) {
    return (
        <div className="quiz-question__container">
            <h3 className="quiz-question__question">{question}</h3>
            <div className="quiz-question__answer-options">
                {options.map((option) => {
                    return (
                        <QuizAnswerCard
                            key={option.title}
                            answer={option}
                            onSelect={onSelect}
                            isSelected={selectedAnswer === option.value}
                        />
                    );
                })
                }
            </div>
        </div>
    );
}

export default QuizQuestion;