import { SmileyXEyes} from '@phosphor-icons/react';
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
                <div className="inner-content-container__column">
                    <SectionDivider title="Not Found"/>
                </div>
            </section>
        </>
    );
}

export default NotFound;