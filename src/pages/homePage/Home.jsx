import { useForm, FormProvider } from 'react-hook-form';
import { House } from '@phosphor-icons/react';
import Button from '../../components/buttons/button/Button.jsx';
import Loader from '../../components/misc/loader/Loader.jsx';
import ErrorMessage from '../../components/misc/errorMessage/ErrorMessage.jsx';
import Logo from '../../components/misc/logo/Logo.jsx';
import SectionDivider from '../../components/misc/sectionDivider/SectionDivider.jsx';
import Header from '../../components/header/Header.jsx';
import EmailField from '../../components/form/emailField/EmailField.jsx';
import UsernameField from '../../components/form/usernameField/UsernameField.jsx';
import PasswordField from '../../components/form/passwordField/PasswordField.jsx';
import './Home.css';



function Home() {
    const methods = useForm({
        mode: 'onTouched',
    });

    function handleFormSubmit(data) {
        console.log(data);
    }

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
                  <FormProvider {...methods}>
                      <form onSubmit={methods.handleSubmit(handleFormSubmit)} noValidate>
                          <EmailField />
                          <UsernameField />
                          <PasswordField />
                          <Button
                              type="submit"
                              className="btn btn__default"
                          >
                              send
                          </Button>
                      </form>
                  </FormProvider>
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