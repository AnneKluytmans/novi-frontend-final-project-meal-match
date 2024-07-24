import { Link } from 'react-router-dom';
import { CaretDown, CaretUp, CaretRight, Heart, Trash, User } from '@phosphor-icons/react';
import Header from '../../components/header/Header.jsx';
import SectionDivider from '../../components/sectionDivider/SectionDivider.jsx';
import Dropdown from '../../components/dropdowns/dropdown/Dropdown.jsx';
import DropdownItemProfile from '../../components/dropdowns/dropdownItemProfile/DropdownItemProfile.jsx';
import './Profile.css';
import Button from "../../components/buttons/button/Button.jsx";


function Profile() {
    const username = "Davide Gallo";
    const email = "davidegallo@hotmail.com";
    const password = "1bA23?jh6yJe9!";

    function resetUsername() {
        console.log("Reset username");
    }

    function resetEmail() {
        console.log("Reset email address");
    }

    function resetPassword() {
        console.log("Reset password");
    }

    function deleteAccount() {
        console.log("Account is deleted");
    }

    return (
        <>
            <Header
                title={`Hello ${username}`}
                subtitle="Manage your account and personal information here."
                icon={<User className="header__icon" />}
            />
            <div className="outer-content-container">
                <section className="inner-content-container__column">
                    <SectionDivider title="Personal details" />
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
                            onClick={deleteAccount}
                            className="btn btn__transparent"
                        >
                            <Trash size={24} />
                            Delete Account
                        </Button>
                        <Link to="/favorite-recipes" className="go-to-link">
                            <CaretRight size={22} />
                            Go to your favorite recipes
                            <Heart size={22} />
                        </Link>
                    </div>
                </section>
            </div>
        </>
    );
}

export default Profile;