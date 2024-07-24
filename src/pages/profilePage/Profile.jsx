import {CaretDown, CaretUp, User} from '@phosphor-icons/react';
import Header from '../../components/header/Header.jsx';
import SectionDivider from '../../components/sectionDivider/SectionDivider.jsx';
import Dropdown from '../../components/dropdowns/dropdown/Dropdown.jsx';
import DropdownItemProfile from '../../components/dropdowns/dropdownItemProfile/DropdownItemProfile.jsx';
import './Profile.css';


function Profile() {
    const username = "Davide Gallo";
    const email = "davidegallo@hotmail.com";
    const password = "1bA23?jh6yJe9!";

    function resetUsername() {
        console.log("Reset username");
    }

    function resetEmail() {
        console.log("Reset Email adress");
    }

    function resetPassword() {
        console.log("Reset Password");
    }

    return (
        <>
            <Header
                title={`Hello ${username}`}
                subtitle="Manage your account and personal information here."
                icon={<User className="header__icon" />}
            />
            <div className="outer-content-container">
                <section className="personal-details-section inner-content-container__column">
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
                </section>
            </div>
        </>
    );
}

export default Profile;