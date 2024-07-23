import AuthForm from '../../components/form/authForm/AuthForm.jsx';
import UsernameField from '../../components/form/usernameField/UsernameField.jsx';
import PasswordField from '../../components/form/passwordField/PasswordField.jsx';
import './SignIn.css';


function SignIn() {
    return (
        <div className="sign-in-section outer-content-container">
            <AuthForm
                title="Sign in to access your saved recipes and to save more favorite recipes."
                buttonText="Sign in"
                primaryLinkText="No account yet?"
                primaryLink="/sign-up"
                primaryLinkName="Sign Up"
            >
                <UsernameField/>
                <PasswordField/>
            </AuthForm>
        </div>
    );
}

export default SignIn;