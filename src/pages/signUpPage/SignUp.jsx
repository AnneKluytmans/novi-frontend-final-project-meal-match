import {useEffect, useState} from 'react';
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
import Overlay from '../../components/misc/overlay/Overlay.jsx';
import { API_KEY_AUTH, API_URL_AUTH } from '../../constants/apiConfig.js';
import './SignUp.css';


function SignUp() {
    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);
    const [success, toggleSuccess] = useState(false);

    const navigate = useNavigate();
    const controller = new AbortController();

    useEffect(() => {
        // Cancels ongoing Axios requests on component unmount
        return function cleanup() {
            console.log('Unmount effect is triggered. Abort ongoing axios requests');
            controller.abort();
        }
    }, []);

    useEffect(() => {
        // Automatically hides success and error messages after a set duration
        let successTimeout;
        let errorTimeout;

        if (success) {
            successTimeout = setTimeout(() => {
                navigate('/sign-in');
                toggleSuccess(false);
            }, 3000);
        }

        if (error) {
            errorTimeout = setTimeout(() => toggleError(false), 7000);
        }

        return function cleanup() {
            console.log('Unmount effect is triggered. Clean up timers');
            clearTimeout(successTimeout);
            clearTimeout(errorTimeout);
        };
    }, [success, error]);

    async function handleFormSubmit(data) {
        toggleError(false);
        toggleLoading(true);
        toggleSuccess(false);

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
                },
                signal: controller.signal,
            });

            console.log('Registration successful:', response.data);
            toggleSuccess(true);
        } catch (e) {
            console.error('Error during sign-up:', e);
            toggleError(true);
        } finally {
            toggleLoading(false);
        }
    }

    return (
        <section className="sign-up-section outer-content-container">
            <Overlay show={loading || error || success }>
                {loading &&
                    <Loader text="Cooking up a fresh new account for you... 🍳✨"/>
                }
                {error &&
                    <ErrorMessage message="Something went wrong while setting up your profile...🍰❌
                    Please try again later!"/>
                }
                {success &&
                    <ConfirmMessage message="Hooray! Your profile is now live and sizzling! 🥳🔥 You’re all set to explore!"/>
                }
            </Overlay>
            <div className="sign-up-section__container inner-content-container__column">
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
            </div>
        </section>
    );
}

export default SignUp;