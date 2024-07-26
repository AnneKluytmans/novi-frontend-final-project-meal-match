import { Link } from 'react-router-dom';
import AuthForm from '../../components/form/authForm/AuthForm.jsx';
import UsernameField from '../../components/form/usernameField/UsernameField.jsx';
import PasswordField from '../../components/form/passwordField/PasswordField.jsx';
import './SignIn.css';

function SignIn() {
    function handleFormSubmit(data) {
        console.log(data);
    }

    return (
        <section className="sign-in-section outer-content-container">
            <AuthForm
                title="Sign in to access your saved recipes and to save more favorite recipes."
                buttonText="Sign in"
                handleFormSubmit={handleFormSubmit}
                primaryLink={<p>No account yet? <Link to="/sign-up">Sign Up</Link></p>}
            >
                <UsernameField/>
                <PasswordField/>
            </AuthForm>
        </section>
    );
}

export default SignIn;