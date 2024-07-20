import { CaretDown, CaretUp, LineVertical } from '@phosphor-icons/react';
import Dropdown from '../../dropdowns/dropdown/Dropdown.jsx';
import './DropdownNavigation.css';

function DropdownNavigation({ title, className, children } ) {
    return (
        <li className="dropdown-navigation">
            <LineVertical size={28}/>
            <Dropdown
                title={title}
                openIcon={<CaretUp size={22}/>}
                closedIcon={<CaretDown size={22}/>}
                className={`dropdown__nav-bar dropdown__nav-link ${className}`}
            >
                {children}
            </Dropdown>
        </li>
    );
}

export default DropdownNavigation;