import { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { User, Heart, SignOut } from '@phosphor-icons/react';
import { AuthContext } from '../../../context/AuthContext.jsx';
import Logo from '../../misc/logo/Logo.jsx';
import Button from '../../buttons/button/Button.jsx';
import NavLinkItem from '../navLinkItem/NavLinkItem.jsx';
import DropdownItem from '../dropdownItem/DropdownItem.jsx';
import DropdownNavigation from '../dropdownNavigation/DropdownNavigation.jsx';
import HamburgerMenu from '../hamburgerMenu/HamburgerMenu.jsx';
import ConfirmMessage from '../../misc/confirmMessage/ConfirmMessage.jsx';
import Overlay from '../../misc/overlay/Overlay.jsx';
import './NavBar.css';


function NavBar() {
    const [showConfirm, setShowConfirm] = useState(false);

    const { isAuth, logout } = useContext(AuthContext);

    function handleLogout() {
        setShowConfirm(true);
    }

    function confirmLogout() {
        logout();
        setShowConfirm(false);
    }

    function cancelLogout() {
        setShowConfirm(false);
    }

    return (
        <>
            <nav className="nav-bar outer-content-container">
                <div className="nav-bar__container">
                    <div className="hamburger-menu__mobile">
                        <HamburgerMenu>
                            {isAuth ?
                                <>
                                    <DropdownItem to="/profile" name="Profile"/>
                                    <DropdownItem to="/favorite-recipes" name="Favorite Recipes"/>
                                    <Button onClick={handleLogout}>
                                        <h5 className="sign-out__btn">Sign Out</h5>
                                    </Button>
                                </>
                                :
                                <>
                                    <DropdownItem to="/sign-in" name="Sign In"/>
                                    <DropdownItem to="/sign-up" name="Sign Up"/>
                                </>
                            }
                        </ HamburgerMenu>
                    </div>
                    <div className="hamburger-menu__small-desktop">
                        <HamburgerMenu/>
                    </div>
                    <Logo/>
                    <div className="nav-bar__links-wrapper">
                        <ul className="nav-links-wrapper">
                            <NavLinkItem to="/" name="Home"/>
                            <NavLinkItem to="/recipe-quiz" name="Recipe Quiz"/>
                            <NavLinkItem to="/ingredient-search" name="Ingredient search"/>
                            <NavLinkItem to="/all-recipes" name="All Recipes"/>
                            <DropdownNavigation
                                title="Help & Support"
                                className="dropdown__nav-bar--default"
                            >
                                <DropdownItem to="/contact" name="Contact"/>
                                <DropdownItem to="/faq" name="Faq"/>
                                <DropdownItem to="/terms-and-policy" name="Terms and Policy"/>
                            </DropdownNavigation>
                        </ul>
                        <ul className="profile-links-wrapper">
                            {isAuth ?
                                <div className="profile-links">
                                    <li>
                                        <NavLink to="/profile">
                                            <User size={24} weight="bold" className="profile-link"/>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/favorite-recipes">
                                            <Heart size={24} weight="bold" className="profile-link"/>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <Button onClick={handleLogout}>
                                            <SignOut size={24} weight="bold" className="profile-link"/>
                                        </Button>
                                    </li>
                                </div>
                                :
                                <DropdownNavigation
                                    title="Sign In"
                                    className="dropdown__nav-bar--small"
                                >
                                    <DropdownItem to="/sign-in" name="Sign In"/>
                                    <DropdownItem to="/sign-up" name="Sign Up"/>
                                </DropdownNavigation>
                            }
                        </ul>
                    </div>
                </div>
            </nav>
            {showConfirm && (
                <Overlay show={showConfirm}>
                    <ConfirmMessage
                        message="Are you sure you want to log out?"
                        onConfirm={confirmLogout}
                        onCancel={cancelLogout}
                    />
                </Overlay>
            )}
        </>
    );
}

export default NavBar;