import { Link } from 'react-router-dom';
import { LineVertical, InstagramLogo, FacebookLogo } from '@phosphor-icons/react';
import EdamamBadge from '../../assets/icons/edamam-badge.svg?react';
import './Footer.css';


function Footer( { className } ) {
    return (
        <footer className={`outer-content-container ${className}`}>
            <div className="inner-content-container__row">
                <ul className="footer__nav-links-wrapper">
                    <li><Link to="/contact">Contact</Link></li>
                    <li><Link to="/faq">Faq</Link></li>
                    <li><Link to="/terms-and-policy">Terms & Policy</Link></li>
                </ul>
                <div className="footer__attribution-wrapper">
                    <div className="footer__text-wrapper">
                        <p>Inspiring recipes at <em>&copy;</em> Meal Match 2024</p>
                        <span className="footer__text-designer">
                            <LineVertical size={24} color="#012F1E"/>
                            <p>Designed by
                                <a
                                href="https://github.com/AnneKluytmans"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="footer__social-link"
                                >
                                Anne Kluijtmans
                                </a>
                            </p>
                        </span>
                    </div>
                    <EdamamBadge className="footer__edamam-badge"/>
                </div>
                <div className="footer__social-links-wrapper">
                    <a href="https://www.instagram.com/everynightoftheweek/?utm_source=ig_embed&ig_rid=eac5add9-016b-47c5-8089-4c1c4fe7b472"
                       target="_blank"
                       rel="noopener noreferrer"
                       className="footer__social-link"
                    >
                        <InstagramLogo size={40} color="#1A7453"/>
                    </a>
                    <a href="https://www.facebook.com/everynightoftheweek/"
                       target="_blank"
                       rel="noopener noreferrer"
                       className="footer__social-link"
                    >
                        <FacebookLogo size={40} color="#1A7453" weight="fill"/>
                    </a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;