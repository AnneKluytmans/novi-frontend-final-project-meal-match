import { Quotes } from '@phosphor-icons/react';
import './TestimonialCard.css';

function TestimonialCard( { avatar, name, profession, review } ) {
    return (
        <article className="testimonial-card">
            <div className="testimonial-card__header">
                <img src={ avatar } alt="profile-image" className="testimonial-card__avatar" />
                <div className="testimonial-card__info">
                    <h4>{name}</h4>
                    <p>{profession}</p>
                </div>
            </div>
            <p className="default-text-restrictor">&quot;{review}&quot;</p>
            <Quotes size={48} weight="fill" className="testimonial-card__quote-icon"/>
        </article>
    );
}

export default TestimonialCard;