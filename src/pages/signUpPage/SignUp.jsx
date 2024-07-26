import { Link } from 'react-router-dom';
import AuthForm from '../../components/form/authForm/AuthForm.jsx';
import UsernameField from '../../components/form/usernameField/UsernameField.jsx';
import EmailField from '../../components/form/emailField/EmailField.jsx';
import PasswordField from '../../components/form/passwordField/PasswordField.jsx';
import ConfirmPasswordField from '../../components/form/passwordField/ConfirmPasswordField.jsx';
import './SignUp.css';


function SignUp() {
    function handleFormSubmit(data) {
        console.log(data);
    }

    return (
        <section className="sign-up-section outer-content-container">
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
        </section>
    );
}

export default SignUp;