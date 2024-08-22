import { QuestionMark } from '@phosphor-icons/react';
import Header from '../../components/header/Header.jsx';
import SectionDivider from '../../components/misc/sectionDivider/SectionDivider.jsx';
import './Faq.css';

function Faq() {
    return (
      <>
          <Header
              title="FAQ"
              subtitle="Check out our FAQs below for quick help with all your foodie questions"
              icon={<QuestionMark className="header__icon"/>}
          />
          <section className="outer-content-container">
              <div className="inner-content-container__column">
                  <SectionDivider title="FAQ" className="header__icon"/>
              </div>
          </section>
      </>
    );
}

export default Faq;