import Button from '../../buttons/button/Button.jsx';
import './ConfirmMessage.css';

function ConfirmMessage( { message, children, onConfirm, onCancel } ) {
    return (
        <div className="confirm-message">
            <h5>{message}</h5>
            <div>{children}</div>
            {onConfirm && onCancel ? (
                <div>
                    <Button
                        onClick={onCancel}
                        className="cancel-btn"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={onConfirm}
                        className="confirm-btn"
                    >
                        Yes
                    </Button>
                </div>
            ) : null}
        </div>
    );
}

export default ConfirmMessage;