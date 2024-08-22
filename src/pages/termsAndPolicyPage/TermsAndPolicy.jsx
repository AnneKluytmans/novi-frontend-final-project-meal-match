import { FileText } from '@phosphor-icons/react';
import Header from '../../components/header/Header.jsx';
import SectionDivider from '../../components/misc/sectionDivider/SectionDivider.jsx';
import './TermsAndPolicy.css';

function TermsAndPolicy() {
    return (
        <>
            <Header
                title="Terms & Policy"
                subtitle="Your trust matters: know our terms and privacy policy"
                icon={<FileText className="header__icon"/>}
            />
            <section className="outer-content-container">
                <div className="inner-content-container__column">
                    <SectionDivider title="User Terms"/>
                    <SectionDivider title="Privacy Policy"/>
                </div>
            </section>
        </>
    );
}

export default TermsAndPolicy;