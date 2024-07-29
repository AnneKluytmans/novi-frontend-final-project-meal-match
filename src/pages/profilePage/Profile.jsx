import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import axios from 'axios';
import { CaretDown, CaretUp, CaretRight, Heart, Trash, User } from '@phosphor-icons/react';
import { AuthContext } from '../../context/AuthContext';
import Header from '../../components/header/Header.jsx';
import SectionDivider from '../../components/misc/sectionDivider/SectionDivider.jsx';
import Dropdown from '../../components/dropdowns/dropdown/Dropdown.jsx';
import DropdownItemProfile from '../../components/dropdowns/dropdownItemProfile/DropdownItemProfile.jsx';
import UsernameField from '../../components/form/usernameField/UsernameField.jsx';
import EmailField from '../../components/form/emailField/EmailField.jsx';
import PasswordField from '../../components/form/passwordField/PasswordField.jsx';
import ConfirmPasswordField from '../../components/form/passwordField/ConfirmPasswordField.jsx';
import Button from '../../components/buttons/button/Button.jsx';
import Loader from '../../components/misc/loader/Loader.jsx';
import ErrorMessage from '../../components/misc/errorMessage/ErrorMessage.jsx';
import ConfirmMessage from '../../components/misc/confirmMessage/ConfirmMessage.jsx';
import { API_KEY_AUTH, API_URL_AUTH } from '../../constants/apiConfig.js';
import './Profile.css';


function Profile() {
    const [resetField, setResetField] = useState(null);
    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);
    const [success, toggleSuccess] = useState(false);
    const [deleteAccountSuccess, toggleDeleteAccountSuccess] = useState(false);
    const [deleteAccountConfirm, toggleDeleteAccountConfirm] = useState(false);

    const { user, logout, toggleFetchNewData, fetchNewData } = useContext(AuthContext);

    const token = localStorage.getItem('token');
    const username = user.username;
    const email = user.email;
    const password = "secret";

    const methods = useForm();

    async function updateUserData(data, field) {
        toggleError(false);
        toggleLoading(true);
        toggleSuccess(false);

        try {
            const response = await axios.put(`${API_URL_AUTH}/users/${username}`, {
                [field]: data[field],
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-Api-Key': API_KEY_AUTH,
                    'Authorization': `Bearer ${ token }`,
                },
            });

            console.log('User data is updated:', response.data);
            toggleSuccess(true);

            if (field === 'username') {
                alert("Username has been updated. Please log in again with your new username.");
                logout('/sign-in'); // Clears the session and redirects to the login page
            } else {
                toggleFetchNewData(!fetchNewData);
            }
        } catch (e) {
            console.error('User data is not updated:', e);
            toggleError(true);
            setTimeout(() => toggleError(false), 7000);
        } finally {
            toggleLoading(false);
            setResetField(null);
        }
    }

    async function handleFormSubmit(data) {
        try {
            await updateUserData(data, resetField);
        } catch (e) {
            console.e('Error updating user data:', e);
        }
    }

    function deleteAccount() {
        //Within the NOVI backend, users do not have the right to delete their accounts.
        //Due to the backend's restrictions the deleteAccount function below is a placeholder, meant to simulate the user experience of deleting an account.
        console.log("Account is deleted");
        toggleDeleteAccountConfirm(false);
        toggleDeleteAccountSuccess(true);

        setTimeout(() => logout(), 3000);
    }

    return (
        <>
            <Header
                title={`Hello ${username}`}
                subtitle="Manage your account and personal information here."
                icon={<User className="header__icon"/>}
            />
            <section className="outer-content-container">
                <div className="inner-content-container__column">
                    <SectionDivider title="Personal details"/>
                    {loading && <Loader text="Mixing the perfect blend for your updated profile... 🍰✨ Please wait!" />}
                    {error && <ErrorMessage message="Oh no! The recipe for your updates didn’t go as planned... 🍪️❌ Please give it another shot!" />}
                    {success && <ConfirmMessage message="Awesome! Your information is refreshed and sizzling! 🥳🔥" autoClose={2500} />}
                    <Dropdown
                        title="Your Personal Details"
                        openIcon={<CaretUp size={28}/>}
                        closedIcon={<CaretDown size={28}/>}
                        className="dropdown__profile-page"
                    >
                        <DropdownItemProfile
                            title="Username"
                            personalDetail={username}
                            onClick={() => setResetField("username")}
                            buttonText="Reset username"
                        />
                        <DropdownItemProfile
                            title="E-mail"
                            personalDetail={email}
                            onClick={() => setResetField("email")}
                            buttonText="Reset email"
                        />
                        <DropdownItemProfile
                            title="Password"
                            personalDetail={password}
                            onClick={() => setResetField("password")}
                            buttonText="Reset password"
                        />
                    </Dropdown>
                    {resetField === 'username' && (
                        <ConfirmMessage message="Update your username">
                            <FormProvider {...methods}>
                                <form onSubmit={methods.handleSubmit(handleFormSubmit)}>
                                    <UsernameField />
                                    <Button className="cancel-btn" type="button" onClick={() => setResetField(null)}>Cancel</Button>
                                    <Button className="confirm-btn" type="submit">Save</Button>
                                </form>
                            </FormProvider>
                        </ConfirmMessage>
                    )}
                    {resetField === 'email' && (
                        <ConfirmMessage message="Update your e-mail address">
                            <FormProvider {...methods}>
                                <form onSubmit={methods.handleSubmit(handleFormSubmit)}>
                                    <EmailField />
                                    <Button className="cancel-btn" type="button" onClick={() => setResetField(null)}>Cancel</Button>
                                    <Button className="confirm-btn" type="submit">Save</Button>
                                </form>
                            </FormProvider>
                        </ConfirmMessage>
                    )}
                    {resetField === 'password' && (
                        <ConfirmMessage message="Update your password">
                            <FormProvider {...methods}>
                                <form onSubmit={methods.handleSubmit(handleFormSubmit)}>
                                    <PasswordField />
                                    <ConfirmPasswordField />
                                    <Button className="cancel-btn" type="button" onClick={() => setResetField(null)}>Cancel</Button>
                                    <Button className="confirm-btn" type="submit">Save</Button>
                                </form>
                            </FormProvider>
                        </ConfirmMessage>
                    )}
                    <div className="btn-link-wrapper">
                        <Button
                            onClick={() => toggleDeleteAccountConfirm(true)}
                            className="btn btn__transparent"
                        >
                            <Trash size={24} />
                            Delete Account
                        </Button>
                        {deleteAccountConfirm && (
                            <ConfirmMessage
                                message="Are you sure you want to delete your account?"
                                onConfirm={deleteAccount}
                                onCancel={() => toggleDeleteAccountConfirm(false)}
                            />
                        )}
                        {deleteAccountSuccess && (
                            <ConfirmMessage
                                message="Your account has been successfully removed! 🎉🍪 We’ll miss you!"
                                autoClose={3000}
                            />
                        )}
                        <Link to="/favorite-recipes" className="go-to-link">
                            <CaretRight size={22} />
                            Go to your favorite recipes
                            <Heart size={22} />
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Profile;