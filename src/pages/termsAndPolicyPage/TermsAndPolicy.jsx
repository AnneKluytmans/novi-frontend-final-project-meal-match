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
                                    mood, diet, or available ingredients. You can save your favorite recipes and use our
                                    search function to explore all recipes available.
                                </p>
                            </li>
                            <li className="terms-policy__item">
                                <p>
                                    <em>Personal Use:</em> You agree to use Meal Match solely for personal purposes and
                                    not for any commercial or illegal activities.
                                </p>
                            </li>
                            <li className="terms-policy__item">
                                <p>
                                    <em>Data Privacy:</em> We respect your privacy. Your information will be securely
                                    stored and used only as described in our Privacy Policy.
                                </p>
                            </li>
                            <li className="terms-policy__item">
                                <p>
                                    <em>Changes to Terms:</em> Meal Match reserves the right to update these terms as
                                    needed. Continued use of the application constitutes acceptance of any changes.
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
                        <p className="default-text-restrictor">
                            By using Meal Match, you consent to our user terms.
                            <br/>
                            If you have any questions about our terms you can contact us <Link to="/contact">here</Link>.
                        </p>
                        <p><em>Thank you for joining Meal Match and happy cooking!</em></p>
                    </div>
                </div>
            </section>
            <section className="outer-content-container policy-section">
                <div className="inner-content-container__column">
                    <SectionDivider title="Privacy Policy"/>
                    <div className="terms-policy__container">
                        <h4 className="default-text-restrictor">
                            Your privacy is important to us at Meal Match. Here&apos;s how we handle your privacy:
                        </h4>
                        <ol className="terms-policy__list">
                            <li className="terms-policy__item">
                                <p>
                                    <em>Information We Collect:</em> When you create an account, we collect your email
                                    address and password. We also do collect any optional information you provide, such
                                    as reviews or messages.
                                </p>
                            </li>
                            <li className="terms-policy__item">
                                <p>
                                    <em>How We Use Your Information:</em> We use your information to provide account
                                    access, and enhance our services. Your data is never shared with third parties for
                                    marketing purposes.
                                </p>
                            </li>
                            <li className="terms-policy__item">
                                <p>
                                    <em>Security Measures:</em> We implement industry-standard security measures to
                                    protect your personal information from unauthorized access or disclosure.
                                </p>
                            </li>
                            <li className="terms-policy__item">
                                <p>
                                    <em>Account Deletion:</em> You can delete your account and personal information at
                                    any time through the application settings.
                                </p>
                            </li>
                            <li className="terms-policy__item">
                                <p>
                                    <em>Policy Updates:</em> We may update our Privacy Policy to reflect changes in our
                                    practices. We will notify you of any significant updates.
                                </p>
                            </li>
                        </ol>
                        <p className="default-text-restrictor">
                            By using Meal Match, you consent to the collection and use of your information as outlined
                            in this Privacy Policy.
                            <br/>
                            If you have any questions about our policy you can contact us <Link to="/contact">here</Link>.
                        </p>
                        <p><em>Thank you for joining Meal Match and happy cooking!</em></p>
                    </div>
                </div>
            </section>
        </>
    );
}

export default TermsAndPolicy;