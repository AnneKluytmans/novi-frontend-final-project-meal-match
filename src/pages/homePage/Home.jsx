import { House } from '@phosphor-icons/react';
import Button from '../../components/buttons/button/Button.jsx';
import Loader from '../../components/loader/Loader.jsx';
import ErrorMessage from '../../components/errorMessage/ErrorMessage.jsx';
import Logo from '../../components/logo/Logo.jsx';
import SectionDivider from '../../components/sectionDivider/SectionDivider.jsx';
import Header from '../../components/header/Header.jsx';
import './Home.css';




function Home() {
    return (
      <>
          <Header
              title="Home Page"
              subtitle="Welcome to Meal Match. Start your culinary adventure."
              icon={<House size={120} />}
          />
          <div className="outer-content-container">
              <section className="home-section inner-content-container__column">
                  <Logo />
                  <h1>Home</h1>
                  <Button
                      className="btn btn__default"
                      onClick={() => { console.log("This button is clicked!"); }}
                  >
                      Try it now
                  </Button>
                  <SectionDivider title="Errors"/>
                  <Loader text="Finding delicious recipes just for you...🍝"/>
                  <Loader />
                  <ErrorMessage message="Something went wrong while fetching the popular recipes...
                  Our chef seems to have misplaced them! 🍳💔" />
              </section>
          </div>
      </>
    );
}

export default Home;