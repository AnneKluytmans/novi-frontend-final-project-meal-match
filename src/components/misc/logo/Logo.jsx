import LogoIcon from '../../../assets/icons/logo-icon.svg?react';
import './Logo.css';


function Logo() {
    return (
        <div className="logo">
            <LogoIcon className="logo__icon"/>
            <div className="logo__text-wrapper">
                <h4 className="logo__text">meal</h4>
                <h4 className="logo__text">match</h4>
            </div>
        </div>
    );
}

export default Logo;