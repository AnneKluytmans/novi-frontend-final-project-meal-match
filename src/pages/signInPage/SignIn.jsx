import { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import AuthForm from '../../components/form/authForm/AuthForm.jsx';
import UsernameField from '../../components/form/usernameField/UsernameField.jsx';
import PasswordField from '../../components/form/passwordField/PasswordField.jsx';
import Loader from '../../components/misc/loader/Loader.jsx';
import ErrorMessage from '../../components/misc/errorMessage/ErrorMessage.jsx';
import ConfirmMessage from '../../components/misc/confirmMessage/ConfirmMessage.jsx';
import Overlay from '../../components/misc/overlay/Overlay.jsx';
import { API_KEY_AUTH, API_URL_AUTH } from '../../constants/apiConfig.js';
import './SignIn.css';


function SignIn() {
    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);

    const { login, loading: contextLoading, error: contextError, success: contextSuccess } = useContext(AuthContext);

    const source = axios.CancelToken.source();

    useEffect(() => {
        // Clean up function to cancel ongoing Axios requests on component unmount
        return function cleanup() {
            source.cancel();
        }
    }, []);

    useEffect(() => {
        let errorTimeout;

        if (error) {
            errorTimeout = setTimeout(() => toggleError(false), 7000);
        }

        return () => {
            clearTimeout(errorTimeout);
        };
    }, [error]);

    async function handleFormSubmit(data) {
        toggleError(false);
        toggleLoading(true);

        try {
            const response = await axios.post(`${API_URL_AUTH}/users/authenticate`, {
                username: data.username,
                password: data.password,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-Api-Key': API_KEY_AUTH,
                },
                cancelToken: source.token,
            });

            console.log('JWT token received:', response.data);
            login(response.data.jwt);
        } catch (e) {
            console.error('Error during sign-in:', e);
            toggleError(true);
        } finally {
            toggleLoading(false);
        }
    }

    return (
        <section className="sign-in-section outer-content-container">
            <Overlay show={loading || contextLoading || error || contextError || contextSuccess}>
                {contextLoading || loading &&
                    <Loader text="Whisking you into your account... 🍰✨ Hang tight!"/>
                }
                {contextError || error &&
                    <ErrorMessage message="Oh no! Our chef couldn't authenticate your details... 🔑❌
                    Please double-check your username and password and try again!"/>
                }
                {contextSuccess &&
                    <ConfirmMessage message="Welcome back! You’ve successfully logged in! 🥳🍴Let's get started!"/>
                }
            </Overlay>
            <div className="sign-in-section__container inner-content-container__column">
                    <AuthForm
                        title="Sign in to access your saved recipes and to save more favorite recipes."
                        buttonText="Sign in"
                        handleFormSubmit={handleFormSubmit}
                        primaryLink={<p>No account yet? <Link to="/sign-up">Sign Up</Link></p>}
                    >
                        <UsernameField/>
                        <PasswordField/>
                    </AuthForm>
            </div>
        </section>
    );
}

export default SignIn;