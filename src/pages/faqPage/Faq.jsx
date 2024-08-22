import { QuestionMark } from '@phosphor-icons/react';
import Header from '../../components/header/Header.jsx';
import SectionDivider from '../../components/misc/sectionDivider/SectionDivider.jsx';
import DropdownFaq from '../../components/dropdowns/dropdownFaq/DropdownFaq.jsx';
import './Faq.css';


function Faq() {
    return (
      <>
          <Header
              title="FAQ"
              subtitle="Check out our FAQs below for quick help with all your foodie questions"
              icon={<QuestionMark className="header__icon--big"/>}
          />
          <section className="outer-content-container faq-section">
              <div className="inner-content-container__column">
                  <SectionDivider title="FAQ" className="header__icon"/>
                  <DropdownFaq
                      question="How does Meal Match work?"
                      answer="Meal Match works by offering personalized recipe suggestions tailored to yout preferences.
                      You can receive these suggestions either by taking our recipe quiz or by exploring recipes using
                      our different search options. Once you find recipes you love, you can save them for future
                      reference."
                  />
                  <DropdownFaq
                      question="Is creating an account necessary?"
                      answer="No, creating an account is optional. However, having an account allows you to save
                      recipes for future reference."
                  />
                  <DropdownFaq
                      question="Is my personal information safe?"
                      answer="Yes, we take your privacy seriously. We only collect necessary information like your
                      email address and password. Your data is stored securely and used only as described in our
                      Privacy Policy."
                  />
                  <DropdownFaq
                      question="Does Meal Match offer dietary preferences?"
                      answer="Yes, Meal Match allows you to filter recipes based on dietary preferences such as
                      vegetarian, vegan and gluten-free."
                  />
                  <DropdownFaq
                      question="Can I contribute my own recipes?"
                      answer="Currently, Meal Match focuses on providing curated recipes to users. However, we are
                      exploring options for user-generated content in the future."
                  />
              </div>
          </section>
      </>
    );
}

export default Faq;