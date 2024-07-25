import { useState, useEffect } from 'react';
import Button from '../../buttons/button/Button.jsx';
import './ConfirmMessage.css';

function ConfirmMessage( { message, onConfirm, onCancel, autoClose } ) {
    const [messageVisible, setMessageVisible] = useState(true);

    useEffect(() => {
        if (autoClose) {
            const timer = setTimeout(() => setMessageVisible(false), autoClose);
            return () => clearTimeout(timer);
        }
    }, [autoClose]);

    if (!messageVisible) {
        return null;
    }

    return (
        <div className="confirm-message-overlay">
            <div className="confirm-message">
                <h5>{message}</h5>
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
        </div>
    );
}

export default ConfirmMessage;