import { List, X } from '@phosphor-icons/react';
import Button from '../../components/buttons/button/Button.jsx';
import Loader from '../../components/loader/Loader.jsx';
import ErrorMessage from '../../components/errorMessage/ErrorMessage.jsx';
import Logo from '../../components/logo/Logo.jsx';
import SectionDivider from '../../components/sectionDivider/SectionDivider.jsx';
import Dropdown from '../../components/dropdowns/dropdown/Dropdown.jsx';
import './Home.css';


function Home() {
    return (
      <div className="outer-content-container">
          <section className="home-section inner-content-container__column">
              <Logo />
              <h1>Home</h1>
              <Dropdown
                  title="Hamburger Menu"
                  openIcon={<X size={36}/>}
                  closedIcon={<List size={36}/>}
              >
                  <h4>This is a</h4>
                  <h4>Hamburger</h4>
                  <h4>Menu</h4>
              </Dropdown>
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
    );
}

export default Home;