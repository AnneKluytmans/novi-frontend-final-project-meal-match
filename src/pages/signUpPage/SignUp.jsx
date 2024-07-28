import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthForm from '../../components/form/authForm/AuthForm.jsx';
import UsernameField from '../../components/form/usernameField/UsernameField.jsx';
import EmailField from '../../components/form/emailField/EmailField.jsx';
import PasswordField from '../../components/form/passwordField/PasswordField.jsx';
import ConfirmPasswordField from '../../components/form/passwordField/ConfirmPasswordField.jsx';
import Loader from '../../components/misc/loader/Loader.jsx';
import ErrorMessage from '../../components/misc/errorMessage/ErrorMessage.jsx';
import ConfirmMessage from '../../components/misc/confirmMessage/ConfirmMessage.jsx';
import { API_KEY_AUTH, API_URL_AUTH } from '../../constants/apiConfig.js';
import './SignUp.css';


function SignUp() {
    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);
    const [succesMessage, toggleSuccesMessage] = useState(false);

    const navigate = useNavigate();

    async function handleFormSubmit(data) {
        toggleError(false);
        toggleLoading(true);
        toggleSuccesMessage(false);

        try {
            const response = await axios.post(`${API_URL_AUTH}/users`, {
                username: data.username,
                email: data.email,
                password: data.password,
                info: "",
                authorities: [
                    {
                        authority: "USER"
                    }
                ]
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-Api-Key': API_KEY_AUTH,
                }
            });

            console.log('Registration successful:', response.data);
            toggleSuccesMessage(true);

            setTimeout(() => {
                navigate('/sign-in');
            }, 3000);
        } catch (e) {
            console.error('Error during sign-up:', e);
            toggleError(true);

            setTimeout(() => {
                toggleError(false);
            }, 7000);
        } finally {
            toggleLoading(false);
        }
    }

    return (
        <section className="sign-up-section outer-content-container">
            <div className="sign-up-section__container inner-content-container__column">
                {loading ? (
                    <Loader text="Cooking up a fresh new account for you... 🍳✨"/>
                ) : error ? (
                    <ErrorMessage message="Something went wrong while setting up your profile...🍰❌ Please try again later!"/>
                ) : succesMessage ? (
                    <ConfirmMessage message="Hooray! Your profile is now live and sizzling! 🥳🔥 You’re all set to explore!" autoClose={2500}/>
                ) : (
                    <AuthForm
                        title="Sign up to Meal Match to save all your favorite recipes in one place!"
                        buttonText="Sign up"
                        handleFormSubmit={handleFormSubmit}
                        primaryLink={<p>Already a member? <Link to="/sign-in">Sign In</Link></p>}
                    >
                        <UsernameField />
                        <EmailField />
                        <PasswordField />
                        <ConfirmPasswordField />
                    </AuthForm>
                )}
            </div>
        </section>
    );
}

export default SignUp;