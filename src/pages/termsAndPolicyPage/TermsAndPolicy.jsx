import { Link } from 'react-router-dom';
import { FileText } from '@phosphor-icons/react';
import Header from '../../components/header/Header.jsx';
import SectionDivider from '../../components/misc/sectionDivider/SectionDivider.jsx';
import './TermsAndPolicy.css';

function TermsAndPolicy() {
    return (
        <>
            <Header
                title="Terms & Policy"
                subtitle="Your trust matters: know our terms and privacy policy"
                icon={<FileText className="header__icon"/>}
            />
            <section className="outer-content-container">
                <div className="inner-content-container__column">
                    <SectionDivider title="User Terms"/>
                    <div className="terms-policy__container">
                        <h4 className="default-text-restrictor">
                            Welcome to Meal Match! By using our application, you agree to the following terms:
                        </h4>
                        <ol className="terms-policy__list">
                            <li className="terms-policy__item">
                                <p>
                                    <em>Account Creation:</em> You can create an account voluntarily to save recipes.
                                    Your account will store your email address and password.
                                </p>
                            </li>
                            <li className="terms-policy__item">
                                <p>
                                    <em>Rights:</em> Rights to all content are reserved by Meal Match. Recipe rights are
                                    attributed to Edamam API.
                                </p>
                            </li>
                            <li className="terms-policy__item">
                                <p>
                                    <em>Purpose of Use:</em> Meal Match helps you discover recipes tailored to your
                                    mood,
                                    diet, or available ingredients. You can save your favorite recipes and use our
                                    search function to explore all recipes available.
                                </p>
                            </li>
                            <li className="terms-policy__item">
                                <p>
                                    <em>Personal Use:</em> You agree to use Meal Match solely for personal purposes and
                                    not
                                    for any commercial or illegal activities.
                                </p>
                            </li>
                            <li className="terms-policy__item">
                                <p>
                                    <em>Data Privacy:</em> We respect your privacy. Your information will be securely
                                    stored
                                    and used only as described in our Privacy Policy.
                                </p>
                            </li>
                            <li className="terms-policy__item">
                                <p>
                                    <em>Changes to Terms:</em> Meal Match reserves the right to update these terms as
                                    needed.
                                    Continued use of the application constitutes acceptance of any changes.
                                </p>
                            </li>
                            <li className="terms-policy__item">
                                <p>
                                    <em>User-Provided Content:</em> We collect and store any user-generated content,
                                    including reviews, comments, and messages that you voluntarily submit to our
                                    platform.
                                </p>
                            </li>
                        </ol>
                        <p>
                            By using Meal Match, you consent to our user terms.
                            <br/>
                            If you have any questions about our terms you can contact us <Link to="/contact">here</Link>.
                        </p>
                        <p><em>Thank you for joining Meal Match and happy cooking!</em></p>
                    </div>
                </div>
            </section>
            <section className="outer-content-container">
                <div className="inner-content-container__column">
                    <SectionDivider title="Privacy Policy"/>
                </div>
            </section>
        </>
    );
}

export default TermsAndPolicy;