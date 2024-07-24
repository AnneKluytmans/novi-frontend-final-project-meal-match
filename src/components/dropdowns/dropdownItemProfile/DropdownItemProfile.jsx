import './DropdownItemProfile.css';
import Button from "../../buttons/button/Button.jsx";


function DropdownItemProfile( { title, personalDetail, onClick, buttonText } ) {
    return (
        <div className="dropdown-item-profile">
            <div className="personal-details-wrapper">
                <h5>{title}</h5>
                <p>{personalDetail}</p>
            </div>
            <Button
                onClick={onClick}
                className="btn btn__transparent"
            >
                {buttonText}
            </Button>
        </div>
    );
}

export default DropdownItemProfile;