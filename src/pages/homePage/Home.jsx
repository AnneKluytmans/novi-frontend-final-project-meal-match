import './Home.css';
import Button from "../../components/buttons/button/Button.jsx";

function Home() {
    return (
      <div className="outer-content-container">
          <section className="home-section inner-content-container__column">
              <h1>Home</h1>
              <Button
                  className="btn btn__default"
                  onClick={() => { console.log("This button is clicked!"); }}
              >
                  Try it now
              </Button>
          </section>
      </div>
    );
}

export default Home;