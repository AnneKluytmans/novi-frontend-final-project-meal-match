import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { CaretDown, CaretUp, CaretRight, Heart, Trash, User } from '@phosphor-icons/react';
import { AuthContext } from '../../context/AuthContext';
import Header from '../../components/header/Header.jsx';
import SectionDivider from '../../components/misc/sectionDivider/SectionDivider.jsx';
import Dropdown from '../../components/dropdowns/dropdown/Dropdown.jsx';
import DropdownItemProfile from '../../components/dropdowns/dropdownItemProfile/DropdownItemProfile.jsx';
import Button from '../../components/buttons/button/Button.jsx';
import ConfirmMessage from '../../components/misc/confirmMessage/ConfirmMessage.jsx';
import './Profile.css';


function Profile() {
    const [deleteAccountSuccess, toggleDeleteAccountSuccess] = useState(false);
    const [deleteAccountConfirm, toggleDeleteAccountConfirm] = useState(false);
    const [resetPasswordMessage, toggleResetPasswordMessage] = useState(false);

    const { user, logout } = useContext(AuthContext);

    const username = user.username;
    const email = user.email;
    const password = "secret";

    function resetUsername() {
        console.log("Reset username");
    }

    function resetEmail() {
        console.log("Reset email address");
    }

    function resetPassword() {
        console.log("Reset password");
        toggleResetPasswordMessage(false);
        setTimeout(() => toggleResetPasswordMessage(true), 0);
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
                    <Dropdown
                        title="Your Personal Details"
                        openIcon={<CaretUp size={28}/>}
                        closedIcon={<CaretDown size={28}/>}
                        className="dropdown__profile-page"
                    >
                        <DropdownItemProfile
                            title="Username"
                            personalDetail={username}
                            onClick={resetUsername}
                            buttonText="Reset username"
                        />
                        <DropdownItemProfile
                            title="E-mail"
                            personalDetail={email}
                            onClick={resetEmail}
                            buttonText="Reset email"
                        />
                        <DropdownItemProfile
                            title="Password"
                            personalDetail={password}
                            onClick={resetPassword}
                            buttonText="Reset password"
                        />
                    </Dropdown>
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
                    {resetPasswordMessage && (
                        <ConfirmMessage
                            message="You're password is successfully changed"
                            autoClose={2000}
                        />
                    )}
                </div>
            </section>
        </>
    );
}

export default Profile;