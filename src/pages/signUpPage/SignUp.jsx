import AuthForm from '../../components/form/authForm/AuthForm.jsx';
import EmailField from '../../components/form/emailField/EmailField.jsx';
import PasswordField from '../../components/form/passwordField/PasswordField.jsx';
import UsernameField from '../../components/form/usernameField/UsernameField.jsx';
import './SignUp.css';

function SignUp() {
    return (
        <>
            <h1>Sign Up</h1>
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
            </AuthForm>

        </>
    );
}

export default SignUp;