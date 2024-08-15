import { NavLink } from 'react-router-dom';
import './DropdownItem.css';

function DropdownItem({ to, name } ) {
    return (
        <NavLink
            to={to}
            className={({ isActive }) => `dropdown__item ${isActive ? 'active-dropdown-item' : 'default-dropdown-item'}`}
        >
            <h5>{name}</h5>
        </NavLink>
    );
}

export default DropdownItem;