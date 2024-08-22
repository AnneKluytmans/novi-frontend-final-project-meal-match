import { Link } from 'react-router-dom';
import {CaretRight, SmileyXEyes} from '@phosphor-icons/react';
import Header from '../../components/header/Header.jsx';
import SectionDivider from '../../components/misc/sectionDivider/SectionDivider.jsx';
import './NotFound.css';


function NotFound() {
    return (
        <>
            <Header
                title="Oops! Not Found..."
                subtitle="This page doesn't exist. You've taken a wrong path in your culinary adventure."
                icon={<SmileyXEyes className="header__icon--big"/>}
            />
            <section className="outer-content-container">
                <div className="inner-content-container__column not-found-section">
                    <SectionDivider title="Not Found"/>
                    <h4 className="default-text-restrictor">
                        Lost your way? No problem! Let&apos;s get you back on the right track to discover more delicious recipes! 🚀🌮
                    </h4>
                    <div className="not-found__links-wrapper">
                        <Link to="/" className="go-to-link">
                            <CaretRight size={22} />
                            Take me back to the Home Page
                        </Link>
                        <Link to="/recipe-quiz" className="go-to-link">
                            <CaretRight size={22} />
                            Do the Recipe Quiz to uncover your next favorite meal
                        </Link>
                        <Link to="/all-recipes" className="go-to-link">
                            <CaretRight size={22} />
                            Go to our recipe collection to explore new recipes
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}

export default NotFound;