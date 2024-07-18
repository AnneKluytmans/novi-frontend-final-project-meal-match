import { useState } from 'react';
import './Dropdown.css';
import Button from "../../buttons/button/Button.jsx";

function Dropdown ( { title, openIcon, closedIcon, children, className = '' } ) {
    const [isOpen, toggleIsOpen] = useState(false);

    function toggleDropdown() {
        toggleIsOpen(!isOpen);
    }

    return (
        <div className={`dropdown ${className}`}>
            <Button
                className={"dropdown__header"}
                onClick={toggleDropdown}
            >
                <span className={"dropdown__title"}>
                    {title}
                </span>
                <span className={"dropdown__icon"}>
                    {isOpen ? openIcon : closedIcon}
                </span>
            </Button>
            {isOpen && (
                <div className={"dropdown__content"}>
                    {children}
                </div>
            )}
        </div>
    );
}

export default Dropdown;