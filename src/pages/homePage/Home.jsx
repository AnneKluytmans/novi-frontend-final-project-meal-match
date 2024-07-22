import { useForm } from 'react-hook-form';
import { House } from '@phosphor-icons/react';
import Button from '../../components/buttons/button/Button.jsx';
import Loader from '../../components/loader/Loader.jsx';
import ErrorMessage from '../../components/errorMessage/ErrorMessage.jsx';
import Logo from '../../components/logo/Logo.jsx';
import SectionDivider from '../../components/sectionDivider/SectionDivider.jsx';
import Header from '../../components/header/Header.jsx';
import InputField from '../../components/form/inputField/InputField.jsx';
import './Home.css';
import isEmailValid from "../../helpers/isEmailValid.js";



function Home() {
    const { handleSubmit, formState: { errors }, register } = useForm({
        mode: "onTouched"
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
                  <form onSubmit={handleSubmit(handleFormSubmit)} noValidate>
                      <InputField
                          id="email-field"
                          type="email"
                          name="email"
                          label="Email Address"
                          register={register}
                          validation={{
                              required: 'Email is required',
                              validate: isEmailValid,
                              maxLength: { value: 50, message: `Email cannot exceed 50 characters` }
                          }}
                          error={errors.email}
                      />
                      <Button
                          type="submit"
                          className="btn btn__default"
                      >
                          send
                      </Button>
                  </form>
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