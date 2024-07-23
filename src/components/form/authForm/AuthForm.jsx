import { useForm, FormProvider } from 'react-hook-form';
import Button from '../../buttons/button/Button.jsx';
import './AuthForm.css';


function AuthForm({ children, buttonText } ) {
    const methods = useForm({
        mode: 'onTouched',
    });

    function handleFormSubmit(data) {
        console.log(data);
    }

    return (
        <div className="form__container">
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
        </div>
    );
}

export default AuthForm;