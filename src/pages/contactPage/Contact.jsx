import { useForm, FormProvider } from 'react-hook-form';
import { ChatCircleText } from '@phosphor-icons/react';
import Header from '../../components/header/Header.jsx';
import SectionDivider from '../../components/misc/sectionDivider/SectionDivider.jsx';
import TextField from '../../components/form/TextField/TextField.jsx';
import EmailField from '../../components/form/emailField/EmailField.jsx';
import TextArea from '../../components/form/textArea/TextArea.jsx';
import Button from '../../components/buttons/button/Button.jsx';
import './Contact.css';


function Contact() {
    const methods = useForm({
        mode: 'onTouched',
    });

    function handleFormSubmit(data) {
        console.log(data);
    }

    return (
        <>
            <Header
                title="Contact"
                subtitle="Contact us below. We’re here to help with all your foodie questions, culinary support and more."
                icon={<ChatCircleText className="header__icon"/>}
            />
            <section className="outer-content-container">
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
