import './QuizAnswerCard.css';

function QuizAnswerCard( { answer, onSelect, isSelected } ) {
    return (
        <article
            className={`quiz-answer ${isSelected ? 'selected' : ''}`}
            onClick={() => onSelect(answer.value)}
        >
            <h4>{answer.title}</h4>
            <p>{answer.subtitle}</p>
        </article>
    );
}

export default QuizAnswerCard;