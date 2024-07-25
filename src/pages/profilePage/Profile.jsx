import { Link } from 'react-router-dom';
import { CaretDown, CaretUp, CaretRight, Heart, Trash, User } from '@phosphor-icons/react';
import Header from '../../components/header/Header.jsx';
import SectionDivider from '../../components/misc/sectionDivider/SectionDivider.jsx';
import Dropdown from '../../components/dropdowns/dropdown/Dropdown.jsx';
import Button from '../../components/buttons/button/Button.jsx';
import './Profile.css';

function Profile() {
    const username = "Davide Gallo";
    const email = "davidegallo@hotmail.com";
    const password = "1bA23?jh6yJe9!";

    function deleteAccount() {
        console.log("Account is deleted");
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
                        <h4>{username}</h4>
                        <h4>{email}</h4>
                        <h4>{password}</h4>
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
                </div>
            </section>
        </>
    );
}

export default Profile;