import { Link } from 'react-router-dom';
import { useForm, FormProvider } from 'react-hook-form';
import Logo from '../../misc/logo/Logo.jsx';
import Button from '../../buttons/button/Button.jsx';
import './AuthForm.css';


function AuthForm({ title, children, buttonText, handleFormSubmit, primaryLink, secondaryLink } ) {
    const methods = useForm({
        mode: 'onTouched',
    });

    return (
        <div className="form__container">
            <div className="form__header">
                <span className="form__logo-wrapper"><Logo /></span>
                <h5>{title}</h5>
            </div>
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(handleFormSubmit)} noValidate>
                    {children}
                    <Button
                        type="submit"
                        className="btn btn__default"
                    >
                        {buttonText}
                    </Button>
                </form>
            </FormProvider>
            <div className="form__links">
                {primaryLink}
                {secondaryLink}
            </div>
            <p className="form__terms-policy">By continuing you agree to Meal Match’s
                <Link to="/terms-and-policy"> terms </Link> and acknowledge you’ve read our
                <Link to="/terms-and-policy"> privacy policy </Link></p>
        </div>
    );
}

export default AuthForm;