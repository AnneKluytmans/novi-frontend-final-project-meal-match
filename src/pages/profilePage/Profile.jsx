import { User } from '@phosphor-icons/react';
import Header from '../../components/header/Header.jsx';
import './Profile.css';
import DropdownItemProfile from "../../components/dropdowns/dropdownItemProfile/DropdownItemProfile.jsx";


function Profile() {
    const userName = "Davide Gallo"

    function resetUsername() {
        console.log("Reset username");
    }

    return (
      <>
        <Header
            title={`Hello ${userName}`}
            subtitle="Manage your account and personal information here."
            icon={<User className="header__icon" />}
        />
        <DropdownItemProfile
            title="Username:"
            personalDetail={userName}
            onClick={resetUsername}
            buttonText="Reset username"
        />
      </>
    );
}

export default Profile;