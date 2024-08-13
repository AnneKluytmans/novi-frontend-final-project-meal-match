import QuizAnswerCard from '../../cards/quizAnswerCard/QuizAnswerCard.jsx';
import './QuizQuestion.css';

function QuizQuestion({ count, question, options, onSelect, selectedAnswer } ) {
    return (
        <div className="quiz-question__container">
            <div className="quiz__question__question-wrapper">
                <h3 className="quiz-question__question">{count}. {question}</h3>
            </div>
            <div className="quiz-question__answer-options">
                {options.map((option) => {
                    return (
                        <QuizAnswerCard
                            key={option.title}
                            answer={option}
                            onSelect={onSelect}
                            isSelected={selectedAnswer === option.title}
                        />
                    );
                })
                }
            </div>
        </div>
    );
}

export default QuizQuestion;