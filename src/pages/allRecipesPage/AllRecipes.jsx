import { MagnifyingGlass } from '@phosphor-icons/react';
import Header from '../../components/header/Header.jsx';
import SectionDivider from '../../components/misc/sectionDivider/SectionDivider.jsx';
import './AllRecipes.css';


function AllRecipes() {
    return (
        <>
            <Header
                title="All Recipes"
                subtitle="Explore a world of flavors. Browse, filter, and find your perfect recipe match."
                icon={<MagnifyingGlass stroke="#D8F499" strokeWidth={4} className="header__icon"/>}
            />
            <section className="outer-content-container">
                <div className="inner-content-container__column">
                    <SectionDivider title="Explore Recipes"/>
                </div>
            </section>
        </>
    );
}

export default AllRecipes;
