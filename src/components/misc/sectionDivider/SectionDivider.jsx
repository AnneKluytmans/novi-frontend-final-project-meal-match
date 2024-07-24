import LogoIcon from '../../../assets/icons/logo-icon.svg?react';
import './SectionDivider.css';

function SectionDivider( { title } ) {
    return (
        <div className="section-divider__container">
            <h2>{title}</h2>
            <div className="section-divider">
                <div className="section-divider__line"></div>
                <LogoIcon className="section-divider__logo"/>
                <div className="section-divider__line"></div>
            </div>
        </div>
    );
}

export default SectionDivider;