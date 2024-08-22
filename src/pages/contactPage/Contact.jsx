import { useState, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import emailjs from 'emailjs-com';
import { ChatCircleText } from '@phosphor-icons/react';
import Header from '../../components/header/Header.jsx';
import SectionDivider from '../../components/misc/sectionDivider/SectionDivider.jsx';
import TextField from '../../components/form/TextField/TextField.jsx';
import EmailField from '../../components/form/emailField/EmailField.jsx';
import TextArea from '../../components/form/textArea/TextArea.jsx';
import Button from '../../components/buttons/button/Button.jsx';
import Loader from '../../components/misc/loader/Loader.jsx';
import ErrorMessage from '../../components/misc/errorMessage/ErrorMessage.jsx';
import ConfirmMessage from '../../components/misc/confirmMessage/ConfirmMessage.jsx';
import Overlay from '../../components/misc/overlay/Overlay.jsx';
import { EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, EMAILJS_USER_ID } from '../../constants/emailJsConfig.js';
import './Contact.css';


function Contact() {
    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);
    const [success, toggleSuccess] = useState(false);

    const methods = useForm({
        mode: 'onTouched',
    });

    useEffect(() => {
        // Automatically hides success and error messages after a set duration
        let successTimeout;
        let errorTimeout;

        if (success) {
            successTimeout = setTimeout(() => toggleSuccess(false), 4000);
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
        console.log(data);
        toggleError(false);
        toggleLoading(true);
        toggleSuccess(false);

        try {
            const response = await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, data, EMAILJS_USER_ID);
            console.log('Successfully sent email', response);
            toggleSuccess(true);
        } catch (e) {
            console.error('Failed to send email', e);
            toggleError(true);
        } finally {
            toggleLoading(false);
        }

    }

    return (
        <>
            <Header
                title="Contact"
                subtitle="Contact us below. We’re here to help with all your foodie questions, culinary support and more."
                icon={<ChatCircleText className="header__icon"/>}
            />
            <section className="outer-content-container">
                <Overlay show={loading || error || success}>
                    {loading && <Loader text="Preparing your message for delivery... 📧✨ Please hold on!" />}
                    {error && <ErrorMessage message="Oops! Something went wrong with your message... 🍝⚠️ Please try again!" />}
                    {success && <ConfirmMessage message="Awesome! Your message is on its way! 🥳📬 Expect a reply shortly!" />}
                </Overlay>
                <div className="inner-content-container__column">
                    <SectionDivider title="Contact" />
                    <div className="contact-form__container">
                        <h4 className="default-text-restrictor">
                            Leave your question or message below
                            <br/>
                            We’re here to help you
                        </h4>
                        <FormProvider {...methods}>
                            <form onSubmit={methods.handleSubmit(handleFormSubmit)} noValidate>
                                <TextField name="name" label="Name" />
                                <EmailField />
                                <TextArea />
                                <Button
                                    type="submit"
                                    className="btn btn__default"
                                >
                                    Contact us
                                </Button>
                            </form>
                        </FormProvider>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Contact;
