import { ChatCircleText } from '@phosphor-icons/react';
import Header from '../../components/header/Header.jsx';
import SectionDivider from '../../components/misc/sectionDivider/SectionDivider.jsx';
import './Contact.css';

function Contact() {
    return (
      <>
          <Header
              title="Contact"
              subtitle="Contact us below. We’re here to help with all your foodie questions, culinary support and more."
              icon={<ChatCircleText className="header__icon"/>}
          />
          <section className="outer-content-container">
              <div className="inner-content-container__column">
                  <SectionDivider title="Contact" />
                  <h3>Contact form</h3>
              </div>
          </section>
      </>
    );
}

export default Contact;
