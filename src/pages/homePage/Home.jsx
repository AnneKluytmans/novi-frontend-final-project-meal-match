import Button from '../../components/buttons/button/Button.jsx';
import Loader from '../../components/loader/Loader.jsx';
import ErrorMessage from '../../components/errorMessage/ErrorMessage.jsx';
import Logo from '../../components/logo/Logo.jsx';
import './Home.css';



function Home() {
    return (
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
              <Loader text="Finding delicious recipes just for you...🍝"/>
              <Loader />
              <ErrorMessage message="Something went wrong while fetching the popular recipes...
              Our chef seems to have misplaced them! 🍳💔" />
          </section>
      </div>
    );
}

export default Home;