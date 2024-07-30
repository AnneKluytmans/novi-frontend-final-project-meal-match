import { useNavigate } from 'react-router-dom';
import Button from '../../buttons/button/Button.jsx';
import './FeatureCard.css';

function FeatureCard( { icon, title, description, buttonText, redirectUrl } ) {
    const navigate = useNavigate();
    return (
        <article className="feature-card">
            <span className="feature-card__icon-wrapper">{icon}</span>
            <div className="feature-card__text">
                <h2>{title}</h2>
                <p>{description}</p>
            </div>
            <Button className="btn btn__dark" onClick={ () => navigate(redirectUrl) }>
                {buttonText}
            </Button>
        </article>
    );
}

export default FeatureCard;