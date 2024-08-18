import { X, List } from '@phosphor-icons/react';
import Dropdown from '../../dropdowns/dropdown/Dropdown.jsx';
import DropdownItem from '../dropdownItem/DropdownItem.jsx';


function HamburgerMenu( { children }) {
    return (
        <Dropdown
            openIcon={<X size={44}/>}
            closedIcon={<List size={44}/>}
            closeOnContentClick={true}
            className="dropdown__nav-bar dropdown__nav-bar--default dropdown__hamburger-menu"
        >
            <DropdownItem to="/" name="Home" />
            <DropdownItem to="/recipe-quiz" name="Recipe Quiz" />
            <DropdownItem to="/ingredient-search" name="Ingredient Search" />
            <DropdownItem to="/all-recipes" name="All Recipes" />
            <DropdownItem to="/contact" name="Contact" />
            <DropdownItem to="/faq" name="Faq" />
            <DropdownItem to="/terms-and-policy" name="Terms and Policy" />
            {children}
        </Dropdown>
    );
}

export default HamburgerMenu;