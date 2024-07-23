import { User } from '@phosphor-icons/react';
import Header from '../../components/header/Header.jsx';
import './Profile.css';


function Profile() {
    const userName = "Davide Gallo"
    return (
      <>
        <Header
            title={`Hello ${userName}`}
            subtitle="Manage your account and personal information here."
            icon={<User className="header__icon" />}
        />
      </>
    );
}

export default Profile;