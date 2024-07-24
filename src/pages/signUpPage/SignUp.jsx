import AuthForm from '../../components/form/authForm/AuthForm.jsx';
import UsernameField from '../../components/form/usernameField/UsernameField.jsx';
import EmailField from '../../components/form/emailField/EmailField.jsx';
import PasswordField from '../../components/form/passwordField/PasswordField.jsx';
import ConfirmPasswordField from '../../components/form/passwordField/ConfirmPasswordField.jsx';
import './SignUp.css';


function SignUp() {
    return (
        <div className="sign-up-section outer-content-container">
            <AuthForm
                title="Sign up to Meal Match to save all your favorite recipes in one place!"
                buttonText="Sign up"
                primaryLinkText="Already a member?"
                primaryLink="/sign-in"
                primaryLinkName="Sign In"
            >
                <UsernameField />
                <EmailField />
                <PasswordField />
                <ConfirmPasswordField />
            </AuthForm>
        </div>
    );
}

export default SignUp;